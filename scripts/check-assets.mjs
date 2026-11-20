
// Verifies that every model/asset the app references exists in a folder (default: dist).
// Usage: node scripts/check-assets.mjs [folder]

import {
  readFileSync,
  existsSync,
  statSync,
  readdirSync
} from 'node:fs'

import { join } from 'node:path'

const root = process.argv[2] || 'dist'
const at = (p) => join(root, p.replace(/^\//, ''))

let bad = 0
let ok = 0

const fail = (message) => {
  bad++
  console.error('✗ ' + message)
}

const good = () => {
  ok++
}

// Check main anatomy models
for (const file of [
  'models/atlas.json',
  'models/atlas-female.json'
]) {
  if (!existsSync(at(file))) {
    fail(`missing ${file}`)
    continue
  }

  const atlas = JSON.parse(readFileSync(at(file), 'utf8'))

  for (const chunk of atlas.chunks) {
    if (!existsSync(at(chunk.gzip))) {
      fail(`missing ${chunk.gzip}`)
    } else if (statSync(at(chunk.gzip)).size !== chunk.gzipBytes) {
      fail(
        `${chunk.gzip}: size ${statSync(at(chunk.gzip)).size} ≠ manifest ${chunk.gzipBytes}`
      )
    } else {
      good()
    }
  }

  console.log(
    `${file}: ${atlas.parts.length} parts, ${atlas.chunks.length} chunks`
  )
}

// Check organ models
const organs = JSON.parse(
  readFileSync('src/organ-models.json', 'utf8')
)

const list = Array.isArray(organs)
  ? organs
  : Object.values(organs)

for (const model of list) {
  if (!model.src) continue

  if (existsSync(at(model.src))) {
    good()
  } else {
    fail(`missing ${model.src}`)
  }
}

console.log(
  `organ models listed: ${list.filter((model) => model.src).length}`
)

// Check required files
const requiredFiles = [
  'index.html',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
  'ATTRIBUTION.md',
  'organs/ATTRIBUTION.md'
]

for (const file of requiredFiles) {
  if (root !== 'public' || file !== 'index.html') {
    if (existsSync(at(file))) {
      good()
    } else {
      fail(`missing ${file}`)
    }
  }
}

// Check generated JavaScript for absolute asset paths
if (root !== 'public' && existsSync(at('assets'))) {
  const jsFiles = readdirSync(at('assets'))
    .filter((name) => name.endsWith('.js'))

  for (const file of jsFiles) {
    const content = readFileSync(
      at('assets/' + file),
      'utf8'
    )

    const matches =
      content.match(/["'`]\/(models|organs)\/[^"'`]*/g) || []

    for (const path of matches) {
      fail(
        `assets/${file} has absolute path: ${path}`
      )
    }
  }
}

// Final result
console.log(
  bad
    ? `\n${bad} problem(s), ${ok} ok`
    : `\nAll good — ${ok} files checked in ${root}/`
)

process.exit(bad ? 1 : 0)
