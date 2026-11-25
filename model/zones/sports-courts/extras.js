// sports-courts: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  // ---- Sports Center zone (NAIP 2019 outlines; Ghost photos IMG p00653/p00428/p00301) ----
  { type: 'courts', name: 'Basketball courts', map: [1682.5, 1570.5], angleDeg: 0, w: 55, d: 31, n: 3, pad: 0.35 },
  { type: 'sandcourt', name: 'Volleyball (sand)', map: [1688.5, 1599.5], angleDeg: 0, w: 41, d: 14, nets: [0], pad: 0.4 },   /* sand extent from the 2019 aerial: x 1668-1709, y 1592.5-1606.5 (Henry: v5 made it run too long) */   // pad above the 0.25 m slope so the sand reads as one surface (Henry)   // Henry: one net
  { type: 'gaga', name: 'Gaga court', map: [1660.5, 1600.5], angleDeg: 0, r: 3.6, h: 0.8 },   // Henry: octagonal gaga court at the end of the volleyball area (round feature in NAIP)
  { type: 'bungee', name: 'Bungee Trampoline', map: [1641.0, 1569.0], angleDeg: 0, h: 8, r: 4.2 },
  { type: 'pavilion', name: 'Bungee pavilion', map: [1649.6, 1555.6], angleDeg: 22.5, w: 8.1, d: 9.3, eave: 2.6, top: 4.8, octagon: true, r: 4.4, openSides: [2, 5] },   /* Henry (v6): turned so a corner faces the bungee 360; the bench side toward the trampolines is open */
  { type: 'closet', name: 'Bungee storage closet', map: [1647.9, 1560.3], angleDeg: 160, w: 1.1, d: 0.9, h: 2.2 },   /* v8 (Henry): right at the gazebo's edge between the basketball fence and the gazebo, door opening toward the gazebo */   /* Henry (29 Bungee 360): the brown storage closet by the fence */
];
