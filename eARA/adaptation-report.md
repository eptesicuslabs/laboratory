# eARA Adaptation Report: Web Development Use Case

**Project:** Eptesicus Laboratories website (Next.js 16, React 19, Tailwind 4)
**Date:** 2026-03-24
**Agent:** Claude Opus 4.6 (1M context)
**Session commits:** 10 (155a230 → 3137b53)
**Build failures:** 3 caught pre-push, 0 reached production
**Design rejections by human:** 6

---

## 1. Executive Summary

eARA was designed for a tight, objective loop: modify training script → train → compare val_loss → keep or revert. When adapted for web development, the loop broke in a specific way: **the build gate passed every time, but the human rejected the output 6 out of 10 times.** This means eARA's verification system is necessary but catastrophically insufficient for subjective-output domains. The metric needs to be redefined, and the loop needs a human-in-the-loop checkpoint that doesn't exist in the current architecture.

---

## 2. Session Timeline — Every Mistake, Catalogued

### Iteration 1: 3D Atom Visualization
**Commit:** `155a230`
**What was requested:** Replace gradient background with 3D animated atom using Three.js.
**What was delivered:** 335-line Three.js scene with particles, orbital rings, bloom post-processing.
**Build result:** ✅ Pass (after 2 TypeScript fixes for `THREE.` namespace and JSX `<line>` collision)
**Human verdict:** Initially accepted, later rejected — "I do not like the atom."

**Root cause:** The atom was technically correct but the user's aesthetic vision evolved. In ML training, the metric doesn't change mid-session. In design work, the target shifts as the human sees intermediate results and refines their taste. eARA's fixed-metric model cannot handle this.

**eARA gap:** No mechanism for metric redefinition mid-loop.

---

### Iteration 2: Dark Theme + Interactive Atom
**Commit:** `99ae58f`
**What was requested:** Dark & Technical redesign with mouse-reactive atom.
**What was delivered:** Full dark theme conversion, mouse parallax on atom, scroll-responsive bloom, per-section animations.
**Build result:** ✅ Pass
**Human verdict:** Accepted the dark theme, rejected the atom and cards.

**Root cause:** Over-invested in enhancing a component (atom) that was about to be deleted. In ML terms, this is like optimizing hyperparameters on an architecture the researcher has already decided to replace. The agent failed to read the trajectory of the human's feedback.

**eARA gap:** No "trajectory sensing" — the agent should detect when feedback is trending toward replacement rather than refinement.

---

### Iteration 3: ASCII Aesthetic, Block Morph, No Cards
**Commit:** `8e5db09`
**What was requested:** Remove atom, remove ALL cards, ASCII art, block "E" morph animation, embrace minimalism.
**What was delivered:** Block morph animation, terminal-style project list, text-only team section, simplified footer.
**Build result:** ✅ Pass
**Human verdict:** Partially accepted. Liked the block morph and no-cards approach. Rejected: startup animation didn't replay, wrong project descriptions, missing eARA project, scroll arrow still present, no social links on team, footer too small.

**Root cause:** Six errors in a single commit:
1. **Startup animation gating** — Used `sessionStorage` but didn't test the replay behavior. The initial state was `showAnimation: false`, causing a content flash.
2. **Wrong descriptions** — Wrote generic descriptions ("KDA + Mamba-3 + MLA architecture") instead of asking the user for accurate copy.
3. **Missing eARA** — Forgot to include a project the user explicitly asked to add.
4. **Scroll arrow** — Left in a UI element the user's aesthetic had clearly moved past.
5. **No team links** — Had `team-data.ts` with social URLs but didn't use it.
6. **Small footer** — User wanted a Mistral/OpenAI-scale brand footer; delivered a text-sm afterthought.

**eARA gap:** The original eARA has a single `train_script` to modify. Web projects have 10+ interdependent files. A single-file mental model causes the agent to miss changes needed in related files. eARA needs a **file dependency graph** for multi-file projects.

---

### Iteration 4: Polish Pass
**Commit:** `324c23c`
**What was requested:** Fix all 6 issues from iteration 3.
**What was delivered:** Fixed startup overlay, added project links, correct descriptions, eARA added, team social icons, giant EPTESICUS footer.
**Build result:** ✅ Pass (1 TypeScript fix: `t.footer.email` didn't exist in translations)
**Human verdict:** Partially accepted. Footer still had the old small section above the wordmark. Works and Research both pointed to `#research`. Contact link in footer was ambiguous.

**Root cause:** Incremental patches on top of a broken structure. Each fix addressed one symptom without re-examining the whole page. In ML terms: local optimization in a non-convex loss landscape.

**eARA gap:** No mechanism for "step back and re-evaluate the full output." The loop always moves forward. It needs a periodic full-state review checkpoint.

---

### Iteration 5: Footer Merge + Nav Fix
**Commit:** `3136018`
**What was requested:** Merge footer sections, fix nav to separate Works from Research, add ASCII art.
**What was delivered:** Giant EPTESICUS as the entire footer, separated Works/Research nav, ASCII bat in hero.
**Build result:** ✅ Pass
**Human verdict:** Rejected ASCII bat, rejected the implementation of "Works" and "Research" (both still linked to same section), footer contact link still confusing.

**Root cause:** The agent heard "ASCII art" and added a literal ASCII bat. The user wanted ASCII as a *design language*, not a decorative bat. Also failed to actually create a separate Research section — only renamed the existing one.

**eARA gap:** **Intent misinterpretation.** In ML, "lower val_loss" is unambiguous. In creative work, "add ASCII art" has dozens of valid interpretations. eARA needs a **disambiguation step** before execution for subjective instructions.

---

### Iteration 6: Animated ASCII Background
**Commit:** `7d8a388`
**What was requested:** Ampcode CLI-style animated background, fix nav structure properly, fix footer contact.
**What was delivered:** Matrix-rain canvas animation, separate ResearchPosts placeholder, fixed nav links, fixed footer email.
**Build result:** ✅ Pass
**Human verdict:** Rejected — "Don't like the ASCII art. Nor the background." The matrix rain was generic, not what Ampcode CLI does.

**Root cause:** The agent didn't research Ampcode CLI thoroughly before implementing. Made assumptions ("it's probably matrix rain") instead of verifying. When the reference couldn't be found, should have asked the user instead of guessing.

**eARA gap:** **Insufficient pre-research.** The original eARA reads results.tsv before deciding what to try. The web adaptation needs an equivalent: **research the reference before implementing.** The agent should refuse to implement if the reference material is ambiguous.

---

### Iteration 7: "Just Copy AMI Labs"
**Plan written, rejected before implementation.**
**What was proposed:** Strip all decoration, match AMI Labs' zero-animation aesthetic.
**Human verdict:** Rejected — "I want you to get inspired. Whilst I agree that we need to profesionalize this, that does not mean copy."

**Root cause:** The agent swung from "add too much decoration" (matrix rain) to "remove all decoration" (copy AMI Labs). Both are failure modes of the same problem: not having an original design point of view. The user wanted *inspiration*, not *replication*.

**eARA gap:** **No creativity metric.** eARA optimizes a single numeric metric. Creative work requires balancing multiple incommensurable values: originality, professionalism, brand coherence, technical quality. A single metric cannot capture this.

---

### Iteration 8: Echolocation Pulse
**Commit:** `3137b53`
**What was requested:** Something original and professional, inspired by (not copying) AMI Labs.
**What was delivered:** Echolocation pulse — subtle concentric rings expanding from viewport center, conceptually tied to Eptesicus (bat echolocation).
**Build result:** ✅ Pass
**Human verdict:** Accepted (no rejection in subsequent feedback).

**Root cause of success:** The agent finally connected the visual treatment to the brand identity. "Eptesicus" → bats → echolocation → sonar rings. This required *thinking* about the brand, not just executing instructions.

**eARA insight:** The successful iteration required creative reasoning that no config file can specify. This suggests eARA-for-design needs a **brand context document** — not just a metric, but a set of principles the agent can reason from.

---

## 3. Failure Mode Analysis

| Failure Mode | Occurrences | ML Equivalent | Web Manifestation |
|---|---|---|---|
| Metric shift | 3 | Target changes mid-training | User refines aesthetic preference after seeing output |
| Over-investment | 1 | Optimizing doomed architecture | Enhancing a component about to be deleted |
| Multi-file blindness | 2 | Single-variable optimization in multi-param space | Fixing one file but missing needed changes in 5 others |
| Intent misinterpretation | 3 | Wrong loss function | "ASCII art" interpreted as "ASCII bat" instead of "ASCII design language" |
| Insufficient research | 2 | Training without reading the paper | Implementing "Ampcode background" without verifying what it looks like |
| Copy vs. inspire | 1 | Overfitting to training data | Copying AMI Labs verbatim instead of extracting principles |
| Local optimization | 2 | Gradient descent stuck in local minimum | Fixing symptoms without re-examining the whole page |

---

## 4. What eARA Needs to Work for Web Development

### 4.1 The Metric Problem
**Current:** `metric: "build_success"` (binary: builds or doesn't)
**Needed:** A composite metric that includes:
- Build success (binary gate, must pass)
- Lighthouse performance score (measurable)
- **Human satisfaction** (requires a feedback checkpoint)

**Proposal:** Add a `human_gate` field to eara.yaml:
```yaml
human_gate:
  enabled: true
  checkpoint: "after_build"  # pause and show diff before committing
  rollback_on_reject: true
```

### 4.2 The File Dependency Problem
**Current:** `train_script: "src/app/page.tsx"` (single file)
**Needed:** A file manifest or dependency graph:
```yaml
scope:
  primary: "src/app/page.tsx"
  components: "src/components/**/*.tsx"
  styles: "src/app/globals.css"
  config: "next.config.ts"
```
This tells the agent: when you change page.tsx, also check these related files.

### 4.3 The Disambiguation Problem
**Current:** program.md says "modify the training script"
**Needed:** A disambiguation protocol for subjective instructions:
```
Before implementing any visual/design change:
1. Identify 2-3 possible interpretations
2. Research each interpretation (web search, fetch references)
3. If ambiguity remains, ask the human
4. Never implement the first interpretation that comes to mind
```

### 4.4 The Creativity Problem
**Current:** eARA optimizes a numeric metric
**Needed:** A brand context document that the agent reasons from:
```yaml
brand_context:
  name_meaning: "Eptesicus is a genus of bats"
  visual_principles:
    - "Connected to echolocation / signal processing"
    - "Dark, technical, minimal"
    - "Typography as primary design element"
  anti_patterns:
    - "Generic SaaS aesthetics"
    - "Copying competitor designs verbatim"
    - "Decorative elements without conceptual connection to brand"
```

### 4.5 The Full-State Review Problem
**Current:** The loop always moves forward
**Needed:** A periodic "zoom out" step:
```
Every N iterations:
1. Re-read the entire page
2. Compare against the original requirements
3. List what's working and what's not
4. Decide: continue iterating or step back and restructure
```

---

## 5. Quantitative Summary

| Metric | Value |
|---|---|
| Total commits | 10 |
| Build failures caught pre-push | 3 |
| Build failures reaching production | 0 |
| Human rejections | 6 |
| Full rewrites of same component | 4 (background: gradient → atom → ASCII rain → echolocation pulse) |
| Files created then deleted | 4 (GradientBackground, CrystallineNetwork, AtomVisualization, AsciiBackground) |
| TypeScript errors fixed | 4 (THREE namespace, JSX line collision, t.footer.email, t.footer.contact) |
| Session duration (approx) | ~3 hours |
| Lines added then removed | ~1,200 |

### Build Gate Effectiveness
- **True positives:** 3 (caught real TypeScript errors before push)
- **True negatives:** 7 (correct builds that were correct)
- **False negatives:** 0 (no broken builds reached production)
- **False positives:** 0

The build gate is **perfect for preventing broken code** but **useless for preventing bad design.** 100% of design failures passed the build gate.

---

## 6. Recommendations for eARA v2

1. **Add `human_gate`** — Pause after build, show diff, wait for approval before committing. This is the single most impactful change.

2. **Add `scope` manifest** — Replace `train_script` with a file scope definition so the agent knows its full surface area.

3. **Add `brand_context`** — A structured document of principles the agent can reason from when making creative decisions.

4. **Add `disambiguation_protocol`** — Force the agent to research and consider multiple interpretations before implementing subjective instructions.

5. **Add periodic `full_state_review`** — Every N iterations, the agent re-examines the entire output against original requirements.

6. **Redefine metrics for subjective domains** — The metric system needs to support composite scores (build pass + human score + automated checks) rather than a single numeric value.

7. **Add `anti_patterns`** — A list of things the agent should never do, learned from prior rejections. This is the equivalent of results.tsv but for design decisions.

---

## 7. Conclusion

eARA's core loop (modify → test → evaluate → keep/revert) is sound and transferable. What breaks in creative/subjective domains is the **evaluation step**: `val_loss` has a single correct direction, but "does this look good?" is a multi-dimensional judgment that only the human can make. The agent's job in these domains is not to optimize autonomously, but to **propose high-quality candidates for human judgment** — and to learn from rejections faster than it did in this session.

The 6 rejections in this session were not random. They followed a pattern: the agent either (a) didn't research enough before implementing, (b) misinterpreted subjective intent as literal instruction, or (c) copied instead of creating. All three failure modes can be addressed with structured pre-implementation protocols, which is what eARA v2 should encode.
