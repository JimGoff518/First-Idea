-- OpenPhone Transcript Reader - Database Schema
-- Run with: psql -f src/server/db/schema.sql

-- Create database (run separately if needed)
-- CREATE DATABASE openphone_transcripts;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Calls Table
-- ============================================
CREATE TABLE IF NOT EXISTS calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    openphone_call_id VARCHAR(255) UNIQUE NOT NULL,
    phone_number_id VARCHAR(255),
    direction VARCHAR(20) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    from_number VARCHAR(50) NOT NULL,
    to_number VARCHAR(50) NOT NULL,
    duration_seconds INTEGER DEFAULT 0,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    answered_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for calls
CREATE INDEX IF NOT EXISTS idx_calls_openphone_id ON calls(openphone_call_id);
CREATE INDEX IF NOT EXISTS idx_calls_created_at ON calls(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calls_phone_number_id ON calls(phone_number_id);
CREATE INDEX IF NOT EXISTS idx_calls_direction ON calls(direction);
CREATE INDEX IF NOT EXISTS idx_calls_from_number ON calls(from_number);
CREATE INDEX IF NOT EXISTS idx_calls_to_number ON calls(to_number);

-- ============================================
-- Transcripts Table
-- ============================================
CREATE TABLE IF NOT EXISTS transcripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    call_id UUID REFERENCES calls(id) ON DELETE CASCADE,
    openphone_call_id VARCHAR(255) NOT NULL,
    full_text TEXT,
    full_text_tsv TSVECTOR, -- Full-text search vector
    segments JSONB, -- Speaker segments with timestamps
    created_at TIMESTAMP WITH TIME ZONE,
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_transcripts_fulltext ON transcripts USING GIN(full_text_tsv);

-- Other indexes
CREATE INDEX IF NOT EXISTS idx_transcripts_call_id ON transcripts(call_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_openphone_call_id ON transcripts(openphone_call_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_created_at ON transcripts(created_at DESC);

-- ============================================
-- Phone Numbers Table (cache)
-- ============================================
CREATE TABLE IF NOT EXISTS phone_numbers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    openphone_id VARCHAR(255) UNIQUE NOT NULL,
    number VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    type VARCHAR(20),
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- Sync Log Table
-- ============================================
CREATE TABLE IF NOT EXISTS sync_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'running',
    calls_synced INTEGER DEFAULT 0,
    transcripts_synced INTEGER DEFAULT 0,
    errors TEXT,
    metadata JSONB
);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Function to update full_text_tsv on insert/update
CREATE OR REPLACE FUNCTION update_transcript_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.full_text_tsv := to_tsvector('english', COALESCE(NEW.full_text, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector
DROP TRIGGER IF EXISTS trigger_update_transcript_search ON transcripts;
CREATE TRIGGER trigger_update_transcript_search
    BEFORE INSERT OR UPDATE OF full_text ON transcripts
    FOR EACH ROW
    EXECUTE FUNCTION update_transcript_search_vector();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for calls updated_at
DROP TRIGGER IF EXISTS trigger_calls_updated_at ON calls;
CREATE TRIGGER trigger_calls_updated_at
    BEFORE UPDATE ON calls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- ============================================
-- Helper Views
-- ============================================

-- View: Calls with transcripts
CREATE OR REPLACE VIEW calls_with_transcripts AS
SELECT
    c.id,
    c.openphone_call_id,
    c.direction,
    c.from_number,
    c.to_number,
    c.duration_seconds,
    c.status,
    c.created_at,
    t.id AS transcript_id,
    t.full_text,
    t.segments
FROM calls c
LEFT JOIN transcripts t ON c.id = t.call_id;

-- ============================================
-- Sample Queries (for reference)
-- ============================================

-- Full-text search example:
-- SELECT c.*, t.full_text,
--        ts_headline('english', t.full_text, query) AS snippet,
--        ts_rank(t.full_text_tsv, query) AS rank
-- FROM transcripts t
-- JOIN calls c ON t.call_id = c.id,
--      to_tsquery('english', 'customer & support') AS query
-- WHERE t.full_text_tsv @@ query
-- ORDER BY rank DESC;

-- Search with date filter:
-- SELECT * FROM calls_with_transcripts
-- WHERE created_at >= '2024-01-01'
--   AND full_text ILIKE '%keyword%';

COMMENT ON TABLE calls IS 'Stores call metadata synced from OpenPhone';
COMMENT ON TABLE transcripts IS 'Stores call transcripts with full-text search support';
COMMENT ON TABLE sync_log IS 'Tracks sync operations for debugging and monitoring';
