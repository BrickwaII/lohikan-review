// cabins: buildings (built by model/core/building.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const BUILDINGS = [
  // Henry: cabins 2 and 3 are a pair, side by side on one line at the same level, with a tetherball court between them.
  // Each has a porch along almost the whole front with stairs down at both ends (toward the middle and the outsides of the pair) and two doorways (A and B).
  ...[['cabin2', 'Cabin 2', [1386.65, 1498.21], '2A', '2B'], ['cabin3', 'Cabin 3', [1400.35, 1495.29], '3A', '3B']].map(([id, name, map, dA, dB]) => ({
    id, name, map, angleDeg: -12.0, groundZ: 442.5, levelGroup: 'cabins23', len: 7.0, wid: 5.5, floor: 0.6, eave: 3.0, ridge: 4.4,
    /* Henry: cabins 2 and 3 are the same brown wood as all the other cabins */
    roof: 'grey', siding: 'darkbrown', trim: 'brown', body: [[-3.3, 3.3, -2.5, 2.5]],
    porches: [{ x0: -3.05, x1: 3.05, z0: 2.5, z1: 4.1, rail: true, roof: true, stairs: [{ edge: '-x', at: 3.3, width: 1.0 }, { edge: '+x', at: 3.3, width: 1.0 }] }],
    windows: { spacing: 2.4, h: 1.0, sill: 1.0, sides: ['-z'] }, doors: [{ side: 1, along: -1.5, w: 0.9 }, { side: 1, along: 1.5, w: 0.9 }],
    winList: [{ wall: '-x', at: 0, y: 1.0, w: 0.9, h: 1.0 }, { wall: '+x', at: 0, y: 1.0, w: 0.9, h: 1.0 }],
    assumptions: ['Henry: cabins 2 and 3 are a matching pair on one line at the same level with a tetherball court between them; each porch runs almost the full front with stairs at both ends; two doorways per cabin (' + dA + ', ' + dB + '). Size (7 × 5.5 m), the 7 m gap and the facing direction (porches to the south) are estimates.'] })),
];
