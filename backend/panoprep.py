"""Optional 4th arg: fixed shift in degrees (tour panos are roughly north-aligned: 180 works for most). Align the model 360 to the real one (RGB correlation on the horizon band), roll the model image so both share one yaw frame, save 4096x2048 copies.
usage: panoprep.py real.jpg model.jpg out_prefix"""
import sys, numpy as np
from PIL import Image
real_p, model_p, pre = sys.argv[1:4]; FIX = float(sys.argv[4]) if len(sys.argv) > 4 else None; W, H = 4096, 2048
R = Image.open(real_p).convert('RGB').resize((W, H), Image.LANCZOS); M = Image.open(model_p).convert('RGB').resize((W, H), Image.LANCZOS)
def feat(im):
    a = np.asarray(im.resize((720, 360)), np.float32)[90:230]; return a - a.mean((0, 1))
fr, fm = feat(R), feat(M)
sc = [(fr * np.roll(fm, j, axis=1)).sum() for j in range(720)]
k = int(np.argmax(sc)) * W // 720 if FIX is None else int(round(FIX / 360 * W))
R.save(pre + '_real.jpg', quality=78); Image.fromarray(np.roll(np.asarray(M), k, axis=1)).save(pre + '_model.jpg', quality=80)
print(pre, 'shift deg', round(k * 360 / W, 1))
import json, os
sf = os.path.join(os.path.dirname(pre), 'shifts.json'); d = json.load(open(sf)) if os.path.exists(sf) else {}
d[os.path.basename(pre)] = round(k * 360 / W, 1); json.dump(d, open(sf, 'w'), indent=0)
