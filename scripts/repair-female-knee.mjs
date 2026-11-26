// Align the VH female knee soft-tissue meshes with the BP3D femur/tibia landmarks.
// The VH knee meshes were displaced laterally by roughly 47–69 mm relative to
// the corresponding distal femur/proximal tibia. Translation preserves topology.
import { readFileSync, writeFileSync } from 'node:fs'
import { gunzipSync, gzipSync } from 'node:zlib'
import { join, basename } from 'node:path'

const dir = new URL('../public/models/', import.meta.url)
const path = (name) => join(dir.pathname, name)
const manifestPath = path('atlas-female.json')
const atlas = JSON.parse(readFileSync(manifestPath, 'utf8'))
if (atlas.geometryRepairs?.includes('female-knee-alignment-2026-11')) {
  throw new Error('Female knee alignment repair has already been applied; refusing to translate meshes twice.')
}
const buffers = atlas.chunks.map((chunk) => gunzipSync(readFileSync(path(basename(chunk.gzip)))))

// Targets are measured from the distal femur and proximal tibia geometry:
// joint centreline x ≈ ±0.069 m; lateral fibular attachment ≈ ±0.108 m.
const fixes = new Map([
  ['VH_F_anterior_cruciate_ligament_of_knee_L', { dx: -0.0467, dy: 0, system: 'connective' }],
  ['VH_F_posterior_cruciate_ligament_of_knee_L', { dx: -0.0481, dy: 0, system: 'connective' }],
  ['VH_F_anterior_cruciate_ligament_of_knee_R', { dx:  0.0676, dy: 0, system: 'connective' }],
  ['VH_F_posterior_cruciate_ligament_of_knee_R', { dx:  0.0692, dy: 0, system: 'connective' }],
  ['VH_F_meniscus_L', { dx: -0.0490, dy: 0.011, system: 'connective' }],
  ['VH_F_meniscus_R', { dx:  0.0694, dy: 0.011, system: 'connective' }],
  ['VH_F_anterolateral_ligament_of_knee_L', { dx: -0.0499, dy: 0, system: 'connective' }],
  ['VH_F_anterolateral_ligament_of_knee_R', { dx:  0.0708, dy: 0, system: 'connective' }],
])

const found = new Set()
const touched = new Set()
const report = []
for (const part of atlas.parts) {
  const fix = fixes.get(part.id)
  if (!fix) continue
  found.add(part.id)
  const buf = buffers[part.chunk]
  const positions = new Float32Array(buf.buffer, buf.byteOffset + part.positions, part.vertexCount * 3)
  const min = [Infinity, Infinity, Infinity]
  const max = [-Infinity, -Infinity, -Infinity]
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += fix.dx
    positions[i + 1] += fix.dy
    for (let axis = 0; axis < 3; axis++) {
      const v = positions[i + axis]
      min[axis] = Math.min(min[axis], v)
      max[axis] = Math.max(max[axis], v)
    }
  }
  part.bounds = [min, max]
  part.system = fix.system
  touched.add(part.chunk)
  report.push({ id: part.id, dx_mm: Math.round(fix.dx * 1000), dy_mm: Math.round(fix.dy * 1000), bounds: part.bounds })
}
if (found.size !== fixes.size) throw new Error(`Expected ${fixes.size} knee meshes; found ${found.size}: ${[...fixes.keys()].filter((id) => !found.has(id)).join(', ')}`)

for (const i of touched) {
  const chunk = atlas.chunks[i]
  const raw = buffers[i]
  writeFileSync(path(basename(chunk.url)), raw)
  const gz = gzipSync(raw, { level: 9 })
  writeFileSync(path(basename(chunk.gzip)), gz)
  chunk.bytes = raw.byteLength
  chunk.gzipBytes = gz.byteLength
}
atlas.triangles = atlas.parts.reduce((sum, p) => sum + p.indexCount / 3, 0)
atlas.geometryRepairs = [...(atlas.geometryRepairs ?? []), 'female-knee-alignment-2026-11']
writeFileSync(manifestPath, JSON.stringify(atlas))
console.log(JSON.stringify({ repaired: report.length, touchedChunks: [...touched], report }, null, 2))
