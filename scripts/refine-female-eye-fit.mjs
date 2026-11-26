// Refine the eye fit: anterior chambers align to corneal centres; lids align to
// their corresponding upper/lower VH palpebral conjunctiva landmarks.
import { readFileSync, writeFileSync } from 'node:fs'
import { gunzipSync, gzipSync } from 'node:zlib'
import { join, basename } from 'node:path'
const dir = new URL('../public/models/', import.meta.url), path = n => join(dir.pathname,n)
const mp=path('atlas-female.json'), a=JSON.parse(readFileSync(mp,'utf8'))
const id='female-eye-landmark-refinement-2026-11'
if(a.geometryRepairs?.includes(id)) throw new Error('Already refined')
const buffers=a.chunks.map(c=>gunzipSync(readFileSync(path(basename(c.gzip)))))
const fixes=new Map([
 ['BP3D_FJ1282',[ 0.0006,0.0004,0.0118]], ['BP3D_FJ1324',[ 0.0005,0.0044,0.0118]], ['BP3D_FJ1328',[ 0.0005,0.0048,0.0120]],
 ['BP3D_FJ1332',[-0.0005,0.0005,0.0117]], ['BP3D_FJ1375',[-0.0004,0.0045,0.0117]], ['BP3D_FJ1379',[-0.0005,0.0044,0.0126]],
])
const found=new Set(), touched=new Set()
for(const p of a.parts){const d=fixes.get(p.id);if(!d)continue;found.add(p.id);const b=buffers[p.chunk];const v=new Float32Array(b.buffer,b.byteOffset+p.positions,p.vertexCount*3);const mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];for(let i=0;i<v.length;i+=3){for(let k=0;k<3;k++){v[i+k]+=d[k];mn[k]=Math.min(mn[k],v[i+k]);mx[k]=Math.max(mx[k],v[i+k])}}p.bounds=[mn,mx];touched.add(p.chunk)}
if(found.size!==fixes.size)throw Error('Eye part mismatch')
for(const i of touched){const c=a.chunks[i],raw=buffers[i];writeFileSync(path(basename(c.url)),raw);const gz=gzipSync(raw,{level:9});writeFileSync(path(basename(c.gzip)),gz);c.bytes=raw.byteLength;c.gzipBytes=gz.byteLength}
a.geometryRepairs=[...(a.geometryRepairs??[]),id];writeFileSync(mp,JSON.stringify(a));console.log('Refined six eye meshes across chunks', [...touched])
