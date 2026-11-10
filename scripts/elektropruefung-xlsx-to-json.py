#!/usr/bin/env python3
# Usage: python3 scripts/elektropruefung-xlsx-to-json.py <Elektropruefung_DGUV-V3_115_Prompts_SoV.xlsx> content/elektropruefung
# Stdlib only. Sheets used: "Prompts", "Antworten", "Info-Content (Support)".
import sys, zipfile, re, json
from xml.etree import ElementTree as ET
NS={'m':'http://schemas.openxmlformats.org/spreadsheetml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def load(path):
    z=zipfile.ZipFile(path)
    ss=[]
    if 'xl/sharedStrings.xml' in z.namelist():
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')).findall('m:si',NS):
            ss.append(''.join(t.text or '' for t in si.iter('{%s}t'%NS['m'])))
    wb=ET.fromstring(z.read('xl/workbook.xml'))
    rels=ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rmap={r.get('Id'):r.get('Target') for r in rels}
    out={}
    for s in wb.find('m:sheets',NS):
        tgt=rmap[s.get('{%s}id'%NS['r'])].lstrip('/')
        if not tgt.startswith('xl/'): tgt='xl/'+tgt
        root=ET.fromstring(z.read(tgt)); rows=[]
        for row in root.iter('{%s}row'%NS['m']):
            cells={}
            for c in row.findall('m:c',NS):
                ref=c.get('r'); col=re.match(r'[A-Z]+',ref).group()
                v=c.find('m:v',NS); t=c.get('t')
                if t=='s' and v is not None: val=ss[int(v.text)]
                elif t=='inlineStr': val=''.join(x.text or '' for x in c.iter('{%s}t'%NS['m']))
                else: val=v.text if v is not None else None
                cells[col]=val
            rows.append(cells)
        out[s.get('name')]=rows
    return out
"""Workbook (Elektropruefung_DGUV-V3_115_Prompts_SoV.xlsx) -> content/elektropruefung/*.json.
Texts are copied verbatim; only the [PARTNER-EMPFEHLUNG ...] placeholder tokens are removed
(partner texts are rendered separately from elektropruefung-partners.json)."""
import json, os

src, outdir = sys.argv[1], sys.argv[2]
d = load(src)
PH = re.compile(r"\s*\[PARTNER-EMPFEHLUNG[^\]]*\]|\s*\[[A-ZÄÖÜ -]*…?$")
def clean(s): return PH.sub("", s or "").strip()

def slugify(q, used):
    s = q.lower()
    for a, b in [("ä","ae"),("ö","oe"),("ü","ue"),("ß","ss")]: s = s.replace(a, b)
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    if len(s) > 80: s = s[:80].rsplit("-", 1)[0]
    base, n = s, 2
    while s in used: s = f"{base}-{n}"; n += 1
    used.add(s); return s

prompts = {r["A"]: r for r in d["Prompts"][1:] if r.get("A")}
answers = {r["A"]: r for r in d["Antworten"][1:] if r.get("A")}
assert set(prompts) == set(answers), "Prompts/Antworten mismatch"
used, commercial = set(), []
for nr in sorted(prompts, key=int):
    p, a = prompts[nr], answers[nr]
    assert a["B"].strip() == p["E"].strip(), f"question mismatch {nr}"
    city = (p.get("F") or "").strip() or None
    is_partner = (a.get("J") or "").strip() == "Anzeige / Partner"
    commercial.append({
        "id": int(nr),
        "slug": slugify(p["E"], used),
        "question": p["E"].strip(),
        "category": p["B"].strip(),
        "intent": (p.get("C") or "").strip(),
        "funnel": (p.get("D") or "").strip(),
        "audience": (p.get("G") or "").strip(),
        "city": city,
        "phase": int(p["T"]),
        "shortAnswer": clean(a["C"]),
        "expertText": clean(a["D"]),
        "legalBasis": clean(a.get("E") or p.get("H")),
        "partnerSlot": (f"city:{city}" if city else "national") if is_partner else None,
        "metaTitle": clean(a["G"]),
        "metaDescription": clean(a["H"]),
    })

used_k, wissen = set(), []
for r in d["Info-Content (Support)"][1:]:
    if not r.get("A"): continue
    wissen.append({
        "id": int(r["A"]),
        "slug": slugify(r["C"], used_k),
        "question": r["C"].strip(),
        "category": r["B"].strip(),
        "shortAnswer": clean(r["D"]),
        "expertText": clean(r["E"]),
        "legalBasis": clean(r["F"]),
    })

slots = ["national"] + sorted({c["partnerSlot"] for c in commercial if c["partnerSlot"] and c["partnerSlot"] != "national"})
partners = {s: {"name": "", "text": "", "url": ""} for s in slots}

os.makedirs(outdir, exist_ok=True)
for name, data in [("elektropruefung-commercial.json", commercial), ("elektropruefung-wissen.json", wissen), ("elektropruefung-partners.json", partners)]:
    with open(os.path.join(outdir, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2); f.write("\n")

blob = json.dumps([commercial, wissen], ensure_ascii=False)
print("commercial", len(commercial), "phase1", sum(c["phase"] == 1 for c in commercial), "wissen", len(wissen), "slots", slots)
print("leftover '[' tokens:", re.findall(r"\[[^\]]{0,40}\]", blob)[:10])
print("empty fields:", [(c["id"], k) for c in commercial + wissen for k, v in c.items() if v in ("", None) and k not in ("city", "partnerSlot")])
