// Outdoor object kind 'dirttrack' (used by EXTRAS entries with type: 'dirttrack').
import * as THREE from 'three';

export function dirttrack(e, g) {   // dirt ribbons along ellipses [cx, cz, a, b, width, tyreEdges]; tyre walls as instanced rings
    const P0 = new THREE.Group(); P0.position.y = e.lift || 0; g.add(P0); const dirt = new THREE.MeshStandardMaterial({ color: 0xc8a982, roughness: 1, side: THREE.DoubleSide });
    const tyreGeo = new THREE.TorusGeometry(0.35, 0.13, 6, 10); tyreGeo.rotateX(Math.PI / 2); const tyres = [];
    for (const [cx, cz, A, B, W, edges] of e.loops || []) { const N = 200, pos = [], idx = [];
      for (let i = 0; i <= N; i++) { const t = i / N * Math.PI * 2, c = Math.cos(t), sn = Math.sin(t);
        let nx = c / A, nz = sn / B; const nl = Math.hypot(nx, nz); nx /= nl; nz /= nl; const x = cx + A * c, z = cz + B * sn;
        pos.push(x - nx * W / 2, 0.03, z - nz * W / 2, x + nx * W / 2, 0.03, z + nz * W / 2);
        if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
        if (edges) for (const sg of [-1, 1]) tyres.push([x + sg * nx * (W / 2 + 0.3), z + sg * nz * (W / 2 + 0.3)]); }
      const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); gg.setIndex(idx); gg.computeVertexNormals(); P0.add(new THREE.Mesh(gg, dirt)); }
    if (tyres.length) { const im = new THREE.InstancedMesh(tyreGeo, new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.9 }), tyres.length * 2); const m4 = new THREE.Matrix4(); let k = 0;
      for (const [x, z] of tyres) for (const y of [0.13, 0.39]) { m4.makeTranslation(x, y, z); im.setMatrixAt(k++, m4); } P0.add(im); }
  }
