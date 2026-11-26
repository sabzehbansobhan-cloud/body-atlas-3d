# Geometry QA — 26 November 2026

## Scope

The packed male and female atlases were audited at the vertex-buffer level. This is a geometry-consistency repair, not a claim of medical-grade anatomical validation.

## Repairs retained from QA-pass1

- Recomputed every part's axis-aligned bounds directly from its packed Float32 vertex positions in both atlases. This fixes stale bounds used for selection centres, exploded-view centres and framing.
- Removed four duplicate male Ecorche eye meshes (two sclera and two cornea meshes) that sat about 20 mm anterior to the original BodyParts3D eye components. The original left/right eye components remain.
- Reclassified the third, fourth and lateral cerebral ventricles and interventricular foramen from cardiac to nervous system.

## New female knee repair

The female atlas combines HuBMAP Female Reference Atlas structures with BodyParts3D structures fitted to the reference body. A direct vertex-centroid comparison showed that the VH knee soft-tissue structures were displaced laterally from the BP3D distal femur/proximal tibia landmarks:

- The distal femur/proximal tibia joint centres are approximately x = ±0.069 m.
- The ACL/PCL and meniscus centroids were around x = +0.116 m on the left and x = −0.137 m on the right, visibly outside the knee joint.
- The anterolateral ligament meshes were even farther lateral.

Corrected eight meshes: left/right anterior cruciate ligament, posterior cruciate ligament, meniscus (articular disk), and anterolateral ligament. Their X translations bring the ACL/PCL and menisci onto the femorotibial joint centreline and the anterolateral ligaments onto the lateral fibular-side attachment region. Menisci were also raised 11 mm so they sit at the joint line. All eight structures were reclassified from skeletal to connective tissue, matching their anatomy. Only vertex positions, their bounds, and system tags changed; topology and vertex counts were preserved.

The one-time operation is recorded in `atlas-female.json` as `geometryRepairs: ["female-knee-alignment-2026-11"]`. Its script refuses to run twice.

## Validation performed

- Both manifests parse; part IDs are unique.
- Every chunk exists and matches the manifest byte counts.
- Every part's index range is valid and all indices are within its vertex range.
- Vertex positions and normals contain no non-finite values.
- The female knee repair was rendered in an isolated close-up before and after; the detached lateral loops are now located at the knee rather than floating outside it.
- `node scripts/check-assets.mjs public` passed: 59 public assets checked.
- Female atlas remains 3,004 parts / 3,893,539 triangles; male atlas remains 2,162 parts / 2,214,204 triangles.

## Remaining limitations

- The browser production build could not be certified in this environment because the archived `node_modules` tree does not contain installed package files and dependency installation timed out.
- This repair addresses the clearly measurable female knee displacement. It does not certify every mixed-source female organ, eye, muscle or vessel placement against medical imaging.
- Final visual acceptance should still be done in the actual browser on the target phone/tablet. No website deployment was performed.
