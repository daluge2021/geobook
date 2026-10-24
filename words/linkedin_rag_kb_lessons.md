# What building a "100% accurate" RAG knowledge base taught me about AI engineering

> I recently built a RAG knowledge base from scratch — no vector database, just SQLite + numpy — on a small synthetic product dataset (a fictional REDMI K90 series) purely as an engineering exercise. It passed every check in my own 12-question evaluation. The number isn't the point. What I learned about how to get there is.

(Note: demo data only, not a real product review — treat all figures as illustrative.)

**Three ideas changed how I think about grounding LLMs in your own data:**

**1. Treat the relational DB as the source of truth, and the vector index as what it is — a derived index.**
Business facts (entities, aliases, relationships, authority levels, sources) live in SQLite. Vectors only handle fuzzy semantics. If a question is deterministic ("what's the battery in model X"), answer it with SQL, not with a similarity score. This single decision eliminated most "hallucination" complaints before they could happen.

**2. Filter before you fuse.**
Restrict which data is even allowed to compete (per-model isolation, authority floors) *before* merging retrieval paths. If you filter after fusion, dead candidates occupy your top-K slots and the good stuff gets squeezed out. Small design choice, outsized effect on answer quality.

**3. Evaluate before you tune — and make the eval your first deliverable.**
Every change (chunking, recall paths, prompts) moves quality in *both* directions. Without a quantifiable measure, "it seems better" is a coin flip. I wrote a 12-question eval with six checks each — normalization, retrieval, cross-model isolation, coverage, hallucination post-check, and honest refusal. Iterating against it took the project from 94.4% to 100%.

**The uncomfortable lesson** is that quality problems were almost never about the model. They were about:

- **Data modeling**: identifying "which model does this number belong to" as a hard constraint, not a hint.
- **Ordering bias**: my exact-match path silently ranked chunks by *insertion time* — docs added later lost every fusion. Fix: uniform ranks.
- **Vocabulary gaps the embedder can't see**: users say "photography," the doc says "imaging specs." Query-time synonym expansion (keep per-chunk *max* similarity) beat any embedding tweak.
- **Honesty as a feature**: when data is missing, the right answer is "not found in the knowledge base" — and that refusal is something you can and should test for.

**Why this scales beyond a toy:** I replicated the exact same engine on a second, unrelated topic — all I changed was data, normalization, and the prompt. The new, independent evaluation also passed. The method transfers; the specific thresholds don't. That's the transferable asset.

I'm sharing this because grounding LLMs in proprietary knowledge is about to become everyone's default problem. My strong hunch: the teams that win won't be the ones with the biggest vector DB, but the ones with a measurable eval, disciplined filtering, and the humility to treat "the model is wrong" as a prompt to check their data instead.

Happy to discuss the eval design or the retrieval architecture in the comments. The full runnable demo (build / query / eval, ~600 LOC) is linked in the repo.