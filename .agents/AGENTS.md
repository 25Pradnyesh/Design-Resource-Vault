# DESIGN RESOURCE VAULT — DECISION FRAMEWORK

==================================================
1. PROJECT CONTEXT COMES FIRST
==================================================

The actual Design Resource Vault repository is the source
of truth for the current implementation.

The reference transcripts are learning material and provide
principles, frameworks, and decision-making tools.

Priority order:

1. ACTUAL PROJECT REQUIREMENTS
2. CURRENT PROJECT ARCHITECTURE
3. CURRENT USER EXPERIENCE
4. REFERENCE PRINCIPLES
5. PERSONAL DESIGN PREFERENCES
6. DECORATIVE EXPERIMENTATION

Never distort or rewrite working architecture merely to
demonstrate something learned from the references.

If the existing implementation is already the strongest
solution, KEEP IT.


==================================================
2. DECISION-MAKING FRAMEWORK
==================================================

For every significant design, UX, frontend, performance,
or architecture decision:

CURRENT
→ What exists?

PROBLEM
→ What is actually wrong or limited?

OPTIONS
→ What realistic alternatives exist?

DECISION
→ What are we choosing?

WHY
→ Why is this the strongest option for THIS project?

TRADEOFF
→ What complexity, performance cost, or limitation are
we accepting?

REFERENCE INSIGHT
→ Did the reference material influence this decision?

If the reference material is not relevant, explicitly state:

"Reference material not applicable — project context
provides a better solution."

Do not manufacture connections to the videos.

Prefer one strong recommendation over a list of mediocre
options.


==================================================
3. ENGINEERING JUDGMENT
==================================================

Do not introduce architecture, libraries, patterns,
animations, or optimizations simply because they appear
in the reference material.

Before introducing anything, ask:

- Does the project actually need it?
- Does it improve UX?
- Does it improve performance?
- Does it improve maintainability?
- Does it justify its complexity?

Examples include:

- React.memo
- useMemo
- useCallback
- React Query
- GraphQL
- pagination
- micro-frontends
- GSAP
- 3D
- complex caching
- heavy animation systems

Use them only when they solve an actual problem.

Do not optimize blindly.
Do not over-engineer.
Do not rewrite working code without a reason.


==================================================
4. DESIGN JUDGMENT
==================================================

Do not ask:

"How can we make this look cooler?"

Ask:

"How can we make this clearer, more memorable, more
coherent, and more appropriate for the product?"

Every major visual decision should have a purpose.

Evaluate:

- Typography
- Layout
- Color
- Hierarchy
- Spacing
- Interaction
- Motion
- Accessibility
- Performance
- Product/user journey


==================================================
5. IMPLEMENTATION LOOP
==================================================

LEARN
→ Study the reference material.

AUDIT
→ Understand the current project.

IDENTIFY
→ Find actual weaknesses.

COMPARE
→ Compare possible solutions against project needs.

RECOMMEND
→ Make one strong recommendation.

IMPLEMENT
→ Build the improvement.

VERIFY
→ Check whether it genuinely improved the product.

REJECT
→ If the change makes the product worse, revert it.


==================================================
6. DECISION LOG
==================================================

For major decisions, maintain concise implementation notes
using:

DECISION:
What are we changing?

CURRENT:
What exists now?

PROBLEM:
Why is it insufficient?

REFERENCE INSIGHT:
What principle influenced the decision, if any?

SOLUTION:
What are we implementing?

WHY:
Why is this better?

TRADEOFF:
What are we giving up?

Do not create decision-log entries for trivial changes.
