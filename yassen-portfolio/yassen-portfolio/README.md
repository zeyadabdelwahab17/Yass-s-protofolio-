# Yassen Khaled — Portfolio Website

A cinematic, dark-mode portfolio built with **Next.js 14** (static export) — deployable to **Vercel for free**.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (Static Export) |
| Styling | Pure CSS (CSS Variables, no Tailwind) |
| Fonts | Cinzel + Cormorant Garamond + Montserrat (Google Fonts) |
| Video | YouTube embeds (zero bandwidth cost) |
| Hosting | Vercel Free Tier |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → Open http://localhost:3000

# 3. Build for production
npm run build
# → Output in /out directory
```

---

## ✏️ How to Customise Content

All content lives in **`pages/index.js`** — no CMS required.

### Add Your Real YouTube Videos

Find the `broadcastWork` and `creativeWork` arrays at the top of `pages/index.js`:

```js
const broadcastWork = [
  {
    id: 'b1',
    title: 'نشرة الأخبار المسائية',
    client: 'قناة المحور',
    tag: 'News Editing',
    desc: 'Your description here.',
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // ← paste the ID from the URL
    thumb: null, // or '/images/thumb-b1.jpg' for a custom thumbnail
  },
  // ...
]
```

**To find the YouTube ID:** Open any YouTube video → look at the URL:
`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** ← this part is the ID.

### Add Custom Thumbnails (Optional)

1. Place image files in `/public/images/`
2. Set `thumb: '/images/your-file.jpg'` in the data arrays

### Add Your Portrait Photo

Place a photo at `/public/portrait.jpg` and update the `about-portrait` section in `pages/index.js`:

```jsx
// Replace this:
<div className="about-portrait-placeholder">YK</div>

// With this:
<img src="/portrait.jpg" alt="Yassen Khaled" className="card-thumb-img" />
```

### Change Contact Info

Search for `01117018034` and `soso.sosy93@gmail.com` in `pages/index.js` to update.

---

## 🌐 Deploy to Vercel

### Method A — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow the prompts — done in 60 seconds
```

### Method B — GitHub + Vercel Dashboard
1. Push this folder to a new GitHub repository
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live at `https://your-project.vercel.app`

> **Custom domain:** In Vercel dashboard → Project Settings → Domains → add your domain.

---

## 📁 Project Structure

```
yassen-portfolio/
├── pages/
│   ├── _app.js          ← Global CSS import
│   ├── _document.js     ← HTML head, font preload
│   └── index.js         ← ALL content & components
├── styles/
│   └── globals.css      ← All styles (dark cinematic theme)
├── public/
│   └── (place images here)
├── next.config.js       ← Static export config
├── vercel.json          ← Vercel settings
└── package.json
```

---

## 🎨 Design System

| Variable | Value | Usage |
|---|---|---|
| `--black` | `#080808` | Page background |
| `--gold` | `#c9943a` | Accent, headings |
| `--gold-light` | `#e8b86d` | Hover states |
| `--white` | `#f5f0ea` | Body text |
| `--muted` | `rgba(245,240,234,0.45)` | Secondary text |
| `--font-display` | Cinzel | Section titles |
| `--font-body` | Cormorant Garamond | Paragraphs |
| `--font-ui` | Montserrat | Labels, nav |

To change the gold accent to another color, find `--gold` in `styles/globals.css`.

---

## ✅ Features

- [x] Cinematic dark-mode design
- [x] Custom gold cursor with ring
- [x] Film grain overlay animation
- [x] Scroll-reveal animations
- [x] Responsive (mobile hamburger menu)
- [x] YouTube embed modal with keyboard (Esc) close
- [x] Video card hover effects
- [x] Static export (no server needed)
- [x] Zero monthly cost on Vercel Free Tier
- [x] Google Fonts (open-source, no license fees)
- [x] Scroll-spy navigation
- [x] Availability indicator

---

*Built for Yassen Khaled — Filmmaker & Video Editor, Cairo, Egypt*
