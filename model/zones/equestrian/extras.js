// equestrian: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  { type: 'arena', name: 'Equestrian indoor ring (open sides)', map: [2025.55, 1930.72], angleDeg: -115.7, x0: -38.0, x1: 20.5, hw: 12.25, eave: 6.0, rise: 2.6, w: 77, d: 25, endDoor: { w: 3.0, h: 3.4, z: 2.5 } },   /* 11 Equestrian Barn 360: open-sided ring; stall barn (b002 body) at the SW end */
  { type: 'signboard', name: 'Equestrian Center sign', map: [2008.81, 1895.94], angleDeg: -25.7, text: 'EQUESTRIAN CENTER', y: 8.4, w: 7.5, h: 1.0 },   /* 04 Equestrian Aerial 360: white-lettered sign high on the SW gable of the stall barn */
  { type: 'fence', name: 'Equestrian outdoor rings fence', map: [1992.5, 1860.0], angleDeg: 0, lines: [[[-23.0, 45.5], [13.75, 27.5], [-11.25, -27.0], [-50.0, -9.5], [-23.0, 45.5]], [[13.75, 27.5], [50.0, 12.0], [25.0, -43.75], [-11.25, -27.0]]], color: '#f4f4f0', rails: 3 },   /* two white 3-rail fenced paddocks SW of the barn, traced from NAIP 2019 and seen in the 04 Equestrian Aerial 360 */
];
