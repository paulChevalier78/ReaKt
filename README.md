# ReaKt — Landing Site (EN)

A static website to present **ReaKt**, a bioreactor optimization solution (digital twin, simulation, MPC, industrial integrations).

## Structure
- `index.html` — main page (EN)
- `styles.css` — responsive styles (professional dark theme)
- `script.js` — interactivity (mobile menu, smooth scroll, contact form)
- `assets/` — logo & visuals (SVG/JPEG)

## Run Locally
Option 1 — open directly in your browser:
- Double‑click `index.html` (or drag & drop into Chrome/Edge/Firefox)

Option 2 — local server (recommended for testing links/anchors):
- PowerShell (Windows):

```powershell
# from the project folder
python -m http.server 8000
# then open http://localhost:8000
```

Or with Node.js:

```powershell
npm -g install serve
serve -l 8000
```

## Customization
- Content: edit text directly in `index.html`.
- Colors/typography: variables in `styles.css` (the `:root` section).
- Logo: replace `assets/logobis.jpeg` with your brand image if needed.

## Contact
The form uses a `mailto:` fallback (opens your email client). For server-side collection, connect your endpoint and update the logic in `script.js` (`handleContactSubmit`).
