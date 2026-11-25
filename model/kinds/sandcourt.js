// Outdoor object kind 'sandcourt' (used by EXTRAS entries with type: 'sandcourt').
import * as THREE from 'three';

export function sandcourt(e, g) {   // sand volleyball court(s) with timber edging and nets
    const W = e.w, D = e.d, M = c => new THREE.MeshStandardMaterial({ color: c, roughness: 1 }), pad = e.pad || 0.1;
    const sand = new THREE.Mesh(new THREE.BoxGeometry(W, pad + 1, D), M(0xe3d3b0)); sand.position.y = pad / 2 - 0.5; g.add(sand);
    for (const [ex, ez, ew, ed] of [[0, -D / 2, W + 0.3, 0.3], [0, D / 2, W + 0.3, 0.3], [-W / 2, 0, 0.3, D], [W / 2, 0, 0.3, D]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(ew, pad + 0.25, ed), M(0x6b5236)); b.position.set(ex, (pad + 0.25) / 2 - 0.05, ez); g.add(b); }
    for (const nx of e.nets || [0]) { for (const sg of [-1, 1]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 8), M(0xcfd3d6)); p.position.set(nx, pad + 1.3, sg * 5.0); g.add(p); }
      const net = new THREE.Mesh(new THREE.PlaneGeometry(10, 0.9), new THREE.MeshStandardMaterial({ color: 0x222222, transparent: true, opacity: 0.55, side: THREE.DoubleSide })); net.rotation.y = Math.PI / 2; net.position.set(nx, pad + 1.98, 0); g.add(net); }
  }
