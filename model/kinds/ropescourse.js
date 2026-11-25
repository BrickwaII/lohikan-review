// Outdoor object kind 'ropescourse' (used by EXTRAS entries with type: 'ropescourse').
import * as THREE from 'three';

export function ropescourse(e, g) {   // climbing tower (tapered pillar with angled wooden faces and holds) + high ropes poles with platforms and cables + benches
    const M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }), wood = M(0x6e5038), pole = M(0x7a6248), steel = M(0x9aa0a4);
    { const T = new THREE.Group(); T.position.set(2, 0, -2); const H = 9;
      const core = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.5, H, 3), wood); core.position.y = H / 2; T.add(core);
      for (let k = 0; k < 3; k++) { const a = k * Math.PI * 2 / 3; const face = new THREE.Mesh(new THREE.BoxGeometry(1.6, 3.2, 0.25), M(0x8a6a4a)); face.position.set(Math.cos(a) * 1.35, 2.2 + (k % 2) * 3, Math.sin(a) * 1.35); face.rotation.y = -a + Math.PI / 2; face.rotation.x = -0.25; T.add(face); }
      const cols = [0xe8434a, 0xf2c12e, 0x3fb36b, 0x4d8fd6, 0x9b59b6]; for (let i = 0; i < 60; i++) { const a = i * 2.39, y = 0.6 + (i * 0.137) % (H - 1.2), r = 1.5 - y / H * 0.5 + 0.06; const h = new THREE.Mesh(new THREE.SphereGeometry(0.07, 5, 4), M(cols[i % 5])); h.position.set(Math.cos(a) * r, y, Math.sin(a) * r); T.add(h); }
      const top = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.15, 3), M(0x4a3626)); top.position.y = H + 0.05; T.add(top); g.add(T); }
    const poles = [[-6, -4], [-2, -7], [3, -7.5], [7, -4], [8, 2], [-7, 3]];
    for (const [px, pz] of poles) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 11, 8), pole); p.position.set(px, 5.5, pz); g.add(p);
      const pl = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.1, 1.4), wood); pl.position.set(px, 7.5, pz); g.add(pl); }
    for (let i = 0; i < poles.length - 1; i++) { const [ax, az] = poles[i], [bx, bz] = poles[i + 1]; const L = Math.hypot(bx - ax, bz - az), ang = Math.atan2(bz - az, bx - ax);
      for (const y of [7.6, 9.4]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, L, 4), steel); c.rotation.z = Math.PI / 2; c.rotation.y = -ang; c.position.set((ax + bx) / 2, y, (az + bz) / 2); g.add(c); }
      for (let k = 1; k < 5; k++) { const t = k / 5; const st = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.06, 0.3), wood); st.position.set(ax + (bx - ax) * t, 7.55, az + (bz - az) * t); st.rotation.y = -ang; g.add(st); } }
    for (const [bx, bz, ry] of [[-3, 5, 0], [3, 5.5, 0.3], [-8, -0.5, 1.4]]) { const bn = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 0.4), M(0xa8342a)); bn.position.set(bx, 0.45, bz); bn.rotation.y = ry; g.add(bn);
      for (const dx of [-0.8, 0.8]) { const lg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.35), M(0x5a3e2a)); lg.position.set(bx + dx * Math.cos(ry), 0.22, bz - dx * Math.sin(ry)); lg.rotation.y = ry; g.add(lg); } }
  }
