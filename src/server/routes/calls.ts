import { Router, Request, Response } from 'express';
import { getOpenPhoneClient } from '../services/openphone.js';

const router = Router();

/**
 * GET /api/calls
 * List all calls with optional filtering
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const client = getOpenPhoneClient();

    const params = {
      phoneNumberId: req.query.phoneNumberId as string | undefined,
      maxResults: req.query.maxResults ? parseInt(req.query.maxResults as string) : 50,
      pageToken: req.query.pageToken as string | undefined,
      createdAfter: req.query.createdAfter as string | undefined,
      createdBefore: req.query.createdBefore as string | undefined,
    };

    const response = await client.listCalls(params);

    res.json({
      success: true,
      data: response.data,
      hasMore: response.hasMore,
      nextPageToken: response.nextPageToken,
    });
  } catch (error) {
    console.error('Error listing calls:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list calls',
    });
  }
});

/**
 * GET /api/calls/:id
 * Get a single call by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const client = getOpenPhoneClient();
    const call = await client.getCall(req.params.id);

    res.json({
      success: true,
      data: call,
    });
  } catch (error) {
    console.error('Error getting call:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get call',
    });
  }
});

/**
 * GET /api/calls/:id/transcript
 * Get transcript for a specific call
 */
router.get('/:id/transcript', async (req: Request, res: Response) => {
  try {
    const client = getOpenPhoneClient();
    const transcript = await client.getTranscript(req.params.id);

    if (!transcript) {
      res.status(404).json({
        success: false,
        error: 'Transcript not found for this call. It may not be available yet or call recording may not be enabled.',
      });
      return;
    }

    res.json({
      success: true,
      data: transcript,
    });
  } catch (error) {
    console.error('Error getting transcript:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get transcript',
    });
  }
});

export default router;
