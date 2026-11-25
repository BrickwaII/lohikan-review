// Camp-wide locked decisions (run with node tools/check_locks.mjs)
export const locks = [
  { what: 'Henry Nov 25: grey shingle roofs use the real Dining Hall roof texture (core/textures/roof_shingle.jpg)', check: k => /grey: 'textures\/roof_shingle\.jpg'/.test(k.source('core/materials.js')) && k.source('core/textures/roof_shingle.jpg').length > 1000 },
  { what: 'Outside walls everywhere use the one shared siding from core/materials.js (Henry: most buildings are the exact same dark brown wood)', check: k =>
      /sidingTexture\(/.test(k.source('core/building.js')) && /sidingTexture\(STANDARD_SIDING\)/.test(k.source('zones/sports-center/kit.js')) && !/const SID = \{/.test(k.source('core/building.js')) },
  { what: "The camp-standard siding is 'darkbrown'", check: k => /STANDARD_SIDING = 'darkbrown'/.test(k.source('core/materials.js')) },
];
locks.push({ what: 'Corrugated metal siding is used only by the Rec Hall', check: k => k.BUILDINGS.filter(b => b.siding === 'corrugated').every(b => b.id === 'rec_hall') });
