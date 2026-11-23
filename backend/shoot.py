import json, subprocess, sys
from PIL import Image
R=json.load(open('renders_todo.json')); a,b=int(sys.argv[1]),int(sys.argv[2]); chunk=R[a:b]
if not chunk: sys.exit()
subprocess.run(['python3','/tmp/mapshot.py',json.dumps(chunk),'1200','744'],capture_output=True,timeout=590)
for v in chunk:
    try: Image.open(f"/tmp/m_{v['name']}.png").convert('RGB').resize((1000,620)).save(f"site/img/{v['name']}_model.jpg",quality=80)
    except Exception as e: print('miss',v['name'])
print('done',a,b)
