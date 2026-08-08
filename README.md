# 🌴 Hacker House Goa 2026 - Builder ID Card Generator

> **Ship from Paradise.** An interactive, full-stack ID Card Generator & Builder Pass Minting web app for Hacker House Goa 2026. Ready for instant Vercel deployment.

![HH Goa 2026 Card Generator](https://raw.githubusercontent.com/plainvector-art/HH-Goa-2026-Card-Generator/main/frontend/public/favicon.svg)

---

## ⚡ Deploy to Vercel

This repository is **100% Vercel ready**. It uses `@vercel/node` for the serverless Express API backend and `@vercel/static-build` for the Vite React frontend.

### One-Click Deploy
1. Push this repo to GitHub.
2. Import the repository in [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically detect `vercel.json` and build both the frontend static UI and `/api` serverless backend routes!

---

## ✨ Features

- **Tropical Retro-Modern UI**: Built with Tailwind CSS, custom Google Fonts (`Anybody`, `Hanken Grotesk`, `JetBrains Mono`), and high-contrast Goan paradise design tokens.
- **Real-Time Live Preview**: Interactive ID card canvas updates as you type name, handle, role/stack, quote, and select essentials.
- **3D Card Flip**: Interactive perspective flip to inspect front badge and back pass (verification QR code, barcode, and venue access terms).
- **Holographic Foil FX**: Shimmering foil reflection overlay toggle.
- **Avatar Customization**: Support for image file uploads with base64 Data URL conversion (compatible with serverless runtimes), photo URLs, or retro preset avatars.
- **Web Audio Sound FX**: Synthesized mechanical keyboard clicks and rubber stamp sounds.
- **Confetti Explosion**: Tropical confetti celebration cannon on card minting.
- **High-Res PNG Export**: One-click PNG card image download powered by `html-to-image`.
- **Social Sharing**: Direct share to X (Twitter) and copyable shareable link.
- **Community Manifest**: Explore, search, and filter all registered builder cards stored in the backend API.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Vite + React 18, Tailwind CSS, Web Audio API, Canvas Confetti.
- **Backend**: Node.js + Express Serverless API (`/api/cards`, `/api/upload`, `/api/stats`).
- **Data Persistence**: Memory cache with disk fallback.

---

## 🚀 Local Development

```bash
# Backend (Port 5000)
cd backend
npm install
npm start

# Frontend (Port 5173)
cd frontend
npm install
npm run dev
```

---

## 📜 License

MIT License. Built for Hacker House Goa 2026. #FrameInGoa #ShipFromParadise
