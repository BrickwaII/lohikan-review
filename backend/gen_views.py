"""Builds site/views.json (places, menus, views) and renders_todo.json (model stills to render with mapshot).
Places are defined once in PLACES; MENU references them by key (a place can sit in several menus, optionally opening on a given view).
Auto views per place with a centre: 'From above' (2015 aerial vs model) + two model views with trees hidden; plus the 360 pair when a tour spot exists."""
import json, math, os
SITE = '/home/claude/review/site'
ASPECT = 1200 / 744
TOP = "Real: 2015 aerial photo, north up. Model: same area from straight above."
MODEL_ONLY = "Model only, trees hidden. No matching real photo yet; if you have one, attach it."
# tour 360 spots: id -> (x, y, model-yaw shift in degrees; tour panos are roughly north-aligned)
PANO = {'s07': 236, 's12': 105, 's14': 180, 's19': 180, 's34': 180}
GAL = json.load(open('/home/claude/review/gal_list.json')) if os.path.exists('/home/claude/review/gal_list.json') else {}

def P(key, name, blurb='', c=None, w=60, pano=None, pano_label=None, extra=None, gal=None, inside=None, auto=True, soon=None, inside_name='Inside', sections=None, merge=None):
    return dict(sections=sections or {}, merge=merge or {}, key=key, name=name, blurb=blurb, c=c, w=w, pano=pano, pano_label=pano_label, extra=extra or [], gal=gal, inside=inside or [], auto=auto, soon=soon or [], inside_name=inside_name)

def still(i, label, img, cap=MODEL_ONLY): return {"id": i, "type": "model", "label": label, "model": img, "cap": cap}

PLACES = [
 # Sports Center building (hand-made views from earlier rounds)
 P('sc', 'Sports Center', 'The big green-roofed Sports Center: the indoor court and canteen as one open hall, flags overhead, colour-war banners on the walls; the circus building is attached on its east end.', auto=False, gal='sports_center_circus', inside_name='Court & canteen', soon=['Canteen counter'], inside=[still("sc-in-w", "Looking west across the court", "img/sc_in_w_model.jpg", "Model only."), still("sc-in-e", "Looking east toward the circus", "img/sc_in_e_model.jpg", "Model only.")], extra=[
   {"id": "sc-top", "type": "pair", "label": "From above", "real": "img/sc_top_real.jpg", "model": "img/sc_top_model.jpg", "cap": TOP},
   still("sc-front", "The front, from the volleyball court", "img/sc_front_model.jpg"), still("sc-se", "From the southeast", "img/sc_se_model.jpg"),
   still("sc-sw", "From the southwest", "img/sc_sw_model.jpg"), still("circ-out", "Circus end, from the east", "img/circ_out_model.jpg")]),
 P('circus', 'Circus', 'The 2008 circus building: trapeze rig, aerial rigging, mats, star-painted walls and the open south side.', auto=False, pano='s07', pano_label='Circus floor'),
 P('dance', 'Dance studio', 'The dance studio off the circus north aisle. Its exact position in the model is a guess.', auto=False, pano='s19', pano_label='Dance studio'),
 P('gym', 'Gymnastics', 'The walled-off gymnastics room along the north wall of the Sports Center.', auto=False, pano='s34', pano_label='Gymnastics room'),
 P('volleyball', 'Volleyball', 'The sand volleyball court in front of the Sports Center.', auto=False, extra=[still("vb-1", "Sand court from the southwest", "img/vb_model.jpg")]),
 P('basketball', 'Basketball', 'The outdoor basketball courts west of the Sports Center.', c=(1683, 1571), w=60, pano='s14', pano_label='Basketball courts'),
 # Performing arts
 P('rock-band', 'Rock Band / Music', 'The music and rock band room.', pano='s21', pano_label='Rock Band room', auto=False),
 P('amphitheater', 'Amphitheater', 'The outdoor amphitheater stage below the Lower Office.', c=(1475, 1480), w=70, pano='s17', pano_label='Amphitheater & Lower Office'),
 P('rec-hall', 'Rec Hall', 'The Rec Hall: stage, big open floor; the circus program ran here through 2007.', c=(1485, 1647), w=70, pano='s18', pano_label='Rec Hall stage', gal='rec_hall', soon=['Backstage']),
 # Creative arts
 P('ac', 'Arts & Crafts', 'The long Art Center: open south side, painted ceiling panels and banners, tables along the back and left walls, closets, and the mesh-covered patio out front.', auto=False, gal='art_center', extra=[
   {"id": "ac-top", "type": "pair", "label": "From above", "real": "img/ac_top_real.jpg", "model": "img/ac_top_model.jpg", "cap": TOP},
   still("ac-s", "From the south", "img/ac_s_model.jpg"), still("ac-se", "From the southeast", "img/ac_se_model.jpg")], pano='s12', pano_label='Inside Arts & Crafts'),
 P('woodshop', 'Woodshop', 'The woodshop, a strip about 10 ft deep along the east end of the Art Center.', auto=False, soon=['Inside']),
 P('media-arts', 'Media Arts', 'The Media Arts room.', auto=False, soon=['Outside', 'Inside']),
 P('pottery', 'Pottery', 'Pottery, at the end of the Art Center.', pano='s30', pano_label='Pottery', gal='pottery', auto=False),
 P('cooking', 'Cooking', 'The cooking building near the boys’ side.', c=(1512, 1706), w=40, soon=['Kitchen']),
 # Field sports
 P('soccer', 'Soccer (Lower Field)', 'Soccer on the Lower Field.', c=(1865, 1609), w=130),
 P('lacrosse', 'Lacrosse (Upper Field)', 'Lacrosse on the Upper Field.', c=(1790, 1834), w=130),
 P('baseball', 'Baseball & softball', 'The baseball and softball field.', c=(1705, 1745), w=120, pano='s27', pano_label='Baseball field'),
 P('middle-field', 'The Middle Field', 'The big field south beyond the equestrian area.', auto=False, soon=['Overview']),
 P('gaga', 'Gaga & tetherball', 'The gaga pit by the volleyball court.', c=(1661, 1601), w=30),
 # Athletics
 P('tennis', 'Tennis', 'The tennis courts.', c=(1618, 1679), w=90, pano='s23', pano_label='Tennis courts'),
 P('golf', 'Golf', 'The golf area.', c=(1512, 1404), w=80, pano='s05', pano_label='Golf'),
 P('archery', 'Archery', 'The archery range.', c=(1486, 1728), w=60, pano='s25', pano_label='Archery range'),
 P('fencing', 'Fencing', 'Fencing.', auto=False, soon=['Overview']),
 P('riflery', 'Riflery', 'The riflery range, reached by the shortcut behind Arts & Crafts.', c=(1456, 1697), w=50),
 P('skate', 'Skate park', 'The skate park on the old courts.', c=(1458, 1585), w=50, pano='s37', pano_label='Skate park'),
 P('mountainboard', 'Mountain boarding', 'The mountain boarding hill.', c=(1422, 1462), w=60, pano='s36', pano_label='Mountain boarding'),
 P('bungee', 'Bungee trampoline', 'The bungee trampolines and their pavilion.', c=(1645, 1563), w=40, pano='s29', pano_label='Bungee trampoline'),
 # Adventure
 P('ropes', 'Ropes & rock climbing', 'The ropes course and climbing tower.', c=(1458, 1872), w=80),
 P('paintball', 'Paintball', 'The paintball field.', c=(1337, 1116), w=110),
 P('lasertag', 'Laser tag', 'The laser tag area.', c=(1315, 1529), w=60, pano='s24', pano_label='Laser tag'),
 P('atv', 'ATVs & quads', 'The ATV and quad track.', c=(1761, 1705), w=110, pano='s08', pano_label='ATV track'),
 P('horses', 'Horseback riding', 'The equestrian barn with its indoor ring, and the outdoor rings.', c=(2010, 1905), w=130, pano='s11', pano_label='Barn & indoor ring'),
 P('dirtbikes', 'Dirtbikes', 'The dirtbike loop down the hill from the girls\u2019 cabins.', auto=False, soon=['Overview']),
 # Lake & pool
 P('waterfront', 'Waterfront & swim dock', 'The waterfront: boathouse, beach and the U-shaped swim dock.', c=(1220, 1255), w=110, soon=['Boathouse inside']),
 P('waterslide', 'Waterslide', 'The waterslide on the point.', c=(1243, 1190), w=40, pano='s40', pano_label='Waterslide'),
 P('watertramp', 'Water trampoline', 'The water trampoline and iceberg in the swim area.', c=(1182, 1226), w=45, pano='s39', pano_label='Water trampoline'),
 P('ropeswing', 'Rope swing', 'The rope swing on the shore near the slide.', c=(1228, 1191), w=30),
 P('jetski', 'Jet ski dock', 'The floating jet ski dock.', c=(1185, 1145), w=40),
 P('pool', 'Pool', 'The swimming pool and pool house.', c=(1614, 1613), w=50, pano='s22', pano_label='Pool', soon=['Pool house']),
 # Camp buildings
 P('dh', 'Dining Hall', 'The Dining Hall, the tent on its stone floor to the south, and the Senior Dining Hall by the flagpoles.', c=(1355, 1543), w=75, gal=['dining_hall_out', 'dining_hall_in'], pano='s13', pano_label='Dining Hall', soon=['Kitchen'],
   sections={'Tent': [still('dh-tent', 'The tent from the southwest', 'img/dh_tent_model.jpg')]}, merge={'Senior Dining Hall': 'sr-dining'}),
 P('sr-dining', 'Senior Dining Hall', 'The Senior Dining Hall by the flagpoles.', c=(1393, 1548), w=40, soon=['Inside']),
 P('quad', 'Flagpole Quad', 'The Flagpole Quad.', c=(1395, 1528), w=70, pano='s31', pano_label='Flagpole Quad'),
 P('lower-office', 'Lower Office', 'The Lower Office.', c=(1438, 1498), w=40, gal='office', soon=['Inside']),
 P('infirmary', 'Infirmary', 'The Infirmary.', c=(1453, 1536), w=45, soon=['Inside']),
 # Staff areas
 P('upper-office', 'Upper Office', 'The Upper Office.', c=(1616, 1757), w=40, soon=['Inside']),
 P('condo', 'The Condo', 'The Condo staff housing.', c=(1634, 1758), w=45, soon=['Inside', 'Attic']),
 P('staff-lounge', 'Staff Lounge', 'The Staff Lounge.', auto=False, soon=['Outside', 'Inside']),
 P('staff-parking', 'Staff parking lot', 'The staff parking lot.', auto=False, soon=['Overview']),
 P('laundry', 'Laundry & EP closet', 'The laundry room; the evening-program closet is in its northwest corner.', c=(1301, 1584), w=35, soon=['Laundry inside', 'EP closet']),
 P('maint', 'Maintenance sheds', 'The two maintenance sheds west of Arts & Crafts.', c=(1334, 1610), w=35),
 # Outdoors
 P('overview', 'Whole camp', 'The whole camp from above.', c=(1600, 1600), w=700),
 P('skilift', 'Old ski lift', 'The old ski lift at the top of the Mount Tone slopes.', c=(1328, 1841), w=60),
 P('shortcut', 'The Shortcut', 'The path behind Arts & Crafts, around the Rec Hall hill to riflery.', auto=False, soon=['Overview']),
 P('roads', 'Roads & paths', 'The dirt roads and paths around camp.', auto=False, soon=['Overview']),
 P('entrance', 'Camp entrance', 'The way into camp.', auto=False, soon=['Overview']),
 P('cabins-photos', 'All cabins (photos)', 'Cabin photos that still need sorting by cabin.', gal='cabin_out', auto=False),
]
CABINS = {'1': (1307, 1567, 23), '2-3': (1393, 1497, 7), '4': (1423, 1543, 14), '6': (1528, 1496, 17), '7': (1520, 1526, 7), '8': None, '9': (1582, 1506, 16),
          '10': (1563, 1554, 21), '11': (1587, 1554, 15), '12': (1538, 1724, 12), '13': (1554, 1737, 12), '14': (1576, 1748, 12), '15': (1595, 1754, 16),
          '16': (1505, 1760, 16), '17': (1526, 1774, 16), '18': (1549, 1786, 19), '19': (1522, 1809, 15), '20': (1699, 1642, 21), '21': (1701, 1663, 22),
          '22': (1810, 1675, 18), '23': (1855, 1677, 18), '24': (1886, 1671, 19)}
CABINS['5'] = None
for k, v in CABINS.items():
    nums = k.split('-') if k == '2-3' else [k]
    units = [n + l for n in nums for l in ('A', 'B')] if k != '5' else [k]
    if k.isdigit() and 16 <= int(k) <= 24: units += [f'{k}-{i} (senior staff)' for i in range(1, 5)]
    PLACES.append(P('cabin-' + k, 'Cabins 2 & 3' if k == '2-3' else 'Cabin ' + k, 'Cabin 24 burned around 2024; this shows it as it was.' if k == '24' else ('Cabin 5 was overflow and almost never used.' if k == '5' else ''),
                    c=v[:2] if v else None, w=max(30, v[2] * 2.2 + 10) if v else 40, auto=bool(v), soon=units))

def cab(*ks): return [{"ref": 'cabin-' + k} for k in ks if k in CABINS]
MENU = [
 {"name": "Performing Arts", "items": [{"ref": "circus"}, {"ref": "dance"}, {"ref": "rock-band"}, {"ref": "amphitheater"}, {"ref": "rec-hall", "view": "s18-360"}, {"ref": "media-arts"}]},
 {"name": "Creative Arts", "items": [{"ref": "ac"}, {"ref": "pottery"}, {"ref": "woodshop"}, {"ref": "cooking"}]},
 {"name": "Field Sports", "items": [{"ref": "basketball"}, {"ref": "volleyball"}, {"ref": "soccer"}, {"ref": "lacrosse"}, {"ref": "baseball"}, {"ref": "middle-field"}, {"ref": "gaga"}]},
 {"name": "Athletics", "items": [{"ref": "tennis"}, {"ref": "gym"}, {"ref": "golf"}, {"ref": "archery"}, {"ref": "riflery"}, {"ref": "fencing"}, {"ref": "skate"}, {"ref": "mountainboard"}, {"ref": "bungee"}]},
 {"name": "Adventure", "items": [{"ref": "ropes"}, {"ref": "paintball"}, {"ref": "lasertag"}, {"ref": "atv"}, {"ref": "dirtbikes"}, {"ref": "horses"}]},
 {"name": "Lake & Pool", "items": [{"name": "Lake", "items": [{"ref": "waterfront"}, {"ref": "waterslide"}, {"ref": "watertramp"}, {"ref": "ropeswing"}, {"ref": "jetski"}]}, {"name": "Pool", "items": [{"ref": "pool"}]}]},
 {"name": "Cabins", "items": [{"name": "Junior Boys", "items": cab('1', '2-3')}, {"name": "Inter Boys", "items": cab('12', '13', '14', '15')}, {"name": "Senior Boys", "items": cab('16', '17', '18', '19')},
   {"name": "Junior Girls", "items": cab('6', '7', '8')}, {"name": "Inter Girls", "items": cab('9', '10', '11')}, {"name": "Senior Girls", "items": cab('20', '21', '22', '23', '24')},
   {"name": "Overflow", "items": cab('4', '5')}, {"name": "Unsorted photos", "items": [{"ref": "cabins-photos"}]}]},
 {"name": "Camp Buildings", "items": [{"ref": "sc"}, {"ref": "dh"}, {"ref": "rec-hall"}, {"ref": "quad"}, {"ref": "lower-office"}, {"ref": "infirmary"}]},
 {"name": "Staff Areas", "items": [{"ref": "upper-office"}, {"ref": "condo"}, {"ref": "staff-lounge"}, {"ref": "laundry"}, {"ref": "maint"}, {"ref": "staff-parking"}]},
 {"name": "Outdoors", "items": [{"ref": "overview"}, {"ref": "roads"}, {"ref": "shortcut"}, {"ref": "skilift"}, {"ref": "entrance"}]},
]

def topdown(p):
    cx, cy = p['c']; w = p['w']; h = max(150, w * 0.9); vh = w / ASPECT
    fov = 2 * math.degrees(math.atan(vh / 2 / h))
    return {"name": f"{p['key']}_top", "cam": [cx, cy, h], "look": [cx, cy + 1, 0], "fov": round(fov, 2)}, (cx - w / 2, cx + w / 2, cy - vh / 2, cy + vh / 2)
def oblique(p, tag, dx, dy):
    cx, cy = p['c']; w = p['w']; d = 0.85 * w + 12; z = 0.4 * w + 6
    return {"name": f"{p['key']}_{tag}", "cam": [cx + dx * d, cy + dy * d, z], "look": [cx, cy, 2], "fov": 55, "hideTrees": True}

areas, renders, naip = {}, [], []
for p in PLACES:
    out, ins = list(p['extra']), list(p['inside'])
    if p['auto'] and p['c']:
        r, box = topdown(p); renders.append(r); naip.append((p['key'], box))
        out.insert(0, {"id": f"{p['key']}-top", "type": "pair", "label": "From above", "real": f"img/{p['key']}_top_real.jpg", "model": f"img/{p['key']}_top_model.jpg", "cap": TOP})
        for tag, dx, dy, lab in (('se', .7, -.7, 'From the southeast'), ('sw', -.7, -.7, 'From the southwest')):
            renders.append(oblique(p, tag, dx, dy)); out.append(still(f"{p['key']}-{tag}", lab, f"img/{p['key']}_{tag}_model.jpg"))
    if p['pano']:
        pv = {"id": f"{p['pano']}-360", "type": "pano", "label": f"{p['pano_label']} in 360°", "realPano": f"pano/{p['pano']}_real.jpg", "modelPano": f"pano/{p['pano']}_model.jpg",
              "cap": "Real: 360° tour photo (2023–2025). The model was rendered from about the same spot; if it's turned, use the turn buttons."}
        (ins if p['key'] in ('ac', 'dh-in', 'circus', 'dance', 'gym', 'rec-hall', 'rock-band', 'pottery', 'horses') else out).append(pv)
    exists = lambda e: all(os.path.exists(f"{SITE}/{e[k]}") for k in ('real', 'model', 'realPano', 'modelPano') if k in e)
    out = [e for e in out if exists(e)]; ins = [e for e in ins if exists(e)]
    parts = [x for x in [{"kind": "Outside", "entries": out}, {"kind": p['inside_name'], "entries": ins}] if x['entries']]
    for sname, ents in p['sections'].items(): parts.append({"kind": sname, "entries": [e for e in ents if exists(e)]})
    for sname, other in p['merge'].items():
        o = next(q for q in PLACES if q['key'] == other); r_, box_ = topdown(o)
        ents = [{"id": f"{other}-top", "type": "pair", "label": "From above", "real": f"img/{other}_top_real.jpg", "model": f"img/{other}_top_model.jpg", "cap": TOP}] + [still(f"{other}-{t}", l, f"img/{other}_{t}_model.jpg") for t, l in (('se', 'From the southeast'), ('sw', 'From the southwest'))]
        ents = [e for e in ents if exists(e)] + [{"id": f"{other}--inside", "type": "soon", "label": "Inside"}]
        parts.append({"kind": sname, "entries": ents})
    parts = [x for x in parts if x['entries']]
    for sname in p['soon']:
        if any(x['kind'] == sname for x in parts): continue
        slug = ''.join(ch if ch.isalnum() else '-' for ch in sname.lower()).strip('-')
        parts.append({"kind": sname, "soon": True, "entries": [{"id": f"{p['key']}--{slug}", "type": "soon", "label": sname}]})
    if not parts: parts.append({"kind": "Overview", "soon": True, "entries": [{"id": f"{p['key']}--overview", "type": "soon", "label": "Overview"}]})
    gl = p['gal'] if isinstance(p['gal'], list) else ([p['gal']] if p['gal'] else [])
    cands = [dict(c) for g in gl for c in GAL.get(g, [])]
    for c in cands:
        try:
            from PIL import Image as _I; w_, h_ = _I.open(f"{SITE}/{c['src']}").size; c['pano'] = abs(w_ / h_ - 2) < 0.08
        except Exception: pass
    areas[p['key']] = {"name": p['name'], "blurb": p['blurb'], "parts": parts, "candidates": cands}

old = json.load(open(f'{SITE}/views.json'))
D = {"version": "v4", "title": "Camp Lohikan 3D review", "api": "https://script.google.com/macros/s/AKfycbz9wsucMlop6CSVxTVdevAAZYXiCqe3mO4TZrM-ZEG2MQHOdMiLxMvg93yc6XmyapeFLA/exec", "areas": areas, "groups": MENU, "changes": old.get('changes', [])}
json.dump(D, open(f'{SITE}/views.json', 'w'), indent=1)
renders.append({"name": "dh_tent", "cam": [1330, 1505, 9], "look": [1354, 1528, 2], "fov": 60, "hideTrees": True})
json.dump(renders, open('/home/claude/review/renders_todo.json', 'w'))
json.dump(naip, open('/home/claude/review/naip_todo.json', 'w'))
print(len(areas), 'places,', len(renders), 'renders,', len(naip), 'aerial crops')
