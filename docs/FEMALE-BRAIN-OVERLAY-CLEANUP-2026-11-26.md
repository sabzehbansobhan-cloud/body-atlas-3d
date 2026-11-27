# Female brain overlay cleanup — 2026-11-26

Applied to `public/models/atlas-female.json` after the user's accepted `female-repair-pass` baseline.

Removed six broad BP3D meshes from the female manifest while retaining the more detailed Allen meshes:

- `BP3D_FJ1758`, `BP3D_FJ1806`: cerebral white-matter shells; compared against contralateral-labelled Allen white-matter hemispheres after confirming the coordinate-side mapping. Median nearest-vertex distances were about 2.4–2.7 mm from BP3D to Allen and 4.3–4.5 mm in reverse, with 59–67% of BP3D vertices within 3 mm of Allen surfaces.
- `BP3D_FJ1781`, `BP3D_FJ1830`: broad cerebellar shells; compared with Allen lateral cerebellar hemisphere + paravermis on the matching side. 32–58% of BP3D vertices were within 3 mm of the Allen surfaces.
- `BP3D_FJ1793`, `BP3D_FJ1794`: broad orbital gyrus shells; compared with the four Allen orbital-gyrus subdivisions on each side. 32–39% of BP3D vertices were within 3 mm of the Allen surfaces.

The six broad shells were removed from the render manifest and concept element lists. Packed binary chunks were not rewritten; unreferenced bytes remain harmlessly unused. Unique Allen structures, skull bones, eyes, muscles, skeleton, and the prior knee repair were retained. Male atlas files were not changed.

This is a duplicate-overlay cleanup, not a full anatomical registration. It does not claim to fix the absolute brain-to-skull fit or reposition the eye globes. Those still require a reliable socket/cranial reference and visual review in the running app.
