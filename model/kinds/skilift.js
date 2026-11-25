// Outdoor object kind 'skilift' (used by EXTRAS entries with type: 'skilift').
import * as THREE from 'three';
import { PALETTE, STANDARD_SIDING, sidingMaterial } from '../core/materials.js';

export function skilift(e, g) {   /* hut plus a steel bullwheel frame; the lift line runs downhill to the south (local +z) */
    const M = (c, r = 0.85) => new THREE.MeshStandardMaterial({ color: c, roughness: r }), wood = M(0x6b4a30), roofM = M(0xd9d9d6, 0.6), steel = M(0x5f6366, 0.5);
    const hut = new THREE.Mesh(new THREE.BoxGeometry(4.0, 3.0, 5.5), sidingMaterial(STANDARD_SIDING, 5.5, 3.0));   /* Henry: camp-standard dark brown board siding */ hut.position.set(-2.2, 1.5, -1.0); g.add(hut);
    const rf = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.15, 6.1), roofM); rf.position.set(-2.2, 3.35, -1.0); rf.rotation.z = 0.12; g.add(rf);
    const dr = new THREE.Mesh(new THREE.BoxGeometry(0.05, 2.0, 1.0), M(PALETTE.wood.door)); dr.position.set(-0.18, 1.0, 0.6); g.add(dr);
    for (const sx of [-1, 1]) { const post = new THREE.Mesh(new THREE.BoxGeometry(0.25, 4.6, 0.25), steel); post.position.set(1.6 + sx * 1.0, 2.3, 1.2); g.add(post); }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 0.25), steel); beam.position.set(1.6, 4.5, 1.2); g.add(beam);
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(1.1, 0.08, 6, 24), steel); wheel.rotation.x = Math.PI / 2; wheel.position.set(1.6, 4.2, 2.2); g.add(wheel);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 1.1), steel); arm.position.set(1.6, 4.35, 1.65); g.add(arm);
    for (const sx of [-1.1, 1.1]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 30, 4), M(0x222222)); c.rotation.x = Math.PI / 2 - 0.12; c.position.set(1.6 + sx, 2.4, 2.2 + 15); g.add(c); }
  }
