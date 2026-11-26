// Fit mixed-source female eye and kidney meshes to their Female Reference Atlas landmarks.
// Translation only: topology, normals, vertex counts and indices are preserved.
import { readFileSync, writeFileSync } from 'node:fs'
import { gunzipSync, gzipSync } from 'node:zlib'
import { join, basename } from 'node:path'

const dir = new URL('../public/models/', import.meta.url)
const path = (name) => join(dir.pathname, name)
const manifestPath = path('atlas-female.json')
const atlas = JSON.parse(readFileSync(manifestPath, 'utf8'))
const repairId = 'female-eye-kidney-fit-2026-11'
if (atlas.geometryRepairs?.includes(repairId)) throw new Error(`${repairId} has already been applied`)
const buffers = atlas.chunks.map((chunk) => gunzipSync(readFileSync(path(basename(chunk.gzip)))))

// Deltas are measured from the actual vertex centroids of the source meshes.
// Eye lids/chambers (BP3D) are fitted to the corresponding VH sclera/conjunctiva.
// Whole kidneys (BP3D) are fitted inside the VH kidney capsule/cortex envelope.
const fixes = new Map([
  ['BP3D_FJ1282', { dx:  0.0032, dy: 0.0223, dz: 0.0103, reason: 'left anterior chamber' }],
  ['BP3D_FJ1324', { dx:  0.0022, dy: 0.0174, dz: 0.0100, reason: 'left upper eyelid plate' }],
  ['BP3D_FJ1328', { dx:  0.0018, dy: 0.0284, dz: 0.0114, reason: 'left lower eyelid plate' }],
  ['BP3D_FJ1332', { dx: -0.0121, dy: 0.0226, dz: 0.0111, reason: 'right anterior chamber' }],
  ['BP3D_FJ1375', { dx: -0.0105, dy: 0.0177, dz: 0.0108, reason: 'right upper eyelid plate' }],
  ['BP3D_FJ1379', { dx: -0.0105, dy: 0.0288, dz: 0.0114, reason: 'right lower eyelid plate' }],
  ['BP3D_FJ3145', { dx:  0.0286, dy:-0.0424, dz:-0.0330, reason: 'left kidney into VH capsule' }],
  ['BP3D_FJ3147', { dx: -0.0300, dy:-0.0157, dz:-0.0428, reason: 'right kidney into VH capsule' }],
])
const found = new Set(), touched = new Set(), report = []
for (const part of atlas.parts) {
  const fix = fixes.get(part.id)
  if (!fix) continue
  found.add(part.id)
  const buf = buffers[part.chunk]
  const positions = new Float32Array(buf.buffer, buf.byteOffset + part.positions, part.vertexCount * 3)
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity]
  let sum = [0, 0, 0]
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] += fix.dx; positions[i + 1] += fix.dy; positions[i + 2] += fix.dz
    for (let axis = 0; axis < 3; axis++) {
      const v = positions[i + axis]
      min[axis] = Math.min(min[axis], v); max[axis] = Math.max(max[axis], v); sum[axis] += v
    }
  }
  part.bounds = [min, max]
  touched.add(part.chunk)
  report.push({ id: part.id, reason: fix.reason, centroid: sum.map(v => +(v / part.vertexCount).toFixed(4)), bounds: [min.map(v=>+v.toFixed(4)), max.map(v=>+v.toFixed(4))] })
}
if (found.size !== fixes.size) throw new Error(`Expected ${fixes.size} meshes; found ${found.size}: ${[...fixes.keys()].filter(id=>!found.has(id)).join(', ')}`)
for (const i of touched) {
  const chunk = atlas.chunks[i], raw = buffers[i]
  writeFileSync(path(basename(chunk.url)), raw)
  const gz = gzipSync(raw, { level: 9 })
  writeFileSync(path(basename(chunk.gzip)), gz)
  chunk.bytes = raw.byteLength; chunk.gzipBytes = gz.byteLength
}
atlas.geometryRepairs = [...(atlas.geometryRepairs ?? []), repairId]
writeFileSync(manifestPath, JSON.stringify(atlas))
console.log(JSON.stringify({ repairId, repaired: report.length, touchedChunks: [...touched], report }, null, 2))
