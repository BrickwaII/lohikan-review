// cabins: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  /* v8: Henry asked to remove the amphitheater split-rail fence until he gives guidance from another angle */ // { type: 'fence', name: 'Amphitheater split-rail fence', map: [1459.0, 1491.8], angleDeg: 0, color: '#8a6a48', rails: 2, h: 1.1, lines: [[[9.0, -3.3], [5.7, -5.7], [2.7, -7.5], [0, -8.8], [-2.4, -9.6]]] },   /* Henry: wooden split-rail fence along the far side of the road in front of the amphitheater */
  { type: 'tetherball', name: 'Tetherball (cabins 2 & 3)', map: [1393.5, 1496.75] },
  { type: 'gateway', name: 'Sr Girls Hill sign', map: [1812.5, 1636.0], angleDeg: -18, text: 'SR GIRLS HILL', fence: [9, 7] },   /* Ghost IMG_8267 (heading 18 deg from 1805,1613): timber gateway sign + split-rail fence at the top of the bank; position estimated ~25 m along the heading */
];
