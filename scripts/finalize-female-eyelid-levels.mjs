// Match upper/lower BP3D tarsal plates to the corresponding VH eyelid landmarks.
import { readFileSync, writeFileSync } from 'node:fs'
import { gunzipSync, gzipSync } from 'node:zlib'
import { join, basename } from 'node:path'
const dir=new URL('../public/models/',import.meta.url),path=n=>join(dir.pathname,n),mp=path('atlas-female.json'),a=JSON.parse(readFileSync(mp,'utf8'))
const id='female-eyelid-levels-final-2026-11';if(a.geometryRepairs?.includes(id))throw Error('Already applied')
const buffers=a.chunks.map(c=>gunzipSync(readFileSync(path(basename(c.gzip)))))
const fixes=new Map([['BP3D_FJ1328',[0.0001,-0.0083,-0.0005]],['BP3D_FJ1379',[0.0001,-0.0079,-0.0004]]]);const touched=new Set(),found=new Set()
for(const p of a.parts){const d=fixes.get(p.id);if(!d)continue;found.add(p.id);const raw=buffers[p.chunk],v=new Float32Array(raw.buffer,raw.byteOffset+p.positions,p.vertexCount*3),mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];for(let i=0;i<v.length;i+=3)for(let k=0;k<3;k++){v[i+k]+=d[k];mn[k]=Math.min(mn[k],v[i+k]);mx[k]=Math.max(mx[k],v[i+k])}p.bounds=[mn,mx];touched.add(p.chunk)}
if(found.size!==fixes.size)throw Error('Missing eyelid mesh')
for(const i of touched){const c=a.chunks[i],raw=buffers[i];writeFileSync(path(basename(c.url)),raw);const gz=gzipSync(raw,{level:9});writeFileSync(path(basename(c.gzip)),gz);c.bytes=raw.byteLength;c.gzipBytes=gz.byteLength}
a.geometryRepairs=[...(a.geometryRepairs??[]),id];writeFileSync(mp,JSON.stringify(a));console.log('Final lower eyelid level alignment complete')
