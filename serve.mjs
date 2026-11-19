// Zero-dependency static server for the built app:  node serve.mjs [folder] [port]
// Works for local testing and from a phone on the same Wi-Fi (it prints the LAN address).
import { createServer } from 'node:http'
import { createReadStream, statSync, existsSync } from 'node:fs'
import { join, extname, normalize, resolve } from 'node:path'
import { networkInterfaces } from 'node:os'

const dir = resolve(process.argv[2] || 'dist')
const port = Number(process.argv[3] || process.env.PORT || 4173)
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.glb': 'model/gltf-binary', '.gz': 'application/gzip', '.bin': 'application/octet-stream', '.md': 'text/markdown; charset=utf-8',
  '.mp4': 'video/mp4', '.woff2': 'font/woff2' }

createServer((req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '')
  let file = join(dir, p)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file) || !file.startsWith(dir)) { res.writeHead(404); return res.end('Not found') }
  // .gz files are sent as plain bytes (no Content-Encoding): the app decompresses them itself.
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream', 'Content-Length': statSync(file).size })
  createReadStream(file).pipe(res)
}).listen(port, '0.0.0.0', () => {
  console.log(`Body Atlas → http://localhost:${port}/`)
  for (const list of Object.values(networkInterfaces()))
    for (const i of list || []) if (i.family === 'IPv4' && !i.internal) console.log(`On your phone (same Wi-Fi): http://${i.address}:${port}/`)
})
