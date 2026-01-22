# CLAUDE.md - AI Assistant Guide for First-Idea

## Project Overview

**Project**: OpenPhone Call Transcript Reader
**Repository**: First-Idea
**Last Updated**: 2026-01-22

A web application that connects to the OpenPhone/Quo API to fetch, search, and export customer call transcripts.

### Core Features
- Fetch and display all customer call transcripts from OpenPhone
- Full-text search across all transcripts
- Export transcripts to CSV/JSON formats
- Real-time sync via webhooks when new transcripts become available

---

## Technology Stack

- **Language**: TypeScript
- **Backend**: Node.js + Express.js
- **Frontend**: React
- **Database**: PostgreSQL (with full-text search)
- **Build Tool**: Vite
- **Package Manager**: npm

---

## Repository Structure

```
First-Idea/
├── CLAUDE.md                # This file - AI assistant guidelines
├── IMPLEMENTATION_PLAN.md   # Detailed implementation plan
├── .env.example             # Environment variable template
├── .gitignore               # Git ignore rules
│
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
│       ├── components/      # UI components
│       ├── hooks/           # Custom React hooks
│       └── styles/          # CSS styles
│
├── public/                  # Static assets
├── tests/                   # Test files
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Development Workflow

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd First-Idea

# Install dependencies
npm install

# Copy environment template and add your API key
cp .env.example .env
# Edit .env and add your OpenPhone API key

# Set up the database
# (PostgreSQL must be running)
psql -f src/server/db/schema.sql

# Run development server
npm run dev
```

### Common Commands

```bash
npm run dev          # Start development server (backend + frontend)
npm run build        # Build for production
npm run start        # Run production server
npm test             # Run tests
npm run lint         # Lint code
npm run typecheck    # Run TypeScript type checking
npm run sync         # Manually sync transcripts from OpenPhone
```

---

## API Endpoints

### Our Server Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calls` | List all calls with pagination |
| GET | `/api/calls/:id` | Get single call details |
| GET | `/api/calls/:id/transcript` | Get transcript for a call |
| POST | `/api/sync` | Manually trigger full sync |
| GET | `/api/search?q=keyword` | Search transcripts |
| GET | `/api/export/csv` | Export all transcripts as CSV |
| GET | `/api/export/json` | Export all transcripts as JSON |
| POST | `/webhooks/openphone` | Receive OpenPhone webhook events |

### OpenPhone API Integration

- **Base URL**: `https://api.openphone.com/v1`
- **Auth**: Bearer token (API key in Authorization header)
- **Key Endpoints Used**:
  - `GET /calls` - List calls
  - `GET /call-transcripts/{id}` - Get transcript

---

## Environment Configuration

### Required Environment Variables

```bash
OPENPHONE_API_KEY=   # Your OpenPhone/Quo API key (required)
DATABASE_URL=        # PostgreSQL connection string
PORT=3000            # Server port (default: 3000)
NODE_ENV=            # development | production | test
WEBHOOK_SECRET=      # Secret for webhook verification
```

### Configuration Files

- `.env` - Local environment variables (NEVER commit this)
- `.env.example` - Template showing required variables

---

## Code Conventions

### General Guidelines

1. **TypeScript**: Use strict typing, avoid `any`
2. **Async/Await**: Prefer over callbacks/promises chains
3. **Error Handling**: Always handle errors, provide meaningful messages
4. **Naming**: Use camelCase for variables/functions, PascalCase for types/components

### File Naming

- Components: `PascalCase.tsx` (e.g., `CallList.tsx`)
- Services/utilities: `camelCase.ts` (e.g., `openphone.ts`)
- Types: `camelCase.ts` with exported interfaces/types
- Tests: `*.test.ts` or `*.spec.ts`

### API Client Pattern

```typescript
// Example: OpenPhone API client pattern
const openPhoneClient = {
  async getCalls(params?: CallsParams): Promise<Call[]> { ... },
  async getTranscript(callId: string): Promise<Transcript> { ... },
};
```

---

## Testing

### Running Tests

```bash
npm test               # Run all tests
npm test -- --watch    # Watch mode
npm run test:coverage  # With coverage report
```

### Test Structure

- Unit tests: `src/**/*.test.ts`
- Integration tests: `tests/integration/`
- API tests: `tests/api/`

---

## AI Assistant Guidelines

### Key Things to Know

1. **API Key Security**: The OpenPhone API key must NEVER be committed to code. Always use environment variables.

2. **Database Sync**: Transcripts are synced from OpenPhone to local PostgreSQL for faster search. Use the sync service to refresh data.

3. **Webhooks**: For real-time updates, webhooks must be configured in the OpenPhone dashboard to point to `/webhooks/openphone`.

4. **Rate Limits**: Be mindful of OpenPhone API rate limits when implementing sync or batch operations.

### When Working on This Codebase

1. **Read before modifying**: Always read existing code before suggesting changes
2. **Follow patterns**: Match existing conventions and patterns
3. **Minimal changes**: Only modify what's necessary for the task
4. **No over-engineering**: Keep solutions simple and focused
5. **Test your changes**: Ensure tests pass before committing

### Things to Avoid

- Committing API keys or secrets
- Adding features beyond what was requested
- Creating unnecessary abstractions
- Making "improvements" to unrelated code
- Ignoring TypeScript errors

### Before Committing

1. Verify all tests pass: `npm test`
2. Check for linting errors: `npm run lint`
3. Type check: `npm run typecheck`
4. Review changes for completeness

---

## Git Workflow

### Branch Naming

- Feature branches: `feature/<description>`
- Bug fixes: `fix/<description>`
- AI assistant branches: `claude/<description>-<session-id>`

### Commit Messages

Write clear, descriptive commit messages:
- Use imperative mood ("Add feature" not "Added feature")
- Keep the first line under 72 characters
- Reference issues when applicable

---

## Troubleshooting

### Common Issues

**Issue**: OpenPhone API returns 401 Unauthorized
**Solution**: Check that `OPENPHONE_API_KEY` is set correctly in `.env`

**Issue**: Transcripts not available
**Solution**: Transcripts require Business/Scale plan and call recording enabled

**Issue**: Database connection failed
**Solution**: Ensure PostgreSQL is running and `DATABASE_URL` is correct

**Issue**: Webhook events not received
**Solution**: Verify webhook URL is publicly accessible and registered in OpenPhone dashboard

---

## Resources

- [OpenPhone API Documentation](https://www.openphone.com/docs/mdx/api-reference/introduction)
- [Call Transcripts API](https://www.openphone.com/docs/mdx/api-reference/calls/get-a-transcription-for-a-call)
- [OpenPhone Support - Transcripts](https://support.openphone.com/hc/en-us/articles/16422034557463)
- [Implementation Plan](./IMPLEMENTATION_PLAN.md)
