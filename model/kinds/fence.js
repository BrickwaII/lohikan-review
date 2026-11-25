// Outdoor object kind 'fence' (used by EXTRAS entries with type: 'fence').
import * as THREE from 'three';

export function fence(e, g) {   // post-and-rail fence along polylines given as map offsets [dx, dy] from e.map (angleDeg 0: local x = dx, local z = -dy)
    const M = new THREE.MeshStandardMaterial({ color: new THREE.Color(e.color || '#f4f4f0'), roughness: 0.7, emissive: new THREE.Color(e.color || '#f4f4f0'), emissiveIntensity: 0.15 }), n = e.rails || 3, h = e.h || 1.3;
    if (e.chain) {   // chain-link: see-through mesh panel, top rail, steel posts every ~3 m
      const mesh = new THREE.MeshStandardMaterial({ color: 0x5a6266, metalness: 0.4, roughness: 0.6, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false }), steel = new THREE.MeshStandardMaterial({ color: 0x8c949a, metalness: 0.5, roughness: 0.5 });
      for (const line of e.lines || []) for (let i = 1; i < line.length; i++) { const [ax, ay] = line[i - 1], [bx, by] = line[i], az = -ay, bz = -by, L = Math.hypot(bx - ax, bz - az), ang = Math.atan2(bz - az, bx - ax);
        const pnl = new THREE.Mesh(new THREE.PlaneGeometry(L, h), mesh); pnl.position.set((ax + bx) / 2, h / 2, (az + bz) / 2); pnl.rotation.y = -ang; g.add(pnl);
        const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, L, 6), steel); tr.rotation.z = Math.PI / 2; tr.rotation.y = -ang; tr.position.set((ax + bx) / 2, h, (az + bz) / 2); g.add(tr);
        const np = Math.max(1, Math.round(L / 3)); for (let k = 0; k <= np; k++) { const t = k / np, p = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, h + 0.05, 6), steel); p.position.set(ax + (bx - ax) * t, (h + 0.05) / 2, az + (bz - az) * t); g.add(p); } }
    } else
    for (const line of e.lines || []) for (let i = 1; i < line.length; i++) { const [ax, ay] = line[i - 1], [bx, by] = line[i], az = -ay, bz = -by, L = Math.hypot(bx - ax, bz - az), ang = Math.atan2(bz - az, bx - ax);
      for (let k = 0; k < n; k++) { const r = new THREE.Mesh(new THREE.BoxGeometry(L, 0.1, 0.05), M); r.position.set((ax + bx) / 2, h * (k + 1) / n - 0.05, (az + bz) / 2); r.rotation.y = -ang; g.add(r); }
      const np = Math.max(1, Math.round(L / 2.5)); for (let k = 0; k <= np; k++) { const t = k / np, p = new THREE.Mesh(new THREE.BoxGeometry(0.12, h + 0.1, 0.12), M); p.position.set(ax + (bx - ax) * t, (h + 0.1) / 2, az + (bz - az) * t); g.add(p); } }
  }
