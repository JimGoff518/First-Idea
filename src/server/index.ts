import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import callsRouter from './routes/calls.js';
import searchRouter from './routes/search.js';
import exportRouter from './routes/export.js';
import webhooksRouter from './routes/webhooks.js';
import { getOpenPhoneClient } from './services/openphone.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/calls', callsRouter);
app.use('/api/search', searchRouter);
app.use('/api/export', exportRouter);
app.use('/webhooks', webhooksRouter);

// Test connection endpoint
app.get('/api/test-connection', async (_req, res) => {
  try {
    const client = getOpenPhoneClient();
    const result = await client.testConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Connection test failed',
    });
  }
});

// Manual sync endpoint (triggers full sync)
app.post('/api/sync', async (_req, res) => {
  try {
    const client = getOpenPhoneClient();

    // Get all calls
    const calls = await client.getAllCalls();

    // Get transcripts for calls
    const callIds = calls.map((c) => c.id);
    const transcripts = await client.getTranscriptsForCalls(callIds);

    res.json({
      success: true,
      message: 'Sync completed',
      stats: {
        callsFound: calls.length,
        transcriptsFound: transcripts.size,
      },
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Sync failed',
    });
  }
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║       OpenPhone Transcript Reader - Server Started         ║
╠════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                  ║
║                                                            ║
║  Endpoints:                                                ║
║    GET  /health              - Health check                ║
║    GET  /api/test-connection - Test OpenPhone connection   ║
║    GET  /api/calls           - List calls                  ║
║    GET  /api/calls/:id       - Get call details            ║
║    GET  /api/calls/:id/transcript - Get transcript         ║
║    GET  /api/search?q=       - Search transcripts          ║
║    GET  /api/export/json     - Export as JSON              ║
║    GET  /api/export/csv      - Export as CSV               ║
║    POST /api/sync            - Manual sync                 ║
║    POST /webhooks/openphone  - Webhook receiver            ║
╚════════════════════════════════════════════════════════════╝
  `);

  // Test OpenPhone connection on startup
  if (process.env.OPENPHONE_API_KEY) {
    console.log('Testing OpenPhone API connection...');
    const client = getOpenPhoneClient();
    client.testConnection().then((result) => {
      if (result.success) {
        console.log(`✓ ${result.message}`);
        if (result.phoneNumbers) {
          result.phoneNumbers.forEach((pn) => {
            console.log(`  - ${pn.number} (${pn.name || 'unnamed'})`);
          });
        }
      } else {
        console.error(`✗ Connection failed: ${result.message}`);
      }
    });
  } else {
    console.warn('⚠ OPENPHONE_API_KEY not set. Set it in .env file to connect to OpenPhone.');
  }
});

export default app;
