// Recompute per-mesh bounds from the packed vertex buffers and correct clear
// system-tagging mistakes in the male atlas. No vertex positions are changed.
import { readFileSync, writeFileSync } from 'node:fs'
import { gunzipSync } from 'node:zlib'
import { join, basename } from 'node:path'

const dir = new URL('../public/models/', import.meta.url)
const path = (name) => join(dir.pathname, name)
const files = ['atlas.json', 'atlas-female.json']
const report = []

for (const file of files) {
  const filePath = path(file)
  const atlas = JSON.parse(readFileSync(filePath, 'utf8'))
  const buffers = atlas.chunks.map((chunk) => gunzipSync(readFileSync(path(basename(chunk.gzip)))))
  let changedBounds = 0

  for (const part of atlas.parts) {
    const buffer = buffers[part.chunk]
    const positions = new Float32Array(buffer.buffer, buffer.byteOffset + part.positions, part.vertexCount * 3)
    const min = [Infinity, Infinity, Infinity]
    const max = [-Infinity, -Infinity, -Infinity]
    for (let i = 0; i < positions.length; i += 3) {
      for (let axis = 0; axis < 3; axis++) {
        const value = positions[i + axis]
        if (!Number.isFinite(value)) throw new Error(`${file}: non-finite vertex in ${part.id}`)
        if (value < min[axis]) min[axis] = value
        if (value > max[axis]) max[axis] = value
      }
    }
    const next = [min, max]
    if (JSON.stringify(next) !== JSON.stringify(part.bounds)) changedBounds++
    part.bounds = next
  }

  let reclassified = 0
  let removedDuplicates = 0
  if (file === 'atlas.json') {
    // The Ecorche import contains a second sclera/cornea pair on each side.
    // The original BodyParts3D eye meshes remain in the atlas and are the
    // meshes referenced by the left/right eyeball concepts. Keep those.
    const duplicateEyeIds = new Set(['ECORCHE_0406', 'ECORCHE_0452', 'ECORCHE_0526', 'ECORCHE_0572'])
    const before = atlas.parts.length
    atlas.parts = atlas.parts.filter((part) => !duplicateEyeIds.has(part.id))
    removedDuplicates = before - atlas.parts.length
    for (const concept of atlas.concepts) {
      concept.elements = concept.elements.filter((id) => !duplicateEyeIds.has(id))
    }
    const moveToNervous = new Set([
      'Third ventricle', 'Fourth ventricle', 'Interventricular foramen',
      'Left lateral ventricle', 'Right lateral ventricle',
    ])
    for (const part of atlas.parts) {
      if (moveToNervous.has(part.name) && part.system !== 'nervous') {
        part.system = 'nervous'
        reclassified++
      }
    }
  }

  writeFileSync(filePath, JSON.stringify(atlas))
  report.push({ file, parts: atlas.parts.length, changedBounds, reclassified, removedDuplicates })
}

console.log(JSON.stringify(report, null, 2))
