# Female atlas repair pass — 2026-11-26

This pass is intentionally conservative and removes only five BP3D overlays from the female manifest; it does not translate or deform any geometry.

Removed:
- `BP3D_FJ1282`, `BP3D_FJ1332`: anterior chamber meshes whose AABB centers are about 22 mm inferior to the VH sclera assemblies. The detailed VH cornea, iris, aqueous humor, sclera, lens and retina parts remain.
- `BP3D_FJ3145`, `BP3D_FJ3147`: full BP3D kidney shells that are spatially discordant with the VH female kidney capsule/cortex/hilum/pelvis assemblies. VH kidney structures remain.
- `BP3D_FJ3149`: full BP3D urinary bladder shell discordant with the VH bladder dome/base/neck/trigone structures. VH structures remain.

No brain meshes, eye globes, skull, muscles, skeleton or male-atlas files were changed. The existing `female-knee-alignment-2026-11` repair marker is preserved. This pass does not claim to solve the brain protrusion or the eye-globe/orbit alignment; those need vertex-level fitting and visual QA.
