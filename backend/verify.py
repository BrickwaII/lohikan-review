import json, os
S='/home/claude/review/site'; D=json.load(open(f'{S}/views.json')); bad=[]; n=0
for k,a in D['areas'].items():
    for p in a['parts']:
        for e in p['entries']:
            for f in ('real','model','realPano','modelPano','modelPhoto','modelPanoPhoto'):
                if f in e:
                    n+=1
                    if not os.path.exists(f"{S}/{e[f]}"): bad.append((k,e['id'],e[f]))
    for c in a.get('candidates',[]):
        n+=1
        if not os.path.exists(f"{S}/{c['src']}"): bad.append((k,'photo',c['src']))
def refs(items):
    for it in items:
        if 'ref' in it:
            if it['ref'] not in D['areas']: bad.append(('menu',it['ref'],'missing place'))
        else: refs(it.get('items',[]))
refs(D['groups'])
print(n,'files checked;',len(bad),'problems'); [print(' ',b) for b in bad[:30]]
