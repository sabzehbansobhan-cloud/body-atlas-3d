// Verifies that every model/asset the app references exists in a folder (default: dist) with the right size.
// Usage: node scripts/check-assets.mjs [folder]     (use "public" to check the sources, "dist" after a build)
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.argv[2] || 'dist'
const at = (p) => join(root, p.replace(/^\//, ''))
let bad = 0, ok = 0
const fail = (m) => { bad++; console.error('✗ ' + m) }
const good = () => { ok++ }

for (const f of ['models/atlas.json', 'models/atlas-female.json']) {
  if (!existsSync(at(f))) { fail(`missing ${f}`); continue }
  const atlas = JSON.parse(readFileSync(at(f), 'utf8'))
  for (const c of atlas.chunks) {
    if (!existsSync(at(c.gzip))) fail(`missing ${c.gzip}`)
    else if (statSync(at(c.gzip)).size !== c.gzipBytes) fail(`${c.gzip}: size ${statSync(at(c.gzip)).size} ≠ manifest ${c.gzipBytes}`)
    else good()
  }
  console.log(`${f}: ${atlas.parts.length} parts, ${atlas.chunks.length} chunks`)
}
const organs = JSON.parse(readFileSync('src/organ-models.json', 'utf8'))
const list = Array.isArray(organs) ? organs : Object.values(organs)
for (const m of list) {
  if (!m.src) continue
  existsSync(at(m.src)) ? good() : fail(`missing ${m.src}`)
}
console.log(`organ models listed: ${list.filter((m) => m.src).length}`)
for (const f of ['index.html', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'ATTRIBUTION.md', 'organs/ATTRIBUTION.md'])
  if (root !== 'public' || f !== 'index.html') existsSync(at(f)) ? good() : fail(`missing ${f}`)
if (root !== 'public' && existsSync(at('assets'))) {
  for (const f of readdirSync(at('assets')).filter((n) => n.endsWith('.js'))) {
    const t = readFileSync(at('assets/' + f), 'utf8')
    const matches = t.match(/["'`]\/(models|organs)\/[^"'`]*/g) || []
for (const path of matches) fail(`assets/${f} has absolute path: ${path}`)
  }
}
console.log(bad ? `\n${bad} problem(s), ${ok} ok` : `\nAll good — ${ok} files checked in ${root}/`)
process.exit(bad ? 1 : 0)
