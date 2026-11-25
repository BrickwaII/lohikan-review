// Outdoor object kind 'footbridge' (EXTRAS type: 'footbridge').
// Wooden plank footbridge along local +x, length e.len, width e.w. Deck ends sit e.dz0 / e.dz1 above the origin
// (origin = ground at the bridge middle, so the deck can slope from bank to bank). Posts go down to e.base (default -1.5).
import * as THREE from 'three';

export function footbridge(e, g) {
  const L = e.len, W = e.w || 1.5, z0 = e.dz0 ?? 0.5, z1 = e.dz1 ?? 0.5, base = e.base ?? -1.5;
  const wood = new THREE.MeshStandardMaterial({ color: e.color || 0x7a5a3c, roughness: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x5b412b, roughness: 0.95 });
  const zAt = x => z0 + (z1 - z0) * (x / L + 0.5);
  const slope = Math.atan2(z1 - z0, L), run = Math.hypot(L, z1 - z0);
  const n = Math.round(run / 0.16);
  for (let k = 0; k < n; k++) {          // planks across the deck
    const x = -L / 2 + (k + 0.5) * L / n;
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, W), k % 3 ? wood : dark);
    p.position.set(x, zAt(x), 0); p.rotation.z = slope; g.add(p);
  }
  for (const s of [-1, 1]) {             // stringers, posts, handrails
    const st = new THREE.Mesh(new THREE.BoxGeometry(run, 0.22, 0.1), dark);
    st.position.set(0, (z0 + z1) / 2 - 0.14, s * (W / 2 - 0.12)); st.rotation.z = slope; g.add(st);
    const np = Math.max(2, Math.round(L / 2) + 1);
    for (let k = 0; k < np; k++) {
      const x = -L / 2 + k * L / (np - 1), top = zAt(x) + 1.0, bot = Math.min(base, zAt(x) - 0.3);
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.1, top - bot, 0.1), wood);
      p.position.set(x, (top + bot) / 2, s * (W / 2)); g.add(p);
    }
    for (const h of [1.0, 0.5]) {
      const r = new THREE.Mesh(new THREE.BoxGeometry(run, 0.07, 0.07), wood);
      r.position.set(0, (z0 + z1) / 2 + h, s * (W / 2)); r.rotation.z = slope; g.add(r);
    }
  }
  return g;
}
