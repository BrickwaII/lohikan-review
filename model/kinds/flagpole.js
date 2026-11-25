// Outdoor object kind 'flagpole' (used by EXTRAS entries with type: 'flagpole').
import * as THREE from 'three';

export function flagpole(e, g) { const m = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, metalness: 0.5, roughness: 0.4 });
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, e.height, 10), m); p.position.y = e.height / 2; g.add(p);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 })); b.position.y = e.height + 0.08; g.add(b);
    const c = document.createElement('canvas'); c.width = 190; c.height = 100; const x = c.getContext('2d');
    for (let i = 0; i < 13; i++) { x.fillStyle = i % 2 ? '#fff' : '#b22234'; x.fillRect(0, i * 100 / 13, 190, 100 / 13 + 1); } x.fillStyle = '#3c3b6e'; x.fillRect(0, 0, 76, 54);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    const f = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.0), new THREE.MeshStandardMaterial({ map: t, side: THREE.DoubleSide, roughness: 0.9 })); f.position.set(0.97, e.height - 0.6, 0); g.add(f);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.25, 20), new THREE.MeshStandardMaterial({ color: 0x8d8a83 })); base.position.y = 0.12; g.add(base); }
