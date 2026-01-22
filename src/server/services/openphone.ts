import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  Call,
  CallsResponse,
  Transcript,
  PhoneNumber,
  PhoneNumbersResponse,
  ListCallsParams,
} from '../types/openphone.js';

const OPENPHONE_API_BASE = 'https://api.openphone.com/v1';

export class OpenPhoneClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenPhone API key is required');
    }

    this.client = axios.create({
      baseURL: OPENPHONE_API_BASE,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data as Record<string, unknown>;

          if (status === 401) {
            throw new Error('Invalid API key. Please check your OPENPHONE_API_KEY.');
          }
          if (status === 403) {
            throw new Error('Access forbidden. Check your API key permissions and plan level.');
          }
          if (status === 404) {
            throw new Error('Resource not found.');
          }
          if (status === 429) {
            throw new Error('Rate limit exceeded. Please slow down requests.');
          }

          throw new Error(`OpenPhone API error: ${status} - ${JSON.stringify(data)}`);
        }
        throw error;
      }
    );
  }

  /**
   * List all phone numbers in the account
   */
  async getPhoneNumbers(): Promise<PhoneNumber[]> {
    const response = await this.client.get<PhoneNumbersResponse>('/phone-numbers');
    return response.data.data;
  }

  /**
   * List calls with optional filtering and pagination
   */
  async listCalls(params?: ListCallsParams): Promise<CallsResponse> {
    const queryParams: Record<string, string | number> = {};

    if (params?.phoneNumberId) queryParams.phoneNumberId = params.phoneNumberId;
    if (params?.maxResults) queryParams.maxResults = params.maxResults;
    if (params?.pageToken) queryParams.pageToken = params.pageToken;
    if (params?.createdAfter) queryParams.createdAfter = params.createdAfter;
    if (params?.createdBefore) queryParams.createdBefore = params.createdBefore;

    const response = await this.client.get<CallsResponse>('/calls', {
      params: queryParams,
    });

    return response.data;
  }

  /**
   * Get all calls (handles pagination automatically)
   */
  async getAllCalls(params?: Omit<ListCallsParams, 'pageToken' | 'maxResults'>): Promise<Call[]> {
    const allCalls: Call[] = [];
    let pageToken: string | undefined;

    do {
      const response = await this.listCalls({
        ...params,
        maxResults: 100,
        pageToken,
      });

      allCalls.push(...response.data);
      pageToken = response.nextPageToken;

      // Small delay to avoid rate limiting
      if (pageToken) {
        await this.delay(100);
      }
    } while (pageToken);

    return allCalls;
  }

  /**
   * Get a single call by ID
   */
  async getCall(callId: string): Promise<Call> {
    const response = await this.client.get<Call>(`/calls/${callId}`);
    return response.data;
  }

  /**
   * Get transcript for a call
   * Note: Transcripts are only available on Business/Scale plans with call recording enabled
   */
  async getTranscript(callId: string): Promise<Transcript | null> {
    try {
      const response = await this.client.get<Transcript>(`/call-transcripts/${callId}`);
      return response.data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        // Transcript not available for this call
        return null;
      }
      throw error;
    }
  }

  /**
   * Get transcripts for multiple calls
   */
  async getTranscriptsForCalls(callIds: string[]): Promise<Map<string, Transcript>> {
    const transcripts = new Map<string, Transcript>();

    for (const callId of callIds) {
      try {
        const transcript = await this.getTranscript(callId);
        if (transcript) {
          transcripts.set(callId, transcript);
        }
        // Small delay to avoid rate limiting
        await this.delay(100);
      } catch (error) {
        console.error(`Failed to get transcript for call ${callId}:`, error);
      }
    }

    return transcripts;
  }

  /**
   * Test API connectivity by listing calls
   */
  async testConnection(): Promise<{ success: boolean; message: string; callCount?: number }> {
    try {
      // Try listing calls as the primary test
      const callsResponse = await this.listCalls({ maxResults: 1 });
      return {
        success: true,
        message: `Connected successfully. API is accessible.`,
        callCount: callsResponse.data.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Singleton instance (initialized when needed)
let clientInstance: OpenPhoneClient | null = null;

export function getOpenPhoneClient(): OpenPhoneClient {
  if (!clientInstance) {
    const apiKey = process.env.OPENPHONE_API_KEY;
    if (!apiKey) {
      throw new Error('OPENPHONE_API_KEY environment variable is not set');
    }
    clientInstance = new OpenPhoneClient(apiKey);
  }
  return clientInstance;
}

export function resetOpenPhoneClient(): void {
  clientInstance = null;
}
