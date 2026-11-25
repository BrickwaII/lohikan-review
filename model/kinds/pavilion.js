// Outdoor object kind 'pavilion' (used by EXTRAS entries with type: 'pavilion').
import * as THREE from 'three';

export function pavilion_octagon(e, g) {   // octagonal gazebo (29 Bungee Trampoline 360): raised wood deck, 8 posts, brown shingle roof, white fascia, square cupola
    const R = e.r || 5.0, eh = e.eave || 2.6, top = e.top || 4.6, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, side: THREE.DoubleSide });
    const deck = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.5, 8), M(0x7a6248)); deck.rotation.y = Math.PI / 8; deck.position.y = 0.25; g.add(deck);
    for (let k = 0; k < 8; k++) { const a2 = Math.PI / 8 + k * Math.PI / 4, px = Math.cos(a2) * (R - 0.25), pz = Math.sin(a2) * (R - 0.25);
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, eh, 0.2), M(0xa58a6a)); p.position.set(px, 0.5 + eh / 2, pz); g.add(p);
      if (!(e.openSides || [2]).includes(k)) { const a3 = a2 + Math.PI / 8, sl = 2 * (R - 0.25) * Math.sin(Math.PI / 8), cx = Math.cos(a3) * (R - 0.25) * Math.cos(Math.PI / 8), cz = Math.sin(a3) * (R - 0.25) * Math.cos(Math.PI / 8);
        const rail = new THREE.Mesh(new THREE.BoxGeometry(sl, 0.08, 0.1), M(0xa58a6a)); rail.position.set(cx, 1.4, cz); rail.rotation.y = -a3 + Math.PI / 2; g.add(rail);
        const bench = new THREE.Mesh(new THREE.BoxGeometry(sl - 0.3, 0.06, 0.4), M(0x8a7050)); bench.position.set(cx * 0.9, 0.95, cz * 0.9); bench.rotation.y = -a3 + Math.PI / 2; g.add(bench); } }
    const fas = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.4, R + 0.4, 0.25, 8, 1, true), M(0xf1efe8)); fas.rotation.y = Math.PI / 8; fas.position.y = 0.5 + eh; g.add(fas);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(R + 0.45, top - eh, 8, 1, true), M(0x8a6a4a)); roof.rotation.y = Math.PI / 8; roof.position.y = 0.5 + eh + (top - eh) / 2; g.add(roof);
    const cup = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), M(0xf1efe8)); cup.position.y = 0.5 + top - 0.05; g.add(cup);
    const cr = new THREE.Mesh(new THREE.ConeGeometry(0.8, 0.6, 4), M(0x8a6a4a)); cr.rotation.y = Math.PI / 4; cr.position.y = 0.5 + top + 0.6; g.add(cr);
  }

export function pavilion(e, g) {   // open pavilion: posts, low rail, hip roof
    const W = e.w, D = e.d, eh = e.eave || 2.6, top = e.top || 4.4, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, side: THREE.DoubleSide });
    const fl = new THREE.Mesh(new THREE.BoxGeometry(W, 0.3, D), M(0x8d8a83)); fl.position.y = 0.15; g.add(fl);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.22, eh, 0.22), M(0x4a3826)); p.position.set(sx * (W / 2 - 0.2), eh / 2, sz * (D / 2 - 0.2)); g.add(p); }
    for (const sx of [-1, 0, 1]) for (const sz of [-1, 1]) if (sx === 0) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.2, eh, 0.2), M(0x4a3826)); p.position.set(0, eh / 2, sz * (D / 2 - 0.2)); g.add(p); }
    const r = Math.hypot(W, D) / 2 + 0.5; const roof = new THREE.Mesh(new THREE.ConeGeometry(r, top - eh, 4, 1, true), M(0x5b4636)); roof.rotation.y = Math.PI / 4; roof.scale.set((W + 1) / (r * Math.SQRT2), 1, (D + 1) / (r * Math.SQRT2)); roof.position.y = eh + (top - eh) / 2; g.add(roof);
  }
