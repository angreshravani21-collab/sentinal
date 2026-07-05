# 🛡️ SENTINEL — RedKross Research Foundation

**InternID 2169** · Interactive 3D cybersecurity briefing site built around ISO/IEC 27001 & 27002 access-control practice.

![status](https://img.shields.io/badge/status-active-39ff8a?style=flat-square)
![clearance](https://img.shields.io/badge/clearance-granted-4dfaff?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-ff3ec8?style=flat-square)

> A living dossier on ISO/IEC 27002 identity, authentication, access-rights, and supplier-security controls — rebuilt as a fun, interactive, three-dimensional website instead of a static PDF.

---

## ✨ Live Demo

Once deployed to GitHub Pages (see below), your site will be live at:

```
https://<your-username>.github.io/redkross-sentinel/
```

Or just open `index.html` locally in any browser — no build step, no dependencies.

---

## 🧩 What's inside

| Feature | Where |
|---|---|
| Rotating 3D holographic shield (pure CSS 3D transforms) | Hero |
| Live matrix-rain canvas background | Whole page |
| Custom neon cursor with hover states | Whole page |
| Typed boot-sequence terminal animation | Hero |
| 3D tilt / flip cards for ISO clauses 5.16–5.20 | "Security Modules" |
| Live password-strength scanner (clause 5.17 tie-in) | "Live Lab" |
| Interactive fake terminal (`help`, `scan`, `status`, `clause 5.18`, ...) | "Live Lab" |
| Access lifecycle timeline | "Access Lifecycle" |
| Konami-code easter egg (`↑ ↑ ↓ ↓ ← → ← → b a`) | Whole page |
| Scroll-reveal animations + CRT scanline/vignette overlay | Whole page |

Fully responsive, no build tools, no frameworks — just HTML, CSS, and vanilla JS.

---

## 📁 Repo structure

```
redkross-sentinel/
├── index.html              # Markup
├── css/
│   └── style.css           # All styling, animations, responsive rules
├── js/
│   └── script.js           # Cursor, matrix rain, terminal, tilt cards, lab logic
├── docs/
│   └── screenshot.png       # (add your own screenshot here for the README)
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy to GitHub Pages on push to main
├── LICENSE
└── README.md
```

---

## 🚀 Getting started

### Option A — just view it
Download or clone, then open `index.html` directly in your browser. That's it.

### Option B — run a local server (recommended, avoids font/CORS quirks)
```bash
git clone https://github.com/<your-username>/redkross-sentinel.git
cd redkross-sentinel
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## ☁️ Deploying to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under **Build and deployment**, set **Source** to `GitHub Actions`.
4. The included workflow at `.github/workflows/deploy.yml` will publish `index.html` automatically on every push to `main`.
5. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.

(If you'd rather not use Actions, Pages also works by just setting Source → `main` branch → `/ (root)` — no workflow needed, since this is a static site.)

---

## 🎓 About this project

This project is the internship deliverable for **InternID 2169** at the **RedKross Research Foundation**. It translates the organizational controls from **ISO/IEC 27002:2022** — specifically:

- **5.16** — Identity lifecycle management
- **5.17** — Authentication information
- **5.18** — Access rights
- **5.19** — Information security in supplier relationships
- **5.20** — Addressing information security within supplier agreements

...into an interactive experience, rather than a static compliance document.

---

## 🛠️ Tech stack

- HTML5 / CSS3 (3D transforms, custom properties, clip-path, backdrop-filter)
- Vanilla JavaScript (Canvas API, IntersectionObserver, requestAnimationFrame)
- Google Fonts: `Orbitron`, `Rajdhani`, `Share Tech Mono`
- Zero external JS libraries, zero build step

---

## 📄 License

MIT — see [LICENSE](LICENSE). Use it, remix it, make it yours.

---

## 🙌 Credits

Designed & built for **InternID 2169** — **RedKross Research Foundation**.
Themed around ISO/IEC 27001 & 27002 access-control practice.
