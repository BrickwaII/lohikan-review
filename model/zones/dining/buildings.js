// dining: buildings (built by model/core/building.js)
// map = position on the camp map; see notes in ./NOTES.md before changing anything here.
export const BUILDINGS = [
  {
    id: 'dining', name: 'Dining Hall', lidar: 'b038',
    map: [1354.7, 1548.9], angleDeg: -10.1, groundZ: 446.95,
    len: 48.0, wid: 25.0,               // overall roof footprint (raw LiDAR cross-sections + NAIP), porch included
    floor: 1.3,                          // floor above lowest ground (stairs of ~8 steps in the drone frames)
    eave: 4.4, ridge: 7.4,
    // roof cross-section from the raw 2019 LiDAR (1 m bins): [across (m, + = porch side), height above lowest ground]
    profile: [[-12.5, 4.4], [0, 7.4], [8.0, 4.6], [12.0, 3.9]],
    roof: 'grey', siding: 'darkbrown', trim: 'white',
    // body = enclosed rooms (x along the ridge, z across; +z = plaza side). Kitchen at the west end fills out to the porch line.
    body: [[-24, 12.5, -12.0, 8.0], [12.5, 21, -7.5, 8.0], [-24, -9.1, 8.0, 11.5]],
    // LiDAR: east of x≈12.5 the north wall steps in to z≈-7.5 and that roof section is steeper/lower; the cut-back corner is open,
    // except a low flat overhang (~3.9 m) at x 18–21 over two outdoor bathrooms (Henry).
    roofParts: [{ x0: -24, x1: 12.5 }, { x0: 12.5, x1: 21.5, profile: [[-7.5, 4.4], [0, 7.25], [8.0, 4.6], [12.0, 3.9]] }],
    sheds: [{ x0: 17.9, x1: 19.5, z0: -10.9, z1: -8.6, y0: 1.45, h: 2.3, doors: [{ wall: '-x', at: -9.75 }] }, { x0: 19.6, x1: 21.0, z0: -10.9, z1: -8.6, y0: 1.45, h: 2.3, doors: [{ wall: '-z', at: 20.3 }] }],
    porches: [
      { x0: -9.1, x1: 21, z0: 8.0, z1: 12.0, rail: true, stairs: [{ edge: '+z', at: -7.5, width: 3.2 }] },          // plaza porch, starts at the main stairs
      { x0: 21, x1: 24, z0: -7.5, z1: 12.0, rail: true, roof: true, roofDir: '+x', roofH: 4.3, roofDrop: 0.25, stairs: [{ edge: '-z', at: 22.5, width: 2.0 }] },   // wraps the east end, stairs down to the road (LiDAR: its own flat roof ~4.1 m)
      { x0: 17.5, x1: 21, z0: -11.5, z1: -7.5, noDeck: true, rail: false, roof: true, roofDir: '-z', roofH: 4.0, roofDrop: 0.3, stairs: [] },   // NE corner overhang over the outdoor bathrooms
    ],
    vents: [-4, 3], kitchenVents: [-20, -16],
    windows: { spacing: 3.0, h: 1.3, sill: 1.0 },
    doors: [{ side: +1, along: -7.5, w: 1.8 }, { side: +1, along: 8, w: 1.0 }, { side: -1, along: 14, w: 1.0 }, { side: -1, along: -18, w: 1.4 }],
    assumptions: [
      'Footprint ~48 × 25 m from raw 2019 LiDAR cross-sections and NAIP (the automatic outline under-sized it). Roof: ridge 7.4 m, north eave 4.4 m; the south slope breaks at ~8 m to a shallower porch roof ending at 3.9 m.',
      'Henry: the porch runs along the plaza side from the main stairs eastward, wraps around the east end and continues to the road with connecting stairs. The west end is the kitchen (no porch). Brown posts and railings, white scalloped eave trim (2025 drone video).',
      'Henry (Nov 15): the roof does not reach as far north along the whole length; in the corner there is a small overhang with two outdoor bathrooms. LiDAR confirms the north wall steps in to z≈-7.5 east of x≈12.5, with a low (~3.9 m) overhang at x 18–21; west of x 12.5 the north slope still reaches the eave at z≈-12.5 (4.3 m). Bathroom sizes and door sides are guesses.',
      'Henry confirmed the main plaza stairs position. The road stairs at the north-east corner and the 3 m depth of the east-end porch are estimates.',
      'Floor raised ~1.3 m on the downhill side (stairs visible); foundation shown as a dark lattice skirt.',
      'Two small metal roof vents on the ridge (drone video). Window count and spacing are guesses until close-up photos are matched.',
      'Colours: very dark brown board siding, grey asphalt shingles (2025). Earlier years may differ; check with 2001–2015 photos.',
    ],
  },
  {
    id: 'senior_dining', name: 'Senior Dining Hall', lidar: 'b036',
    map: [1393.3, 1547.7], angleDeg: -9.5, groundZ: 448.11,
    len: 22.0, wid: 7.0, floor: 0.9, eave: 3.8, ridge: 5.4,
    roof: 'green', siding: 'darkbrown', trim: 'brown',
    body: [[-11, 11, -3.5, 3.5]],
    // Henry: two small porches with stairs (not a full-length porch); the right one is centred on the flagpole.
    porches: [
      { x0: 2.8, x1: 6.8, z0: 3.5, z1: 5.9, rail: true, roof: true, stairs: [{ edge: '+z', at: 4.8, width: 1.6 }] },
      { x0: -7.0, x1: -3.6, z0: 3.5, z1: 5.9, rail: true, roof: true, stairs: [{ edge: '+z', at: -5.3, width: 1.4 }] },
      { x0: 11, x1: 13.4, z0: -2.2, z1: 1.8, rail: true, roof: true, roofDir: '+x', stairs: [{ edge: '+x', at: 0.6, width: 1.3 }] },   // Henry: small extra porch on the east end ("the doctor's residence", senior staff housing)
    ],
    winList: [{ wall: '+x', at: -0.9, kind: 'door', w: 0.95 }],
    vents: [], windows: { spacing: 2.6, h: 1.2, sill: 1.0 },
    doors: [{ side: +1, along: 4.8, w: 1.0 }, { side: +1, along: -5.3, w: 1.0 }],
    assumptions: [
      'Footprint 22 × 7 m, eave 3.8 m and ridge 5.4 m from LiDAR; the outline is not very rectangular (68%), so the true shape probably has a wing or porch I have not modelled yet.',
      'Green shingle roof, dark brown siding (2025 drone video). Henry: two small porches with stairs to the ground; the right one is centred on the Flagpole Quad flagpole. The left porch position and both porch sizes are estimates.',
    ],
  },
];
