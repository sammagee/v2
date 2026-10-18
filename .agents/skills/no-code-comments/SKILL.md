---
name: no-code-comments
description: Use when writing, editing, refactoring or reviewing code in this repo (TS, TSX, CSS, config). Keeps source free of code comments.
---

# No code comments

Write code that explains itself, and don't add comments.

- Don't add comments to new or changed code.
- When you touch a file, remove any comment that isn't absolutely necessary.
- To explain something, rename a variable, function or class, extract a well-named helper or constant, or split a component. Don't write a comment.

## What counts as necessary

Keep a comment only if it is one of these:

- **Non-obvious browser or platform workarounds.** Code that looks redundant or wrong but prevents a real bug, and would break if someone "cleaned it up". Keep it to one line: what it works around.
- **License headers** and attribution that a license requires.
- **Required tool directives**, such as `'use client'`.

Lint-disable comments (`eslint-disable*`, `oxlint-disable*`) are banned, with no exceptions, and `pnpm lint` fails on them. Fix the code instead. If a rule is genuinely wrong for this project, configure it in `.oxlintrc.json`.

Everything else goes: section labels, restating what the code does, commented-out code, history notes and TODOs.
