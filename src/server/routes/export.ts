import { Router, Request, Response } from 'express';
import { getOpenPhoneClient } from '../services/openphone.js';

const router = Router();

/**
 * GET /api/export/json
 * Export transcripts as JSON
 */
router.get('/json', async (req: Request, res: Response) => {
  try {
    const client = getOpenPhoneClient();
    const callId = req.query.call_id as string | undefined;
    const fromDate = req.query.from as string | undefined;
    const toDate = req.query.to as string | undefined;

    let calls;
    if (callId) {
      // Export single call
      const call = await client.getCall(callId);
      calls = [call];
    } else {
      // Export all calls in date range
      const response = await client.listCalls({
        maxResults: 100,
        createdAfter: fromDate,
        createdBefore: toDate,
      });
      calls = response.data;
    }

    const exportData = [];

    for (const call of calls) {
      try {
        const transcript = await client.getTranscript(call.id);
        exportData.push({
          call: {
            id: call.id,
            from: call.from,
            to: call.to,
            direction: call.direction,
            status: call.status,
            duration: call.duration,
            createdAt: call.createdAt,
          },
          transcript: transcript
            ? {
                fullText: transcript.fullText,
                segments: transcript.segments,
              }
            : null,
        });
      } catch {
        exportData.push({
          call: {
            id: call.id,
            from: call.from,
            to: call.to,
            direction: call.direction,
            status: call.status,
            duration: call.duration,
            createdAt: call.createdAt,
          },
          transcript: null,
        });
      }
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="transcripts-${new Date().toISOString().split('T')[0]}.json"`
    );
    res.json({
      exportedAt: new Date().toISOString(),
      count: exportData.length,
      data: exportData,
    });
  } catch (error) {
    console.error('Error exporting JSON:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Export failed',
    });
  }
});

/**
 * GET /api/export/csv
 * Export transcripts as CSV
 */
router.get('/csv', async (req: Request, res: Response) => {
  try {
    const client = getOpenPhoneClient();
    const callId = req.query.call_id as string | undefined;
    const fromDate = req.query.from as string | undefined;
    const toDate = req.query.to as string | undefined;

    let calls;
    if (callId) {
      const call = await client.getCall(callId);
      calls = [call];
    } else {
      const response = await client.listCalls({
        maxResults: 100,
        createdAfter: fromDate,
        createdBefore: toDate,
      });
      calls = response.data;
    }

    // CSV header
    const csvRows = [
      ['Call ID', 'From', 'To', 'Direction', 'Status', 'Duration (s)', 'Date', 'Transcript'].join(','),
    ];

    for (const call of calls) {
      let transcriptText = '';
      try {
        const transcript = await client.getTranscript(call.id);
        if (transcript) {
          // Escape quotes and newlines for CSV
          transcriptText = transcript.fullText.replace(/"/g, '""').replace(/\n/g, ' ');
        }
      } catch {
        transcriptText = '';
      }

      csvRows.push(
        [
          call.id,
          call.from,
          call.to,
          call.direction,
          call.status,
          call.duration.toString(),
          call.createdAt,
          `"${transcriptText}"`,
        ].join(',')
      );
    }

    const csvContent = csvRows.join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="transcripts-${new Date().toISOString().split('T')[0]}.csv"`
    );
    res.send(csvContent);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Export failed',
    });
  }
});

export default router;
