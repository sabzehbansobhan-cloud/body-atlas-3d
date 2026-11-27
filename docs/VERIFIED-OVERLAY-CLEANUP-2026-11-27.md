# Verified duplicate and overlay cleanup — 2026-11-27

This pass starts from the previously tested candidate and preserves its earlier female knee, eye, kidney/bladder, and brain-overlay edits.

## Male atlas

- Removed duplicate left/right optic-nerve meshes `FJ1313` and `FJ1364`; retained the slightly higher-detail matching meshes `FJ1772` and `FJ1819`.
- Removed duplicate basilar-artery mesh `FJ1844`; retained `FJ1672`.
- Removed exact duplicate celiac-artery mesh `FJ2013`; retained `FJ1846`.
- Removed exact duplicate hepatic artery branch meshes `FJ2386` and `FJ2394`; retained `FJ1916` and `FJ1924`.
- Removed duplicate superior mesenteric artery mesh `FJ2011`; retained the higher-vertex-count `FJ1928`.
- The earlier pass also removed duplicate tendinous-arch meshes `FJ2552` and `FJ2553`, retaining `FJ1465` and `FJ1465M`.
- Reclassified the two cerebral choroid-plexus structures as nervous-system structures.

The male brain's major hemispheric and cerebellar structures are from one BP3D source in this atlas. The left/right parts are separate anatomical structures, not duplicate whole-brain overlays, so they were retained. This pass removes the confirmed duplicated optic nerves, but does not claim to have solved absolute brain-to-skull positioning.

## Female atlas

- Preserved the previous six-part BP3D-vs-Allen brain overlay cleanup and the kidney/bladder shell removals.
- Removed five lower-detail duplicate pelvic-muscle meshes, retaining the higher-vertex-count matching structures.
- Removed duplicate tendinous-arch, basilar-artery, celiac-artery, hepatic-artery-branch, and superior-mesenteric-artery meshes.
- Removed exact duplicate cricoid-cartilage and hyoid-bone meshes, retaining one canonical mesh for each.
- Reclassified the BP3D third/lateral ventricles and choroid plexus as nervous-system structures.

## Method and limits

Duplicate decisions were based on matching anatomical names/concept IDs, overlapping bounds, and vertex-level nearest-surface comparisons. For close but non-identical duplicates, the higher-vertex-count mesh was retained; for exact duplicates, one canonical mesh was retained. Nearby but geometrically distinct structures were not deleted merely because their bounding boxes overlapped.

The packed geometry chunk files were not rewritten; removed meshes are no longer referenced by the atlas manifests or concept element lists. The asset checker confirmed that all remaining part/chunk references are valid and that all 59 public assets pass its checks. A Vite production build has not been confirmed in this environment because the Vite dependency is unavailable.
