# The Livingroom — Luzern

Landing Page für **The Livingroom**, einen 24/7 zugänglichen Lern- und Arbeitsort für Studierende in Luzern. Ermöglicht durch Partnerschulen.

🌐 **Live:** https://[username].github.io/[repo-name]/ _(nach Deployment)_

---

## Über das Projekt

Studierende in Luzern brauchen verlässliche, planbare Lernplätze — auch ausserhalb der Bibliothekszeiten. The Livingroom ist die Antwort darauf:

- 24/7 zugänglich per Studi-Badge
- Gruppenräume in Echtzeit reservierbar
- ~50 offene Lernplätze auf zwei Etagen
- Snacks, Getränke, Strom, WLAN inklusive
- Kostenlos für Studierende der Partnerschulen

---

## Lokal anschauen

Einfach `index.html` im Browser öffnen — keine Build-Tools nötig.

```bash
# Optional: kleinen lokalen Server starten
python3 -m http.server 8000
# dann: http://localhost:8000
```

> Hinweis: Die Karte (Leaflet) und Google Fonts brauchen eine Internetverbindung.

---

## Projektstruktur

```
.
├── index.html              # Hauptseite
├── styles/
│   └── main.css            # Sämtliches Styling
├── scripts/
│   └── main.js             # Parallax, Smooth-Scroll, Karte
├── images/
│   ├── hero.jpg            # Eingangsbereich (Hero)
│   ├── upper-floor.jpg     # Obere Etage
│   ├── lounge-area.jpg     # Lange Tische am Fenster
│   ├── gruppenraum.jpg     # Konferenzraum
│   └── shl-logo.png        # SHL Partner-Logo
└── README.md
```

---

## Deployment auf GitHub Pages

Bei jedem Push auf `main` wird die Seite automatisch über GitHub Actions deployed.

**Einrichtung:**

1. Repository auf GitHub erstellen und Code pushen
2. Auf GitHub: **Settings** → **Pages**
3. Bei *Source* wählen: **GitHub Actions**
4. Push auf `main` — fertig. Der Workflow in `.github/workflows/deploy.yml` läuft automatisch.

Nach dem ersten Deployment ist die Seite verfügbar unter:
```
https://[username].github.io/[repo-name]/
```

---

## Anpassen

**Texte ändern:** alles in `index.html` — die Sektionen sind kommentiert (`<!-- HERO -->`, `<!-- KONZEPT -->` usw.).

**Farben/Schriften:** `styles/main.css` ganz oben unter `:root { ... }`.

**Bilder ersetzen:** Dateien in `images/` austauschen, gleiche Namen behalten.

**Adresse / Karten-Pin:** in `scripts/main.js`, am Ende, die Variablen `lat` und `lon` anpassen.

**Partnerschulen ergänzen:** in `index.html` die Sektion `<!-- PARTNERS -->` finden und weitere Logos in `images/` hinzufügen.

---

## Stack

Bewusst minimal:

- Plain HTML, CSS, JavaScript — kein Framework, kein Build-Tool
- [Leaflet](https://leafletjs.com/) für die interaktive Karte
- [OpenStreetMap](https://www.openstreetmap.org/) als Kartendaten
- Google Fonts: Inter & Instrument Serif

---

© 2026 The Livingroom Luzern
