"""Regenerates the AUTO sections of notes/areas/<area>.md from the review data, keeping the hand-written
LOCKED / OPEN sections intact. Run after every review pull:  python3 notes/build_notes.py <views.json> <fb_docs.json> <adm.json>"""
import json, sys, os, re
V = json.load(open(sys.argv[1])); FB = json.load(open(sys.argv[2])); ADM = json.load(open(sys.argv[3]))
ROOT = os.path.dirname(os.path.abspath(__file__)); TRI = ADM.get('tri', {}); CHG = ADM.get('chg', {})
PLACE = {'Circus': 'circus', 'Pottery': 'pottery', 'Barn indoor ring': 'horses', 'Horseback riding': 'horses', 'Gymnastics': 'gym', 'Pool': 'pool',
         'Amphitheater': 'amphitheater', 'Bungee trampoline': 'bungee', 'Gaga': 'gaga', 'Roads: Camp Entrance': 'entrance', 'Skate park': 'skate',
         'Volleyball': 'volleyball', 'Tennis': 'tennis', 'Soccer': 'soccer', 'Basketball': 'basketball', 'Dance studio': 'dance', 'Cabin 22': 'cabin-22',
         'Rec Hall': 'rec-hall', 'Rock Band room': 'rec-hall', 'Whole camp': 'overview'}
ents = {}
for d in (FB.values() if isinstance(FB, dict) else FB):
    if isinstance(d, dict): ents.update({k: e for k, e in d.get('entries', {}).items()})
hist = {}
for c in V['changes']:
    for i, it in enumerate(c['items']):
        a = PLACE.get(it['place'], re.sub(r'[^a-z0-9]+', '-', it['place'].lower()).strip('-'))
        st = (CHG.get(f"{c['version']}-{i}") or {}).get('s') or 'awaiting review'
        st = {'ok': 'APPROVED', 'redo': 'NEEDS REWORK'}.get(st, st)
        lines = [f"- **{c['version']} ({c['date']}) [{st}]** {it['title']}"]
        ck = f"chg-{c['version']}-{i}"
        if (ents.get(ck) or {}).get('text'): lines.append(f"  - Henry on this change: {ents[ck]['text']}")
        for j, n in enumerate(it.get('notes', [])):
            s = (TRI.get(n.get('key')) or {}).get('s')
            fb = (ents.get(f"chg-{c['version']}-{i}-n{j}") or {}).get('text')
            if s == 'done' and not fb: continue
            lines.append(f"  - pin [{s or 'untriaged'}] {n['who']}: {n['t'].splitlines()[0][:300]}" + (f" — on the fix: {fb[:300]}" if fb else ''))
        hist.setdefault(a, []).extend(lines)
for a, lines in hist.items():
    p = os.path.join(ROOT, 'areas', f'{a}.md')
    old = open(p).read() if os.path.exists(p) else f"# {a}\n\n## LOCKED decisions (Henry-confirmed: never revert without asking him)\n\n## OPEN questions / waiting on Henry\n\n"
    head = old.split('<!-- AUTO -->')[0].rstrip() + '\n\n'
    open(p, 'w').write(head + '<!-- AUTO -->\n## Change history from the review site (generated, do not edit by hand)\n' + '\n'.join(lines) + '\n')
print('updated', sorted(hist))
