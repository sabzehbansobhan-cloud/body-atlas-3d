import fs from 'node:fs';

const targets = [
  {
    file: 'public/models/atlas.json',
    label: 'male',
    remove: [
      'FJ1313', 'FJ1364',                         // lower-detail duplicate optic nerves
      'FJ1844',                                   // duplicate basilar artery
      'FJ2013',                                   // exact duplicate celiac artery
      'FJ2386', 'FJ2394',                         // exact duplicate hepatic artery branches
      'FJ2011',                                   // duplicate superior mesenteric artery
    ],
    repair: {
      id: 'male-verified-duplicate-mesh-cleanup-2026-11',
      date: '2026-11-27',
      method: 'Removed only same-concept, same-name mesh duplicates confirmed by vertex-level nearest-surface tests. Where meshes differed slightly, retained the mesh with the higher vertex count; where meshes were identical, retained the earlier canonical ID.',
      removed: ['FJ1313','FJ1364','FJ1844','FJ2013','FJ2386','FJ2394','FJ2011'],
      retained: ['FJ1465','FJ1465M','FJ1772','FJ1819','FJ1672','FJ1846','FJ1916','FJ1924','FJ1928'],
    }
  },
  {
    file: 'public/models/atlas-female.json',
    label: 'female',
    remove: [
      'BP3D_FJ2542', 'BP3D_FJ2543', 'BP3D_FJ2544', 'BP3D_FJ2545', 'BP3D_FJ2546', // lower-detail duplicate pelvic muscles
      'BP3D_FJ2552', 'BP3D_FJ2553',                                             // duplicate tendinous arches
      'BP3D_FJ1844', 'BP3D_FJ2013', 'BP3D_FJ2386', 'BP3D_FJ2394', 'BP3D_FJ2011', // duplicate vessels
      'BP3D_FJ2769', 'BP3D_FJ3201',                                             // exact duplicate cartilages/bone
    ],
    repair: {
      id: 'female-verified-duplicate-mesh-cleanup-2026-11',
      date: '2026-11-27',
      method: 'Removed same-concept, same-name duplicate meshes confirmed by vertex-level nearest-surface comparisons. For close but non-identical duplicates, retained the higher-vertex-count mesh; for exact duplicates, retained one canonical mesh.',
      removed: ['BP3D_FJ2542','BP3D_FJ2543','BP3D_FJ2544','BP3D_FJ2545','BP3D_FJ2546','BP3D_FJ2552','BP3D_FJ2553','BP3D_FJ1844','BP3D_FJ2013','BP3D_FJ2386','BP3D_FJ2394','BP3D_FJ2011','BP3D_FJ2769','BP3D_FJ3201'],
      retained: ['BP3D_FJ1449M','BP3D_FJ1450M','BP3D_FJ1453M','BP3D_FJ1457M','BP3D_FJ1458M','BP3D_FJ1465','BP3D_FJ1465M','BP3D_FJ1672','BP3D_FJ1846','BP3D_FJ1916','BP3D_FJ1924','BP3D_FJ1928','BP3D_FJ2440','BP3D_FJ2772'],
    }
  }
];

for (const target of targets) {
  const atlas = JSON.parse(fs.readFileSync(target.file, 'utf8'));
  const present = new Set(atlas.parts.map(p => p.id));
  for (const id of target.remove) if (!present.has(id)) throw new Error(`${target.label}: expected duplicate ${id} missing`);
  atlas.parts = atlas.parts.filter(p => !target.remove.includes(p.id));
  for (const concept of atlas.concepts ?? []) {
    if (Array.isArray(concept.elements)) concept.elements = concept.elements.filter(id => !target.remove.includes(id));
  }
  atlas.triangles = atlas.parts.reduce((sum, p) => sum + Math.floor((p.indexCount ?? 0) / 3), 0);
  atlas.geometryRepairs ??= [];
  atlas.geometryRepairs.push(target.repair);
  fs.writeFileSync(target.file, JSON.stringify(atlas));
  console.log(`${target.label}: removed ${target.remove.length} confirmed duplicates; ${atlas.parts.length} parts remain.`);
}
