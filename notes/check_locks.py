"""Guard against silently reverting Henry's decisions. Every decision in the model code carries a comment that
mentions Henry. This compares those comments in model/*.js between the last commit and the working copy and lists
any that disappeared or changed. Run before every commit:  python3 notes/check_locks.py   (exit 1 = review needed)"""
import re, subprocess, sys, glob, os
REF = sys.argv[1] if len(sys.argv) > 1 else 'HEAD'
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
pat = re.compile(r'/\*[^*]*?Henry.*?\*/|//[^\n]*Henry[^\n]*')
bad = 0
for f in sorted(glob.glob('model/*.js')):
    old = subprocess.run(['git', 'show', f'{REF}:{f}'], capture_output=True, text=True).stdout
    new = open(f).read()
    gone = set(pat.findall(old)) - set(pat.findall(new))
    for c in sorted(gone):
        bad += 1; print(f'{f}: Henry note removed or reworded:\n    {c[:240]}')
print('OK: no Henry notes lost' if not bad else f'\n{bad} Henry note(s) changed. Check notes/areas/*.md LOCKED sections; if the change is intended, record why in that area file.')
sys.exit(1 if bad else 0)
