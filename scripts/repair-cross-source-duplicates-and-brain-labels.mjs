import fs from 'node:fs';
import path from 'node:path';

function load(file) {
  return JSON.parse(fs.readFileSync(path.resolve(file), 'utf8'));
}
function save(file, atlas) {
  atlas.triangles = atlas.parts.reduce((sum, part) => sum + Math.floor((part.indexCount ?? 0) / 3), 0);
  fs.writeFileSync(path.resolve(file), JSON.stringify(atlas));
}
function setSystem(atlas, ids, system) {
  const byId = new Map(atlas.parts.map(part => [part.id, part]));
  for (const id of ids) {
    const part = byId.get(id);
    if (!part) throw new Error(`Missing expected part ${id}`);
    part.system = system;
  }
}

// Male: FJ2552/FJ2553 duplicate the same bilateral tendinous arches already
// represented by FJ1465/FJ1465M. The retained pair has more vertices on both sides.
const maleFile = 'public/models/atlas.json';
const male = load(maleFile);
const maleRemove = ['FJ2552', 'FJ2553'];
const maleExisting = new Set(male.parts.map(p => p.id));
for (const id of maleRemove) if (!maleExisting.has(id)) throw new Error(`Missing expected male duplicate ${id}`);
male.parts = male.parts.filter(p => !maleRemove.includes(p.id));
for (const concept of male.concepts ?? []) {
  if (Array.isArray(concept.elements)) concept.elements = concept.elements.filter(id => !maleRemove.includes(id));
}
// Choroid plexus belongs to the central nervous system, not the sensory system.
setSystem(male, ['FJ1755', 'FJ1803'], 'nervous');
male.geometryRepairs ??= [];
male.geometryRepairs.push({
  id: 'male-duplicate-structure-and-brain-system-cleanup-2026-11',
  date: '2026-11-27',
  removed: maleRemove,
  method: 'Removed the lower-detail duplicate bilateral tendinous-arch meshes after matching names, concept IDs, near-identical bounds, and lower vertex counts; retained FJ1465/FJ1465M.',
  classification: 'Reclassified both cerebral choroid-plexus meshes from sensory to nervous.',
  brainGeometryNote: 'The male brain is sourced from BP3D in this atlas and does not contain a second-source Allen overlay comparable to the female atlas. Left/right brain structures were retained; no unsupported geometry deletion or transform was applied.'
});
save(maleFile, male);

// Female: correct BP3D ventricular/choroid-plexus system assignments so these
// structures remain grouped with the nervous system, consistent with Allen data.
const femaleFile = 'public/models/atlas-female.json';
const female = load(femaleFile);
setSystem(female, ['BP3D_FJ1730', 'BP3D_FJ1767', 'BP3D_FJ1814', 'BP3D_FJ1755', 'BP3D_FJ1803'], 'nervous');
female.geometryRepairs ??= [];
female.geometryRepairs.push({
  id: 'female-brain-system-classification-cleanup-2026-11',
  date: '2026-11-27',
  reclassified: ['BP3D_FJ1730', 'BP3D_FJ1767', 'BP3D_FJ1814', 'BP3D_FJ1755', 'BP3D_FJ1803'],
  method: 'Reclassified third and lateral cerebral ventricles and choroid plexus meshes from cardiac/sensory to nervous, consistent with their anatomy and the corresponding Allen structures.'
});
save(femaleFile, female);

console.log(`Male: removed ${maleRemove.length} duplicates; ${male.parts.length} parts remain.`);
console.log(`Female: corrected 5 brain-system assignments; ${female.parts.length} parts remain.`);
