import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Directories setup
const dataDir = path.join(__dirname, 'data');
const uploadsDir = path.join(__dirname, 'uploads');
const cardsFilePath = path.join(dataDir, 'cards.json');

// In-memory cache for serverless environments (like Vercel)
let memoryCards = [
  {
    id: "HH-GOA-2026-001",
    name: "ARJUN MEHTA",
    handle: "@arjun_code",
    role: "SOLANA / RUST",
    builderClass: "TERMINAL WIZARD",
    theme: "tropical",
    quote: "Shipping dApps at 4 AM from Palolem Beach 🏖️",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    badges: ["READY TO SHIP", "COCONUT POWERED", "SOLANA / RUST"],
    beachBag: ["LAPTOP", "COCONUT", "FLIP FLOPS"],
    createdAt: "2026-08-08T20:00:00.000Z"
  },
  {
    id: "HH-GOA-2026-002",
    name: "PRIYA SHARMA",
    handle: "@priya_ui",
    role: "FRONTEND / AI",
    builderClass: "PIXEL PUSHER",
    theme: "cyber",
    quote: "Making pixels swim in tropical neon gradients ✨",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    badges: ["READY TO SHIP", "SHIPPED AT 4 AM", "AI ALCHEMIST"],
    beachBag: ["MATCHA", "DESK MAT", "SUNGLASSES"],
    createdAt: "2026-08-08T20:10:00.000Z"
  },
  {
    id: "HH-GOA-2026-003",
    name: "VIKRAM DAS",
    handle: "@vikram_ship",
    role: "FULLSTACK / DEPIN",
    builderClass: "SHIP MASTER",
    theme: "sunset",
    quote: "If it doesn't ship before sunset, it's not a hackathon product 🌴",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    badges: ["SHIP MASTER", "GOA SPECIAL", "COCONUT POWERED"],
    beachBag: ["TOWEL", "SUNSCREEN", "POWERBANK"],
    createdAt: "2026-08-08T20:15:00.000Z"
  }
];

// Load cards with disk fallback
const getCards = () => {
  try {
    if (fs.existsSync(cardsFilePath)) {
      const data = fs.readFileSync(cardsFilePath, 'utf8');
      const parsed = JSON.parse(data || '[]');
      if (parsed.length > 0) memoryCards = parsed;
    }
  } catch (e) {
    // Read-only filesystem or error, use memoryCards
  }
  return memoryCards;
};

const saveCards = (cards) => {
  memoryCards = cards;
  try {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(cardsFilePath, JSON.stringify(cards, null, 2), 'utf8');
  } catch (e) {
    // In serverless, writing to disk may be restricted
  }
};

// Memory upload fallback for Vercel
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// API Endpoints

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', event: 'Hacker House Goa 2026', serverless: !!process.env.VERCEL, timestamp: new Date().toISOString() });
});

// 2. Fetch all cards
app.get('/api/cards', (req, res) => {
  let cards = getCards();
  const { search, builderClass } = req.query;

  if (search) {
    const query = search.toLowerCase();
    cards = cards.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        (c.handle && c.handle.toLowerCase().includes(query)) ||
        (c.role && c.role.toLowerCase().includes(query))
    );
  }

  if (builderClass && builderClass !== 'ALL') {
    cards = cards.filter((c) => c.builderClass === builderClass);
  }

  res.json({ count: cards.length, cards });
});

// 3. Get single card by ID
app.get('/api/cards/:id', (req, res) => {
  const cards = getCards();
  const card = cards.find((c) => c.id === req.params.id);
  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }
  res.json(card);
});

// 4. Create new card
app.post('/api/cards', (req, res) => {
  const { name, handle, role, builderClass, theme, quote, avatar, badges, beachBag } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const cards = getCards();
  const cardIdNumber = (cards.length + 1).toString().padStart(3, '0');
  const newCard = {
    id: `HH-GOA-2026-${cardIdNumber}`,
    name: name.toUpperCase().trim(),
    handle: handle ? (handle.startsWith('@') ? handle : `@${handle}`) : '@builder',
    role: (role || 'FULLSTACK DEVELOPER').toUpperCase(),
    builderClass: builderClass || 'TERMINAL WIZARD',
    theme: theme || 'tropical',
    quote: quote || 'Build in Goa, Ship from Paradise 🌴',
    avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    badges: badges || ['READY TO SHIP', 'COCONUT POWERED'],
    beachBag: beachBag || ['LAPTOP', 'COCONUT', 'SUNGLASSES'],
    createdAt: new Date().toISOString()
  };

  cards.unshift(newCard);
  saveCards(cards);

  res.status(201).json({ message: 'Card generated successfully!', card: newCard });
});

// 5. Upload Avatar Image (returns Base64 Data URL for universal compatibility across Vercel)
app.post('/api/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const mimeType = req.file.mimetype || 'image/png';
  const base64Image = req.file.buffer.toString('base64');
  const dataUrl = `data:${mimeType};base64,${base64Image}`;
  res.json({ message: 'Upload successful', url: dataUrl });
});

// 6. Delete card
app.delete('/api/cards/:id', (req, res) => {
  let cards = getCards();
  const initialLen = cards.length;
  cards = cards.filter((c) => c.id !== req.params.id);
  if (cards.length === initialLen) {
    return res.status(404).json({ error: 'Card not found' });
  }
  saveCards(cards);
  res.json({ message: 'Card deleted successfully' });
});

// 7. Get aggregate stats
app.get('/api/stats', (req, res) => {
  const cards = getCards();
  const totalBuilders = cards.length;

  const classCount = {};
  cards.forEach((c) => {
    classCount[c.builderClass] = (classCount[c.builderClass] || 0) + 1;
  });

  res.json({
    totalBuilders,
    topClass: Object.keys(classCount).sort((a, b) => classCount[b] - classCount[a])[0] || 'TERMINAL WIZARD',
    classesBreakdown: classCount,
    lastUpdate: new Date().toISOString()
  });
});

// Start listening when executed directly locally
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🌴 HH Goa 2026 Backend running on http://localhost:${PORT}`);
  });
}

export default app;
