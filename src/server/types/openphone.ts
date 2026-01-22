// OpenPhone API Types

export interface Call {
  id: string;
  object: 'call';
  phoneNumberId: string;
  direction: 'inbound' | 'outbound';
  from: string;
  to: string;
  status: 'completed' | 'missed' | 'voicemail' | 'cancelled';
  duration: number; // in seconds
  createdAt: string; // ISO 8601
  answeredAt?: string;
  completedAt?: string;
  userId?: string;
  conversationId?: string;
}

export interface CallsResponse {
  object: 'list';
  data: Call[];
  hasMore: boolean;
  nextPageToken?: string;
}

export interface TranscriptSegment {
  speaker: 'agent' | 'customer' | 'unknown';
  text: string;
  startTime: number; // seconds from start
  endTime: number;
}

export interface Transcript {
  id: string;
  object: 'callTranscript';
  callId: string;
  segments: TranscriptSegment[];
  fullText: string;
  createdAt: string;
}

export interface PhoneNumber {
  id: string;
  object: 'phoneNumber';
  number: string;
  name?: string;
  type: 'local' | 'tollfree';
}

export interface PhoneNumbersResponse {
  object: 'list';
  data: PhoneNumber[];
}

// API Request Parameters
export interface ListCallsParams {
  phoneNumberId?: string;
  maxResults?: number; // 1-100, default 10
  pageToken?: string;
  createdAfter?: string; // ISO 8601
  createdBefore?: string; // ISO 8601
}

// Webhook Event Types
export interface WebhookEvent {
  id: string;
  object: 'event';
  type: WebhookEventType;
  createdAt: string;
  data: WebhookEventData;
}

export type WebhookEventType =
  | 'call.completed'
  | 'call.recording.completed'
  | 'call.transcription.completed'
  | 'message.received'
  | 'message.delivered';

export interface WebhookEventData {
  callId?: string;
  phoneNumberId?: string;
  conversationId?: string;
}

// Database Models (our local storage)
export interface StoredCall {
  id: string;
  openphoneCallId: string;
  phoneNumberId: string;
  direction: 'inbound' | 'outbound';
  fromNumber: string;
  toNumber: string;
  durationSeconds: number;
  status: string;
  createdAt: Date;
  syncedAt: Date;
}

export interface StoredTranscript {
  id: string;
  callId: string;
  openphoneCallId: string;
  content: string;
  speakers: TranscriptSegment[];
  createdAt: Date;
  syncedAt: Date;
}

// Search Results
export interface SearchResult {
  callId: string;
  transcriptId: string;
  snippet: string;
  fromNumber: string;
  toNumber: string;
  direction: string;
  callDate: Date;
  relevance: number;
}

// Export Formats
export interface ExportOptions {
  format: 'csv' | 'json';
  callIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}
