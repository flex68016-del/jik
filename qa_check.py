#!/usr/bin/env python3
"""QA programmatique du site JIK — liens, assets, i18n, données."""
import re, json, sys, urllib.request, os
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).parent
errors, warnings = [], []

# ---------- 1. Serveur : toutes les pages répondent ----------
BASE = "http://localhost:8477"
pages = ["/", "/index.html", "/pages/collections.html", "/pages/produit.html?product=jik-002",
         "/pages/identite.html", "/pages/lookbook.html", "/pages/contact.html",
         "/sitemap.xml", "/robots.txt"]
for p in pages:
    try:
        code = urllib.request.urlopen(BASE + p, timeout=5).status
        if code != 200: errors.append(f"HTTP {code} pour {p}")
    except Exception as e:
        errors.append(f"Échec {p}: {e}")

# ---------- 2. Assets référencés existent ----------
class RefParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.srcs, self.hrefs, self.i18n_keys, self.no_alt = [], [], [], 0
        self._in_img = False
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "img":
            if "src" in d: self.srcs.append(d["src"])
            if "alt" not in d: self.no_alt += 1
        if tag == "link" and "href" in d: self.hrefs.append(d["href"])
        if tag == "a" and "href" in d: self.hrefs.append(d["href"])
        if tag == "script" and "src" in d: self.srcs.append(d["src"])

all_local_refs = []
for html in list(ROOT.glob("*.html")) + list((ROOT / "pages").glob("*.html")):
    parser = RefParser()
    parser.feed(html.read_text(encoding="utf-8"))
    if parser.no_alt: errors.append(f"{html.name}: {parser.no_alt} <img> sans alt")
    for ref in parser.srcs + parser.hrefs:
        if ref.startswith(("http", "#", "mailto:", "data:")) or ref == "": continue
        local = (html.parent / ref.split("?")[0]).resolve()
        all_local_refs.append((html.name, ref))
        if not local.exists():
            errors.append(f"{html.name} référence inexistant: {ref}")

# ---------- 3. CSS : urls locaux ----------
for css in ROOT.glob("css/**/*.css"):
    for m in re.findall(r"url\(['\"]?([^)'\"]+)['\"]?\)", css.read_text(encoding="utf-8")):
        if m.startswith(("http", "data:")): continue
        if not (css.parent / m).exists(): errors.append(f"{css} url() manquant: {m}")

# ---------- 4. i18n : clés data-i18n vs dictionnaires ----------
js_translations = (ROOT / "js/data/translations.js").read_text(encoding="utf-8")
# extraire les clés FR
fr_keys = set(re.findall(r"^\s+'([\w.]+)':", js_translations, re.M))
# clés utilisées dans les HTML
for html in list(ROOT.glob("*.html")) + list((ROOT / "pages").glob("*.html")):
    for m in re.findall(r'data-i18n(?:-html)?="([^"]+)"', html.read_text(encoding="utf-8")):
        if m not in fr_keys: errors.append(f"{html.name}: clé i18n absente: {m}")
# clés utilisées via JIK.utils.t("...")
for jsf in ROOT.glob("js/**/*.js"):
    for m in re.findall(r"""t\(['"]([\w.]+)['"]\)""", jsf.read_text(encoding="utf-8")):
        if m not in fr_keys: errors.append(f"{jsf.name}: clé t() absente: {m}")

# ---------- 5. Produits : images + cohérence ----------
products_js = (ROOT / "js/data/products.js").read_text(encoding="utf-8")
for m in re.findall(r"image: '(assets/products/[^']+)'", products_js):
    if not (ROOT / m).exists(): errors.append(f"Image produit manquante: {m}")
n_products = len(re.findall(r"id: 'jik-\d+'", products_js))
if n_products != 6: errors.append(f"{n_products} produits au lieu de 6")

# ---------- 6. Encodage WhatsApp (logique répliquée) ----------
msg = "Bonjour JIK !\n\nJe souhaite commander :\n\nProduit : ALL WE NEED IS JESUS\nRéférence : JIK-002\nTaille : L\nCouleur : Blanc\nQuantité : 1"
enc = urllib.parse.quote(msg) if (urllib := __import__('urllib.parse')) else ""
if "%0A" not in enc: errors.append("Encodage WhatsApp : sauts de ligne absents")

print(json.dumps({
    "erreurs": errors,
    "avertissements": warnings,
    "pages_testees": len(pages),
    "references_locales": len(all_local_refs),
    "cles_fr": len(fr_keys),
    "produits": n_products,
}, indent=2, ensure_ascii=False))
sys.exit(1 if errors else 0)
