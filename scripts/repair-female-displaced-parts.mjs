import fs from 'node:fs'

const path = 'public/models/atlas-female.json'
const atlas = JSON.parse(fs.readFileSync(path, 'utf8'))
const remove = new Set([
  // The BP3D anterior-chamber shells sit ~22 mm inferior to the matching VH sclera/eye assemblies.
  'BP3D_FJ1282', 'BP3D_FJ1332',
  // Full BP3D organ shells are spatially discordant with the detailed VH female organ assemblies.
  'BP3D_FJ3145', 'BP3D_FJ3147', 'BP3D_FJ3149',
])
const before = atlas.parts.length
const found = new Set(atlas.parts.filter(p => remove.has(p.id)).map(p => p.id))
if (found.size !== remove.size) throw new Error(`Expected ${remove.size} target parts, found ${found.size}`)
atlas.parts = atlas.parts.filter(p => !remove.has(p.id))
atlas.concepts = atlas.concepts
  .map(c => ({ ...c, elements: (c.elements || []).filter(id => !remove.has(id)) }))
  .filter(c => c.elements.length)
atlas.geometryRepairs = [...new Set([...(atlas.geometryRepairs || []), 'female-displaced-bp3d-overlays-2026-11'])]
fs.writeFileSync(path, JSON.stringify(atlas))
console.log(`Removed ${before - atlas.parts.length} confirmed discordant overlays; ${atlas.parts.length} parts remain.`)
