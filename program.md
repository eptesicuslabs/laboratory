# eARA

Eptesicus Autonomous Research Agent. Adapted for web development.

Give an agent this file and the project source. It modifies the code, builds,
checks if the result improved, keeps or discards, and repeats. You come back
to a log of changes and a better website.

## Setup

To set up a session:

1. **Read the config**: Open `eara.yaml` in the project root. It defines:
   - `train_script`: the primary file to modify
   - `metric`: the key metric to optimize (build success)
   - `metric_direction`: `higher` (successful builds are better)
   - `time_budget_minutes`: max build time per experiment
2. **Read the source**: Understand the Next.js project structure, components, and styling.
3. **Read state**: Check `results.tsv` for prior experiments.
4. **Verify build works**: Run `npm run build` once to confirm.
5. **Confirm and go**.

## Experimentation

**What you CAN do:**
- Modify files in `src/`. Everything is fair game: components, styles,
  layouts, animations, content, configuration.

**What you CANNOT do:**
- Modify files outside `src/` during the experiment loop (except eara.yaml).
- Install packages without explicit approval.
- Skip the pre-push checks.

**The goal: improve the website quality AND pass all build checks.**

## Pre-run checks

Before EVERY build:

1. **Describe**: What are you changing? Why? What do you expect?
2. **Crash-check**: Read through your diff. Check for TypeScript errors,
   missing imports, broken references.
3. **Smoke test**: Run `npm run build`. Must complete without errors.
4. **Commit**: `git add <files> && git commit -m "description"`

If ANY check fails, fix before pushing. Never push broken code.

## Mandatory subagent verification (pre-push)

Steps 2 through 4 MUST each be launched as a SEPARATE SUBAGENT using the
Agent tool. This is not optional. This is not flexible.

### Why subagents are mandatory

A single agent accumulates blind spots over a long session. It becomes
anchored to its own assumptions. Subagents provide independent verification
because each one starts with fresh context, no anchoring, and no
motivated reasoning about changes it already made.

### Verification gate

Before pushing, you must be able to list:
- The agent ID from the REVIEW AGENT
- The agent ID from the BUILD TEST AGENT

If you cannot list both, you did not run them. Go back and run them.

## Output format

The build script should produce a results file at `build-results.json`:

```json
{
  "build_success": 1,
  "build_time_seconds": 12.5,
  "page_count": 4,
  "errors": 0
}
```

## Results log

After each experiment, append to `results.tsv`:

```
run_id  metric  description  timestamp
001     1       Initial build verification  2026-03-24T12:00:00
```

If metric improved (build passed), keep the commit.
If metric worsened (build failed), `git reset --hard HEAD~1` to revert.
