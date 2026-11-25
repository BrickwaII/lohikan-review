// Dance studio in the circus north aisle: mirror wall, wood floor, barres, ceiling.
// Part of the Sports Center + Circus zone; called in order by ./index.js. Read ./NOTES.md before changing.
import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

export function buildDanceStudio(k) {
  const { S, mat, quad, inn, CX, H, NH } = k;
    // dance studio in the north aisle, middle of the north lower roof, a bit west of centre (Henry 00:53; 360° photo s19): curved white ceiling, cream walls with wood-trimmed windows on both long sides,
    // a mirror across the east end over a low step, wood floor, ballet barre, white doors and blue benches. Length 11 m is an estimate.
    {
      const dx0 = CX - 8.5, dx1 = CX + 2.5, z0 = -H + 0.3, z1 = -NH - 0.3, zc = (z0 + z1) / 2, hw = (z1 - z0) / 2, wallH = S.aisleEave - 0.2;
      const cream = mat({ color: 0xf0ead0, emissive: 0x8a8670, emissiveIntensity: 0.45 }), trim = mat({ color: 0xc08a4c });
      const df = new THREE.Mesh(new THREE.PlaneGeometry(dx1 - dx0, z1 - z0), mat({ color: 0xc8904e, roughness: 0.35 })); df.rotation.x = -Math.PI / 2; df.position.set((dx0 + dx1) / 2, 0.03, zc); inn.add(df);
      for (const z of [z0, z1]) inn.add(quad([dx0, 0, z], [dx1, 0, z], [dx1, wallH, z], [dx0, wallH, z], cream, [1, 1]));
      for (const x of [dx0, dx1]) inn.add(quad([x, 0, z0], [x, 0, z1], [x, wallH, z1], [x, wallH, z0], cream, [1, 1]));
      const roofAt = z => S.aisleEave + (S.aisleTop - S.aisleEave) * (H - Math.abs(z)) / (H - NH) - 0.2;   // under the north-aisle lean-to
      inn.add(quad([dx0, roofAt(z0), z0], [dx1, roofAt(z0), z0], [dx1, roofAt(z1), z1], [dx0, roofAt(z1), z1], mat({ color: 0xf4f1e8, emissive: 0xd8d6cf, emissiveIntensity: 0.85, side: THREE.DoubleSide }), [1, 1]));
      for (const x of [dx0, dx1]) inn.add(quad([x, wallH, z0], [x, wallH, z1], [x, roofAt(z1), z1], [x, roofAt(z0), z0], cream, [1, 1]));
      inn.add(quad([dx0, wallH, z1], [dx1, wallH, z1], [dx1, roofAt(z1), z1], [dx0, roofAt(z1), z1], cream, [1, 1]));
      /* Henry 01:04: the south wall (facing the circus) is one giant mirror across its whole length, over a low step; windows are on the north wall and the end walls */
      const glass = mat({ color: 0xdfeefa, emissive: 0xbfd8ea, emissiveIntensity: 0.6 });
      for (let x = dx0 + 1.2; x < dx1 - 0.8; x += 2.0) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), glass); w.position.set(x, 1.75, z0 + 0.04); inn.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.85, 0.04), trim); fr.position.set(x, 1.75, z0 + 0.02); inn.add(fr); }
      for (const [x, ry] of [[dx0 + 0.04, Math.PI / 2], [dx1 - 0.04, -Math.PI / 2]]) for (const z of [z0 + 1.3, z1 - 1.3]) { const w = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), glass); w.rotation.y = ry; w.position.set(x, 1.75, z); inn.add(w);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.85, 1.05), trim); fr.position.set(x + (ry > 0 ? -0.02 : 0.02), 1.75, z); inn.add(fr); }
      { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, dx1 - dx0 - 1, 6), trim); b.rotation.z = Math.PI / 2; b.position.set((dx0 + dx1) / 2, 1.05, z0 + 0.12); inn.add(b); }
      for (const x of [dx0 + 0.12, dx1 - 0.12]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.0, 6), trim); b.rotation.x = Math.PI / 2; b.position.set(x, 1.05, z0 + 1.5); inn.add(b); }
      const step = new THREE.Mesh(new THREE.BoxGeometry(dx1 - dx0 - 0.2, 0.3, 0.6), mat({ color: 0xece4c8 })); step.position.set((dx0 + dx1) / 2, 0.15, z1 - 0.35); inn.add(step);
      const mirror = new Reflector(new THREE.PlaneGeometry(dx1 - dx0 - 0.4, 1.7), { textureWidth: 1024, textureHeight: 256, color: 0xc4ccd0, clipBias: 0.003 });   /* Henry: mirrors should actually reflect */ mirror.rotation.y = Math.PI; mirror.position.set((dx0 + dx1) / 2, 0.3 + 0.95, z1 - 0.07); inn.add(mirror);
      for (const [x, ry] of [[dx0 + 0.05, Math.PI / 2], [dx1 - 0.05, -Math.PI / 2]]) { const d = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.05), mat({ color: 0xf6f4ee })); d.rotation.y = ry; d.position.set(x, 1.03, zc);   /* Henry 01:05: doors on the east and west walls, about in the middle */ inn.add(d); }
      for (const x of [dx0 + 2.5, dx0 + 6.5]) { const bn = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.35), mat({ color: 0x3a6fc4 })); bn.position.set(x, 0.2, z0 + 0.4); inn.add(bn); }
    }
  return {  };
}
