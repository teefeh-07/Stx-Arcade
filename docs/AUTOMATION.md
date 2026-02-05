# Automation Scripts & Workflow

## Overview
This project uses a micro-commit strategy to ensure high granularity and activity.

## Scripts

### `scripts/create_branch.sh`
Usage: `./scripts/create_branch.sh <branch-name>`
Creates a new branch for a specific feature.

### Commit Strategy
We follow the Conventional Commits specification.
- `feat:` for new features
- `fix:` for bugs
- `docs:` for documentation
- `refactor:` for code restructuring

## Automated Workflow (Simulation)
1. **Branching**: Create a branch for *every* logical change (even single lines).
2. **Committing**: Commit often with "feat: ..." or "docs: ...".
3. **Merging**: Merge back to `main` immediately after the "micro-feature" is done.

## Automation Tools
The project includes Node.js scripts in `dev-scripts/` (e.g., `generate_commits.js`) used to bootstrap the repository with high activity. Use these as reference for future automation.
