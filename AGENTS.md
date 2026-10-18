# AGENTS.md

Sam Magee's personal site ([sammagee/sammagee.me](https://github.com/sammagee/sammagee.me)), built with Next.js (pages router), React 19 and Tailwind CSS 4.

## Checks

- `pnpm check` runs `pnpm format:check` (oxfmt) and `pnpm lint` (oxlint, which fails on warnings).
- `pnpm format` and `pnpm lint:fix` fix issues in place.
- A pre-commit hook (simple-git-hooks, installed by `pnpm install`) runs the same checks and blocks the commit if either fails.
- Limits, enforced as errors in `.oxlintrc.json`:
  - `max-lines`: 500 lines per file
  - `complexity`: at most 3 per function
  - `max-lines-per-function`: 50

  Fix a violation by splitting files, components and helpers, or by using lookup tables and early returns.

- Inline lint-disable comments (`eslint-disable*`, `oxlint-disable*`) are banned, with no exceptions. `pnpm lint` fails if one appears in a source file. Fix the code instead. If a rule is genuinely wrong for this project, turn it off or configure it in `.oxlintrc.json`.

## Skills

Skills live in `.agents/skills/<name>/SKILL.md`. Read the whole skill before you apply it, and name the ones that shaped your work.

**Project**

- **no-code-comments.** Writing, editing or reviewing any code. Write self-explanatory code and keep only necessary comments.

**React (Vercel)**

- **vercel-react-best-practices.** Writing or reviewing React components and pages: effects, re-renders, bundle size, hydration.
- **vercel-composition-patterns.** Shaping component APIs: boolean-prop sprawl, compound components, context, children over render props.

**Principles: core**

- **principle-the-algorithm.** Any non-trivial change, before you design it. Question the requirement, delete, simplify, then speed up and automate.
- **principle-laziness-protocol.** Refactoring, sizing a diff, or tempted to add abstractions or layers. Bias toward deletion and the smallest change.
- **principle-foundational-thinking.** Before writing logic: core types, data structures, and what concurrent actors share.
- **principle-redesign-from-first-principles.** Fitting a new requirement into an existing design. Redesign as if it had been there from day one.
- **principle-attack-the-premise.** Two or more fixes that share one premise have failed. Test the premise before writing another fix.
- **principle-subtract-before-you-add.** Sequencing an addition, refactor or rewrite. Remove dead weight first.
- **principle-minimize-reader-load.** Code that's hard to trace. Collapse one-caller wrappers and shrink mutable state.
- **principle-outcome-oriented-execution.** Planned rewrites and migrations. Converge on the target; don't keep throwaway compatibility states.
- **principle-experience-first.** Product, UX or scope tradeoffs. Choose user delight over implementation convenience.
- **principle-exhaust-the-design-space.** A novel interaction or architecture decision. Prototype 2-3 options and compare before you commit.
- **principle-build-the-lever.** Any non-trivial work. Build the script or tool that does or proves it, and don't do it by hand.

**Principles: architecture**

- **principle-model-the-domain.** Stateful or branch-heavy logic. Encode it in a structure (table, state machine, typed model), not in conditionals.
- **principle-boundary-discipline.** Validation, error handling, framework adapters. Guard at system boundaries and keep the core pure.
- **principle-type-system-discipline.** Designing types or signatures. Make illegal states unrepresentable.
- **principle-make-operations-idempotent.** Lifecycle steps or loops that can rerun. Converge to the same end state.
- **principle-migrate-callers-then-delete-legacy-apis.** Replacing an internal API. Migrate the callers and delete the old API in one change.
- **principle-separate-before-serializing-shared-state.** Several actors writing the same state. Remove the sharing first.

**Principles: verification**

- **principle-prove-it-works.** Before declaring done. Verify against the real artifact (run it, screenshot it), not just "it compiles".
- **principle-fix-root-causes.** Debugging. Fix the first place it went wrong, not the symptom.
- **principle-sequence-verifiable-units.** Multi-step work and commit stacks. Use small units that each end in a check.
- **principle-test-behavior-not-implementation.** Writing or changing tests. Assert what users observe.
- **principle-explain-the-number.** Before trusting or reporting a measurement. Find what limits it.

**Principles: delegation and meta**

- **principle-guard-the-context-window.** Large outputs or long files. Summarize, and route bulk work elsewhere.
- **principle-never-block-on-the-human.** Tempted to ask about reversible work. Do it, show the result, let the human correct it.
- **principle-encode-lessons-in-structure.** Repeating the same instruction. Encode it as a lint rule, check or script.
