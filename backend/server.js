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

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve static uploaded files
app.use('/uploads', express.static(uploadsDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const uniqueName = `avatar-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Helper functions for reading/writing card JSON store
const getCardsFromFile = () => {
  try {
    if (!fs.existsSync(cardsFilePath)) return [];
    const data = fs.readFileSync(cardsFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading cards file:', error);
    return [];
  }
};

const saveCardsToFile = (cards) => {
  try {
    fs.writeFileSync(cardsFilePath, JSON.stringify(cards, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving cards file:', error);
  }
};

// API Endpoints

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', event: 'Hacker House Goa 2026', timestamp: new Date().toISOString() });
});

// 2. Fetch all cards
app.get('/api/cards', (req, res) => {
  let cards = getCardsFromFile();
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
  const cards = getCardsFromFile();
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

  const cards = getCardsFromFile();
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

  cards.unshift(newCard); // latest first
  saveCardsToFile(cards);

  res.status(201).json({ message: 'Card generated successfully!', card: newCard });
});

// 5. Upload Avatar Image
app.post('/api/upload', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ message: 'Upload successful', url: fileUrl, filename: req.file.filename });
});

// 6. Delete card
app.delete('/api/cards/:id', (req, res) => {
  let cards = getCardsFromFile();
  const initialLen = cards.length;
  cards = cards.filter((c) => c.id !== req.params.id);
  if (cards.length === initialLen) {
    return res.status(404).json({ error: 'Card not found' });
  }
  saveCardsToFile(cards);
  res.json({ message: 'Card deleted successfully' });
});

// 7. Get aggregate stats
app.get('/api/stats', (req, res) => {
  const cards = getCardsFromFile();
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

app.listen(PORT, () => {
  console.log(`🌴 HH Goa 2026 Backend running on http://localhost:${PORT}`);
});
