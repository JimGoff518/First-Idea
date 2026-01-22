import { Router, Request, Response } from 'express';
import { getOpenPhoneClient } from '../services/openphone.js';

const router = Router();

/**
 * GET /api/search
 * Search transcripts for a keyword
 *
 * Query params:
 * - q: search query (required)
 * - from: start date (optional, ISO 8601)
 * - to: end date (optional, ISO 8601)
 * - limit: max results (optional, default 50)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;

    if (!query || query.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Search query (q) is required',
      });
      return;
    }

    const client = getOpenPhoneClient();
    const fromDate = req.query.from as string | undefined;
    const toDate = req.query.to as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    // Get calls within date range
    const callsResponse = await client.listCalls({
      maxResults: 100,
      createdAfter: fromDate,
      createdBefore: toDate,
    });

    const results: Array<{
      callId: string;
      from: string;
      to: string;
      direction: string;
      date: string;
      snippet: string;
      matchCount: number;
    }> = [];

    // Search through transcripts
    // Note: In Phase 2, this will use the database for faster search
    for (const call of callsResponse.data) {
      if (results.length >= limit) break;

      try {
        const transcript = await client.getTranscript(call.id);
        if (transcript && transcript.fullText) {
          const lowerText = transcript.fullText.toLowerCase();
          const lowerQuery = query.toLowerCase();

          if (lowerText.includes(lowerQuery)) {
            // Extract snippet around the match
            const index = lowerText.indexOf(lowerQuery);
            const start = Math.max(0, index - 50);
            const end = Math.min(transcript.fullText.length, index + query.length + 50);
            const snippet = transcript.fullText.substring(start, end);

            // Count matches
            const matches = lowerText.split(lowerQuery).length - 1;

            results.push({
              callId: call.id,
              from: call.from,
              to: call.to,
              direction: call.direction,
              date: call.createdAt,
              snippet: (start > 0 ? '...' : '') + snippet + (end < transcript.fullText.length ? '...' : ''),
              matchCount: matches,
            });
          }
        }
      } catch {
        // Skip calls without transcripts
      }
    }

    // Sort by match count (most relevant first)
    results.sort((a, b) => b.matchCount - a.matchCount);

    res.json({
      success: true,
      query,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error('Error searching transcripts:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Search failed',
    });
  }
});

export default router;
