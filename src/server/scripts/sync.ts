#!/usr/bin/env tsx
/**
 * Manual sync script
 * Usage: npm run sync
 *
 * This script fetches all calls and transcripts from OpenPhone
 * In Phase 2, it will store them in the database
 */

import dotenv from 'dotenv';
import { getOpenPhoneClient } from '../services/openphone.js';

dotenv.config();

async function main() {
  console.log('Starting OpenPhone sync...\n');

  const client = getOpenPhoneClient();

  // Test connection first
  console.log('Testing API connection...');
  const connectionTest = await client.testConnection();

  if (!connectionTest.success) {
    console.error(`Connection failed: ${connectionTest.message}`);
    process.exit(1);
  }

  console.log(`✓ ${connectionTest.message}\n`);

  // Fetch calls
  console.log('Fetching calls...');
  const calls = await client.getAllCalls();
  console.log(`✓ Found ${calls.length} calls\n`);

  // Show recent calls
  if (calls.length > 0) {
    console.log('Recent calls:');
    const recentCalls = calls.slice(0, 10);
    for (const call of recentCalls) {
      const date = new Date(call.createdAt).toLocaleString();
      const direction = call.direction === 'inbound' ? '←' : '→';
      console.log(
        `  ${direction} ${call.from} → ${call.to} | ${call.status} | ${call.duration}s | ${date}`
      );
    }
    if (calls.length > 10) {
      console.log(`  ... and ${calls.length - 10} more calls`);
    }
    console.log();
  }

  // Fetch transcripts for recent calls
  console.log('Fetching transcripts for recent calls...');
  const recentCallIds = calls.slice(0, 20).map((c) => c.id);
  const transcripts = await client.getTranscriptsForCalls(recentCallIds);
  console.log(`✓ Found ${transcripts.size} transcripts\n`);

  // Show transcript previews
  if (transcripts.size > 0) {
    console.log('Transcript previews:');
    let count = 0;
    for (const [callId, transcript] of transcripts) {
      if (count >= 5) break;
      const preview = transcript.fullText.substring(0, 100).replace(/\n/g, ' ');
      console.log(`  Call ${callId}:`);
      console.log(`    "${preview}..."\n`);
      count++;
    }
  }

  console.log('Sync complete!');
  console.log('\nSummary:');
  console.log(`  - Calls: ${calls.length}`);
  console.log(`  - Transcripts: ${transcripts.size}`);
}

main().catch((error) => {
  console.error('Sync failed:', error);
  process.exit(1);
});
