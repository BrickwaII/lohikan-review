"""Reliable render queue: one job at a time, makes sure the local viewer server is up before each job,
checks the output file really got written, retries once, and logs OK/FAIL per job to runq.log.
Jobs (queue.json): {"kind":"pano","id":..,"x":..,"y":..,"h":..,"photo":bool,"out":"hi_<id>.jpg"} or {"kind":"stills"} (renders anything missing from renders_todo.json)."""
import json, os, subprocess, time, urllib.request
os.chdir('/home/claude/review')
def server_ok():
    try: return urllib.request.urlopen('http://localhost:8765/index.html', timeout=5).status == 200
    except Exception: return False
def ensure_server():
    if server_ok(): return
    subprocess.Popen(['python3', '-m', 'http.server', '8765'], cwd='/home/claude/pub_v1', stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    for _ in range(20):
        time.sleep(0.5)
        if server_ok(): return
def log(m):
    open('runq.log', 'a').write(time.strftime('%H:%M:%S ') + m + '\n')
def run_pano(j):
    env = dict(os.environ)
    if j.get('photo'): env.update(MS_HASH='#scans', MS_WAIT='45000')
    src = f"/tmp/pano_model_{j['id']}.jpg"; t0 = time.time()
    subprocess.run(['python3', '/tmp/panoshot.py', j['id'], str(j['x']), str(j['y']), str(j['h']), '1024'], env=env, capture_output=True, timeout=1500)
    if os.path.exists(src) and os.path.getmtime(src) > t0:
        subprocess.run(['cp', src, j['out']]); return True
    return False
def run_stills():
    r = subprocess.run(['python3', 'shoot_missing.py'], capture_output=True, text=True, timeout=5400)
    return 'ALLDONE' in r.stdout
Q = json.load(open('queue.json'))
for j in Q:
    ok = False
    for attempt in (1, 2):
        ensure_server()
        try: ok = run_pano(j) if j['kind'] == 'pano' else run_stills()
        except Exception as e: log(f"error {j.get('id', j['kind'])}: {e}")
        if ok: break
    log(('OK ' if ok else 'FAIL ') + json.dumps(j))
log('QUEUE DONE')
