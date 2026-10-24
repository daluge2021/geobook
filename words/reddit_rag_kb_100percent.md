# I built a RAG knowledge base from scratch that hits 100% on my 12-question eval — the debugging lessons are the real gold

> Disclaimer: this is a **demo project** built on synthetic/example product data (a fictional REDMI K90 series). Not affiliated with any brand, not a real product review. Treat numbers as illustrative.

## TL;DR

- No vector DB. SQLite holds the *truth* (entities, aliases, relations, chunk metadata); numpy vectors are just a derived index.
- Retrieval = 4 paths (SQL exact, contrast, dense, BM25) → filter-before-fuse → RRF.
- I made a 12-question eval with 6 checks each (normalization / retrieval / isolation / coverage / hallucination-verify / refusal) and iterated: **94.4% → 98.6% → 100%**.
- The eval is self-built, not a benchmark — read the limitations at the bottom.

## The stack (skeleton, ~600 LOC total)

- `SQLite` → products/aliases/relations/chunks tables, `content_type`, `authority` (3/2/1), `source`.
- `numpy` → 512-d embeddings (bge-small-zh-v1.5), aligned to chunk IDs via a JSON sidecar. Consistency check after every build.
- Retrieval: 4 paths fused with RRF (K=60). **Filter happens before fusion** — otherwise dead candidates eat the top-5 slots and good chunks get squeezed out.
- Post-generation guard: speculative-word regexes + "check every number in the answer is present in the retrieved materials".

## The 6 debugging lessons (skip everything else, read these)

1. **Alias normalization ≠ substring logic.** `红米k90` and `k90ultra` don't share a substring, but `K90` and `K90-ULTRA` share a *prefix*. Only keep the most specific match using model-code prefixes, not alias strings.

2. **SQL ORDER BY = insertion-time bias.** Path 1 returned chunks in DB order, so docs added later (UGC reviews) systematically lost RRF fusion. Fix: give every exact-match chunk the **same rank (1)**. Don't even sort by dense score — that's bias #3.

3. **Sorting exact-path by dense score kills vector-blind spots.** "拍照" (photography, user words) never matched the doc's "影像参数" (imaging specs) — the chunk was `#None` in *both* dense and BM25. Sorting exact-path by dense then pushed it out of top-5. Uniform rank solved it.

4. **Table content is dense-blind.** A multi-column spec-comparison table embeds terribly, yet it's exactly the material comparison questions need. Fix: the contrast path repeats each compare-chunk **3× in RRF ≈ weight amplification**.

5. **Query expansion > tweaking the embedder.** Synonyms ("拍照"→影像/相机/成像), retrieve each variant, keep per-chunk **MAX** (not SUM — don't let one query variant farm the score). The sensor name "950" came back instantly.

6. **Post-check can misfire.** During an API timeout, the string `443` ended up in an answer and the number-check flagged it as fabricated. Verify only against numbers that are *supposed* to be in materials.

Bonus: API timeouts were environmental — retries + backoff + lowering timeout 180s→60s killed most of the flake.

## Why "100%" should be read with a grain of salt

- 12 questions I wrote myself, 6 checks each, on a **60-chunk** toy corpus. Small, curated, not a benchmark.
- No real users, no A/B, no eval on out-of-domain queries. "100%" means *this eval*, nothing more.
- The model is Qwen3-8B at temp 0.1 — bigger/different models would shift scores.

## What ported cleanly

Same engine, new domain (copied 3 files, swapped data + normalization + prompt): **new 12-question eval also went to 100%** on first-run-after-fixes. Method is portable; your numbers won't be.

Full runnable demo: `GEO_kb/` in this repo (`geo_build.py` / `geo_query.py` / `geo_eval.py`, thin wrappers over the K90 engine).

Critique welcome — especially on the uniform-rank exact path and the repeat-3x contrast trick. Both work on this corpus but feel like engineering pragmatism, not theory.