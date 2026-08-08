# 🌴 Hacker House Goa 2026 - Builder ID Card Generator

> **Ship from Paradise.** An interactive, full-stack ID Card Generator & Builder Pass Minting web app for Hacker House Goa 2026.

![HH Goa 2026 Card Generator](https://raw.githubusercontent.com/plainvector-art/HH-Goa-2026-Card-Generator/main/frontend/public/favicon.svg)

---

## ✨ Features

- **Tropical Retro-Modern UI**: Built with Tailwind CSS, custom Google Fonts (`Anybody`, `Hanken Grotesk`, `JetBrains Mono`), and high-contrast Goan paradise design tokens.
- **Real-Time Live Preview**: Interactive ID card canvas updates as you type name, handle, role/stack, quote, and select essentials.
- **3D Card Flip**: Interactive perspective flip to inspect front badge and back pass (verification QR code, barcode, and venue access terms).
- **Holographic Foil FX**: Shimmering foil reflection overlay toggle.
- **Avatar Customization**: Support for image file uploads with backend storage, photo URLs, or retro preset avatars.
- **Web Audio Sound FX**: Synthesized mechanical keyboard clicks and rubber stamp sounds.
- **Confetti Explosion**: Tropical confetti celebration cannon on card minting.
- **High-Res PNG Export**: One-click PNG card image download powered by `html-to-image`.
- **Social Sharing**: Direct share to X (Twitter) and copyable shareable link.
- **Community Manifest**: Explore, search, and filter all registered builder cards stored in the backend API.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Vite + React 18, Tailwind CSS, Web Audio API, Canvas Confetti.
- **Backend**: Node.js + Express REST API, Multer file upload storage.
- **Data Persistence**: File-based JSON database in `backend/data/cards.json`.

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm start
```
*Backend runs on `http://localhost:5000`*

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🛰️ API Reference

- `GET /api/cards`: List all generated builder passes (supports `search` & `builderClass` query params).
- `GET /api/cards/:id`: Get single card details.
- `POST /api/cards`: Mint and save a new builder card.
- `POST /api/upload`: Upload profile avatar photo.
- `GET /api/stats`: Retrieve event statistics.

---

## 📜 License

MIT License. Built for Hacker House Goa 2026. #FrameInGoa #ShipFromParadise
