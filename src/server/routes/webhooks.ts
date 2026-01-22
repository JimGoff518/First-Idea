import { Router, Request, Response } from 'express';
import { WebhookEvent } from '../types/openphone.js';

const router = Router();

/**
 * POST /webhooks/openphone
 * Receive webhook events from OpenPhone
 *
 * Events we care about:
 * - call.transcription.completed: New transcript is available
 * - call.completed: Call has ended
 */
router.post('/openphone', async (req: Request, res: Response) => {
  try {
    const event = req.body as WebhookEvent;

    console.log(`Received webhook event: ${event.type}`, {
      id: event.id,
      createdAt: event.createdAt,
      data: event.data,
    });

    switch (event.type) {
      case 'call.transcription.completed':
        await handleTranscriptionCompleted(event);
        break;

      case 'call.completed':
        await handleCallCompleted(event);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Still return 200 to prevent retries for processing errors
    res.status(200).json({ received: true, error: 'Processing error' });
  }
});

/**
 * Handle transcription completed event
 * This is triggered when a new transcript is ready
 */
async function handleTranscriptionCompleted(event: WebhookEvent): Promise<void> {
  const callId = event.data.callId;

  if (!callId) {
    console.error('No callId in transcription completed event');
    return;
  }

  console.log(`Transcript ready for call: ${callId}`);

  // TODO (Phase 2): Sync the transcript to our database
  // const client = getOpenPhoneClient();
  // const transcript = await client.getTranscript(callId);
  // await saveTranscriptToDatabase(callId, transcript);
}

/**
 * Handle call completed event
 */
async function handleCallCompleted(event: WebhookEvent): Promise<void> {
  const callId = event.data.callId;

  if (!callId) {
    console.error('No callId in call completed event');
    return;
  }

  console.log(`Call completed: ${callId}`);

  // TODO (Phase 2): Sync the call to our database
  // const client = getOpenPhoneClient();
  // const call = await client.getCall(callId);
  // await saveCallToDatabase(call);
}

/**
 * GET /webhooks/openphone
 * Verification endpoint for webhook setup
 */
router.get('/openphone', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OpenPhone webhook endpoint is active',
    supportedEvents: ['call.completed', 'call.transcription.completed'],
  });
});

export default router;
