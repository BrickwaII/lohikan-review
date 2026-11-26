// cabins: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  /* v8: Henry asked to remove the amphitheater split-rail fence until he gives guidance from another angle */ // { type: 'fence', name: 'Amphitheater split-rail fence', map: [1459.0, 1491.8], angleDeg: 0, color: '#8a6a48', rails: 2, h: 1.1, lines: [[[9.0, -3.3], [5.7, -5.7], [2.7, -7.5], [0, -8.8], [-2.4, -9.6]]] },   /* Henry: wooden split-rail fence along the far side of the road in front of the amphitheater */
  { type: 'tetherball', name: 'Tetherball (cabins 2 & 3)', map: [1393.5, 1496.75] },
  { type: 'gateway', name: 'Sr Girls Hill sign', map: [1812.5, 1636.0], angleDeg: -18, text: 'SR GIRLS HILL', fence: [9, 7] },   /* Ghost IMG_8267 (heading 18 deg from 1805,1613): timber gateway sign + split-rail fence at the top of the bank; position estimated ~25 m along the heading */
  { type: 'footbridge', name: 'Footbridge behind cabins 10 & 11', map: [1578.0, 1570.8], angleDeg: -3, len: 7.0, w: 1.5, dz0: 1.0, dz1: 1.0, base: -1.2 },   /* Henry Nov 25: wooden bridge behind cabins 10 and 11 over the little stream/divot, on the way up the hill to the road and Sports Center. Spot = head of the gully in the 2019 LiDAR (bottom ~450.0 at x 1612); length and look are guesses, check on the road tour */
  { type: 'culvert', name: 'Creek culvert under the main road', map: [1497.5, 1599.3], angleDeg: -35.0, len: 12, d: 0.9 },   /* Henry Nov 25: the creek from the Rec Hall goes under the road through a corrugated metal pipe, then runs straight behind cabins 10 & 11. Spot = where his drawn creek crosses the road */
];
