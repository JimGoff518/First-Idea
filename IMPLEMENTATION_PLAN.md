# OpenPhone Call Transcript Reader - Implementation Plan

## Project Overview

A web application that connects to the OpenPhone/Quo API to:
- Fetch and display all customer call transcripts
- Enable full-text search across transcripts
- Export transcripts to CSV/JSON formats
- Real-time sync via webhooks when new transcripts are available

## Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Node.js + TypeScript | API server, OpenPhone integration |
| **Framework** | Express.js or Fastify | HTTP server, routing, middleware |
| **Frontend** | React + TypeScript | User interface |
| **Database** | PostgreSQL | Store synced transcripts for search |
| **Search** | PostgreSQL Full-Text Search | Fast transcript search |
| **Build** | Vite | Frontend build tool |
| **Package Manager** | pnpm or npm | Dependency management |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Web Browser                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React Frontend                          │  │
│  │  - Transcript List View                                    │  │
│  │  - Search Interface                                        │  │
│  │  - Export Controls                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Express/Fastify Server                       │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────────┐  │
│  │  /api/calls    │  │ /api/search    │  │ /api/export      │  │
│  │  List calls    │  │ Search text    │  │ CSV/JSON export  │  │
│  └────────────────┘  └────────────────┘  └──────────────────┘  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  /webhooks/openphone                        │ │
│  │           Receive real-time transcript updates              │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
        │                                           │
        ▼                                           ▼
┌───────────────────┐                   ┌───────────────────────┐
│   PostgreSQL DB   │                   │   OpenPhone/Quo API   │
│  - calls table    │                   │  - GET /v1/calls      │
│  - transcripts    │                   │  - GET /v1/call-      │
│  - full-text idx  │                   │    transcripts/{id}   │
└───────────────────┘                   └───────────────────────┘
```

## API Endpoints (Our Server)

### Calls & Transcripts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calls` | List all calls with pagination |
| GET | `/api/calls/:id` | Get single call details |
| GET | `/api/calls/:id/transcript` | Get transcript for a call |
| POST | `/api/sync` | Manually trigger full sync from OpenPhone |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=keyword` | Search transcripts |
| GET | `/api/search?q=keyword&from=date&to=date` | Search with date filter |

### Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/export/csv` | Export all transcripts as CSV |
| GET | `/api/export/json` | Export all transcripts as JSON |
| GET | `/api/export/csv?call_id=xxx` | Export single transcript |

### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/webhooks/openphone` | Receive OpenPhone webhook events |

## Database Schema

```sql
-- Calls table
CREATE TABLE calls (
  id UUID PRIMARY KEY,
  openphone_call_id VARCHAR(255) UNIQUE NOT NULL,
  phone_number_id VARCHAR(255),
  direction VARCHAR(20), -- 'inbound' or 'outbound'
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration_seconds INTEGER,
  status VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transcripts table
CREATE TABLE transcripts (
  id UUID PRIMARY KEY,
  call_id UUID REFERENCES calls(id),
  openphone_call_id VARCHAR(255) NOT NULL,
  content TEXT, -- Full transcript text
  content_tsv TSVECTOR, -- Full-text search vector
  speakers JSONB, -- Speaker breakdown
  created_at TIMESTAMP WITH TIME ZONE,
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX transcripts_content_tsv_idx ON transcripts USING GIN(content_tsv);

-- Index for call lookups
CREATE INDEX calls_openphone_id_idx ON calls(openphone_call_id);
CREATE INDEX calls_created_at_idx ON calls(created_at);
```

## Project Structure

```
First-Idea/
├── src/
│   ├── server/              # Backend code
│   │   ├── index.ts         # Server entry point
│   │   ├── routes/
│   │   │   ├── calls.ts     # Call endpoints
│   │   │   ├── search.ts    # Search endpoints
│   │   │   ├── export.ts    # Export endpoints
│   │   │   └── webhooks.ts  # Webhook handlers
│   │   ├── services/
│   │   │   ├── openphone.ts # OpenPhone API client
│   │   │   ├── sync.ts      # Sync service
│   │   │   └── search.ts    # Search service
│   │   ├── db/
│   │   │   ├── index.ts     # Database connection
│   │   │   ├── schema.sql   # Database schema
│   │   │   └── queries.ts   # Database queries
│   │   └── types/
│   │       └── openphone.ts # TypeScript types
│   │
│   └── client/              # Frontend code
│       ├── App.tsx          # Main app component
│       ├── main.tsx         # React entry point
│       ├── components/
│       │   ├── CallList.tsx
│       │   ├── TranscriptView.tsx
│       │   ├── SearchBar.tsx
│       │   └── ExportButton.tsx
│       ├── hooks/
│       │   └── useOpenPhone.ts
│       └── styles/
│           └── main.css
│
├── public/                  # Static assets
├── tests/                   # Test files
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
├── CLAUDE.md
└── IMPLEMENTATION_PLAN.md
```

## Implementation Phases

### Phase 1: Foundation
- [ ] Initialize Node.js/TypeScript project
- [ ] Set up Express server with basic routes
- [ ] Create OpenPhone API client service
- [ ] Test API connectivity with your API key

### Phase 2: Database & Sync
- [ ] Set up PostgreSQL database
- [ ] Create database schema
- [ ] Implement call fetching from OpenPhone
- [ ] Implement transcript fetching
- [ ] Create sync service to populate database

### Phase 3: Search & Export
- [ ] Implement full-text search on transcripts
- [ ] Create CSV export functionality
- [ ] Create JSON export functionality
- [ ] Add date range filtering

### Phase 4: Real-time Sync
- [ ] Set up webhook endpoint
- [ ] Register webhook with OpenPhone
- [ ] Handle incoming transcript events
- [ ] Auto-sync new transcripts to database

### Phase 5: Frontend
- [ ] Set up React with Vite
- [ ] Create call list view
- [ ] Create transcript detail view
- [ ] Implement search interface
- [ ] Add export controls

### Phase 6: Polish & Deploy
- [ ] Add error handling
- [ ] Add loading states
- [ ] Write tests
- [ ] Set up deployment (Vercel, Railway, etc.)

## OpenPhone API Reference

### Authentication
```typescript
// All requests require the API key in header
headers: {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
}
```

### List Calls
```
GET https://api.openphone.com/v1/calls
Query params:
  - phoneNumberId (optional)
  - maxResults (optional, default 10, max 100)
  - pageToken (optional, for pagination)
```

### Get Call Transcript
```
GET https://api.openphone.com/v1/call-transcripts/{callId}
Response: Transcript with speaker breakdown and timestamps
```

### Webhook Events
```
Event: call.transcription.completed
Payload: { callId, phoneNumberId, ... }
```

## Getting Started Commands

```bash
# Initialize project
npm init -y
npm install typescript @types/node ts-node express @types/express
npm install pg @types/pg dotenv axios

# Dev dependencies
npm install -D nodemon vite @vitejs/plugin-react react react-dom @types/react @types/react-dom

# Initialize TypeScript
npx tsc --init

# Run development server
npm run dev
```

## Security Considerations

1. **API Key**: Store in environment variables, never commit
2. **Webhook Verification**: Validate webhook signatures
3. **Rate Limiting**: Respect OpenPhone API limits
4. **Data Access**: Implement authentication for the web app
5. **HTTPS**: Use HTTPS in production

## Resources

- [OpenPhone API Docs](https://www.openphone.com/docs/mdx/api-reference/introduction)
- [Call Transcripts Endpoint](https://www.openphone.com/docs/mdx/api-reference/calls/get-a-transcription-for-a-call)
- [OpenPhone Support](https://support.openphone.com/hc/en-us/articles/16422034557463)
