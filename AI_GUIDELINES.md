# AI Agent Guidelines

This document serves as a reference for AI agents interacting with this repository.

## Release & Versioning
- **Automatic Version Increment**: When preparing to push changes that modify the codebase or documentation, **always increment the package version (patch level)** in `package.json` automatically. Do not wait for explicit user instruction to do so.
- **Commit Messages**: Use semantic commit messages (e.g., `feat:`, `fix:`, `chore:`, `docs:`).

## Workflow
1. Make necessary code changes.
2. Increment `version` in `package.json`.
3. Commit changes with a descriptive message including the version bump.
4. Push to the repository.
