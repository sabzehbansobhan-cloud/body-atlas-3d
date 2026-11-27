import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('public/models/atlas-female.json');
const atlas = JSON.parse(fs.readFileSync(file, 'utf8'));
const removeIds = [
  // Broad BP3D cerebral white-matter shells overlap the more detailed Allen hemispheres.
  'BP3D_FJ1758', 'BP3D_FJ1806',
  // Broad BP3D cerebellar shells overlap Allen's lateral hemisphere + paravermis meshes.
  'BP3D_FJ1781', 'BP3D_FJ1830',
  // Broad BP3D orbital gyri overlap the four-part Allen orbital-gyrus segmentation on each side.
  'BP3D_FJ1793', 'BP3D_FJ1794',
];
const existing = new Set(atlas.parts.map(p => p.id));
for (const id of removeIds) if (!existing.has(id)) throw new Error(`Missing expected part ${id}`);
atlas.parts = atlas.parts.filter(p => !removeIds.includes(p.id));
for (const concept of atlas.concepts ?? []) {
  if (Array.isArray(concept.elements)) concept.elements = concept.elements.filter(id => !removeIds.includes(id));
}
atlas.triangles = atlas.parts.reduce((sum, p) => sum + Math.floor((p.indexCount ?? 0) / 3), 0);
atlas.geometryRepairs ??= [];
atlas.geometryRepairs.push({
  id: 'female-brain-overlay-cleanup-2026-11',
  date: '2026-11-26',
  method: 'Removed broad BP3D overlay meshes where vertex-level nearest-surface comparisons showed substantial overlap with more detailed Allen segmentation; retained Allen meshes and all remaining unique anatomical parts.',
  removed: removeIds,
  note: 'This reduces duplicate surface layering; it does not claim to correct the absolute placement of the brain relative to the skull.'
});
fs.writeFileSync(file, JSON.stringify(atlas));
console.log(`Removed ${removeIds.length} overlapping overlay meshes; ${atlas.parts.length} parts remain.`);
