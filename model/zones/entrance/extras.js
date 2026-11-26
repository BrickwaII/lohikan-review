// entrance: outdoor objects (built by model/kinds/<type>.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const EXTRAS = [
  // Lower field (Henry: pretty much just the soccer goals). Field extent from NAIP; goal positions are estimates.
  // { type: 'entrance', name: 'Camp entrance sign + security gate', map: [1355.0, 1283.5], angleDeg: 0, roadW: 6 },   (v7 placement, replaced Nov 25)
  { type: 'entrance', name: 'Security gate + CAMP LOHIKAN sign', map: [1342.8, 1280.5], angleDeg: 23.4, roadW: 5.6, parts: ['arm', 'sign'], signX: 7.5 },   /* Henry (Nov 25 answer + road tour stop 2): the gate arm is before the CAMP LOHIKAN sign, on the left going up the hill; the box is small (~1 sq ft), set beside the road (not in it), arm ~3 ft up across the road. Angle = the hill road's direction here */
  { type: 'entrance', name: 'Guard booth', map: [1296.0, 1261.5], angleDeg: 0, parts: ['booth'] },   /* Henry (Nov 25): the guard booth is next to the lake entrance, on the south side of Wallerville Rd. Exact spot is a guess */   /* Henry (road 2 360): the CAMP LOHIKAN entrance sign and the security gate, ~11 m ENE of the 360 spot; look is a placeholder until photos are matched */
];
