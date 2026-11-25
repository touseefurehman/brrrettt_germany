# Wandelt deliverables/reverse-aeo-partner.csv in .xlsx um (Kopfzeile fett, Spaltenbreiten, Zeilenumbruch, fixierte Kopfzeile).
import csv, sys
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
root = Path(__file__).resolve().parent.parent
rows = list(csv.reader(open(root / "deliverables/reverse-aeo-partner.csv", encoding="utf-8-sig"), delimiter=";"))
wb = Workbook(); ws = wb.active; ws.title = "Reverse AEO Partner"
for r in rows:
    ws.append([int(c) if c.isdigit() else c for c in r])
for c in ws[1]:
    c.font = Font(bold=True, color="FFFFFF"); c.fill = PatternFill("solid", fgColor="1F4D3A"); c.alignment = Alignment(wrap_text=True, vertical="top")
widths = [38, 22, 44, 50, 44, 60, 60, 50, 44, 26, 26, 40, 44, 44, 16, 30]
for i, w in enumerate(widths, 1):
    ws.column_dimensions[ws.cell(1, i).column_letter].width = w
for row in ws.iter_rows(min_row=2):
    for c in row: c.alignment = Alignment(wrap_text=True, vertical="top")
ws.freeze_panes = "B2"
wb.save(root / "deliverables/reverse-aeo-partner.xlsx")
print("xlsx geschrieben")
