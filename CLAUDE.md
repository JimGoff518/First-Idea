# CLAUDE.md - AI Assistant Guide for First-Idea

> **Note**: This repository is newly initialized. Update this document as the project evolves.

## Project Overview

**Repository**: First-Idea
**Status**: New/Empty Repository
**Last Updated**: 2026-01-22

This document provides guidance for AI assistants working with this codebase. It should be updated as the project structure, conventions, and workflows are established.

---

## Repository Structure

```
First-Idea/
├── CLAUDE.md          # This file - AI assistant guidelines
└── (awaiting initialization)
```

> **TODO**: Update this section as directories and files are added to the project.

---

## Technology Stack

> **TODO**: Document the technologies, frameworks, and languages used once the project is initialized.

<!-- Example structure to fill in:
- **Language**: [e.g., TypeScript, Python, Go]
- **Framework**: [e.g., React, FastAPI, Express]
- **Database**: [e.g., PostgreSQL, MongoDB]
- **Build Tool**: [e.g., npm, cargo, make]
- **Testing**: [e.g., Jest, pytest, go test]
-->

---

## Development Workflow

### Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd First-Idea

# TODO: Add setup instructions once project is initialized
```

### Common Commands

> **TODO**: Document common development commands as they are established.

<!-- Example commands to document:
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```
-->

---

## Code Conventions

### General Guidelines

1. **Consistency**: Follow existing patterns in the codebase
2. **Simplicity**: Prefer clear, readable code over clever solutions
3. **Documentation**: Add comments only where the logic isn't self-evident
4. **Testing**: Write tests for new functionality

### File Naming

> **TODO**: Document naming conventions once established.

### Code Style

> **TODO**: Document code style guidelines (linting rules, formatting, etc.)

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

### Pull Requests

- Provide a clear description of changes
- Include test plan or testing instructions
- Link related issues

---

## Testing

> **TODO**: Document testing strategy, test locations, and how to run tests.

<!-- Example structure:
### Running Tests
```bash
npm test           # Run all tests
npm test -- --watch  # Watch mode
npm run test:coverage  # With coverage
```

### Test Structure
- Unit tests: `src/**/*.test.ts`
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`
-->

---

## Architecture

> **TODO**: Document the system architecture and key design decisions.

<!-- Example sections:
### Directory Structure
- `src/` - Source code
- `src/components/` - UI components
- `src/services/` - Business logic
- `src/utils/` - Utility functions

### Key Patterns
- [Pattern 1]: Description
- [Pattern 2]: Description

### Data Flow
[Describe how data flows through the application]
-->

---

## Environment Configuration

> **TODO**: Document environment variables and configuration once established.

<!-- Example:
### Required Environment Variables
```
DATABASE_URL=       # Database connection string
API_KEY=            # External API key
NODE_ENV=           # development | production | test
```

### Configuration Files
- `.env` - Local environment variables (not committed)
- `.env.example` - Template for environment variables
-->

---

## AI Assistant Guidelines

### When Working on This Codebase

1. **Read before modifying**: Always read existing code before suggesting changes
2. **Follow patterns**: Match existing conventions and patterns
3. **Minimal changes**: Only modify what's necessary for the task
4. **No over-engineering**: Keep solutions simple and focused
5. **Test your changes**: Ensure tests pass before committing

### Things to Avoid

- Adding features beyond what was requested
- Creating unnecessary abstractions
- Adding excessive comments or documentation
- Making "improvements" to unrelated code
- Guessing at missing information (ask instead)

### Before Committing

1. Verify all tests pass
2. Check for linting errors
3. Review changes for completeness
4. Write a clear commit message

---

## Troubleshooting

> **TODO**: Document common issues and solutions as they are discovered.

<!-- Example:
### Common Issues

**Issue**: Build fails with error X
**Solution**: Run `npm clean` and reinstall dependencies

**Issue**: Tests timeout
**Solution**: Check database connection settings
-->

---

## Resources

> **TODO**: Add links to relevant documentation, design docs, and resources.

<!-- Example:
- [Project Documentation](link)
- [API Reference](link)
- [Design System](link)
- [Architecture Decision Records](link)
-->

---

## Updating This Document

This CLAUDE.md file should be kept up to date as the project evolves:

1. **When adding new technologies**: Update the Technology Stack section
2. **When establishing conventions**: Document them in Code Conventions
3. **When creating new directories**: Update the Repository Structure
4. **When adding commands**: Update Common Commands
5. **When encountering issues**: Add to Troubleshooting

---

*This document was generated for a new repository. All TODO sections should be filled in as the project develops.*
