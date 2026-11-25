# Geometry metadata QA — 25 November 2026

## Scope

This pass audits the packed male and female atlas manifests and geometry buffers. It is a data-integrity repair, not a claim of medical-grade anatomical validation.

## Repairs applied

- Recomputed every part's axis-aligned bounds directly from its packed Float32 vertex positions in both atlases. This removes stale bounds that did not describe the geometry actually rendered. The most severe male examples were the right sclera and right lens suspensory ligament, whose stored X bounds extended across the midline although their actual vertices did not.
- Removed four duplicate male eye meshes imported from the Ecorche asset (two sclera and two cornea meshes). The original BodyParts3D eye meshes remain and are the meshes referenced by the left/right eyeball concepts. The Ecorche duplicates were shifted about 20 mm anteriorly relative to the original eye components, creating a second displaced surface.
- Reclassified the third, fourth and lateral cerebral ventricles and the interventricular foramen from the cardiac system to the nervous system.

## Validation performed

- Both manifests parse and have unique part IDs.
- Every part references an existing chunk and valid byte ranges for positions, normals and indices.
- Every index is within its part's vertex range.
- No non-finite vertex positions or normals were found.
- No repeated-index degenerate triangles were found.
- Geometry buffers were not translated, scaled, rotated or otherwise modified.

## Known limitations

- Correct bounds improve selection centres, exploded-view centres and body framing, but do not move a misplaced mesh.
- This pass does not prove that the brain is correctly enclosed by the skull, that every eye component sits correctly in the orbit, or that female knee ligaments are anatomically aligned.
- The female atlas remains a composite of HuBMAP Female Reference Atlas structures and fitted BodyParts3D structures, as described in `public/ATTRIBUTION.md`.
- Browser rendering and visual QA on the target phone/tablet remain necessary. Build dependencies were not available in this environment, so a production build was not certified in this pass.
