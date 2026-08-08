import React, { useState, useEffect } from 'react';
import { fetchCards } from '../services/api';

export const BuilderGallery = ({ onSelectCard, onCreateNew }) => {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const classes = [
    'ALL',
    'TERMINAL WIZARD',
    'SHIP MASTER',
    'PIXEL PUSHER',
    'PROTOCOL ARCHITECT',
    'AI ALCHEMIST',
    'BEACH CODE JUNKIE'
  ];

  const loadCards = async () => {
    setLoading(true);
    const data = await fetchCards(search, selectedClass);
    setCards(data.cards || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, [search, selectedClass]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-bright p-6 border-thick border-lush-green sticker-shadow rounded-lg">
        <div>
          <span className="bg-magenta-pink text-white font-label-caps text-xs px-2.5 py-0.5 rounded border-thin border-lush-green font-bold uppercase mb-1 inline-block">
            MANIFEST 2026
          </span>
          <h1 className="font-display-lg text-2xl md:text-3xl font-black text-lush-green">
            COMMUNITY BUILDER GALLERY
          </h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Explore verified developers, terminal wizards, and creators attending Hacker House Goa.
          </p>
        </div>

        <button
          onClick={onCreateNew}
          className="bg-sunny-yellow text-lush-green font-label-caps text-xs font-bold border-thin border-lush-green px-5 py-3 sticker-shadow hover:bg-surface-bright uppercase flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          MINT YOUR BUILDER ID
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, handle, role..."
            className="retro-input w-full p-2.5 pl-9 text-xs rounded"
          />
          <span className="material-symbols-outlined text-lush-green text-sm absolute left-2.5 top-1/2 -translate-y-1/2">
            search
          </span>
        </div>

        {/* Builder Class Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`font-label-code text-[11px] px-3 py-1.5 rounded border-thin font-bold transition-all ${
                selectedClass === cls
                  ? 'bg-magenta-pink text-white border-lush-green shadow-retro-sm'
                  : 'bg-surface-bright text-lush-green border-lush-green hover:bg-sunny-yellow'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-thick border-lush-green border-t-sunny-yellow"></div>
        </div>
      ) : cards.length === 0 ? (
        <div className="bg-surface-bright border-thick border-lush-green p-12 text-center rounded-lg flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-5xl text-lush-green">search_off</span>
          <h3 className="font-display-lg text-xl font-black text-lush-green">NO BUILDERS FOUND</h3>
          <p className="font-body-md text-sm text-on-surface-variant max-w-sm">
            Be the first to mint a Builder ID for this class or clear your search query!
          </p>
          <button
            onClick={onCreateNew}
            className="bg-sunny-yellow text-lush-green font-label-caps text-xs font-bold border-thin border-lush-green px-4 py-2 sticker-shadow mt-2"
          >
            MINT FIRST CARD
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="bg-sandy-off-white border-thick border-lush-green rounded-xl p-4 flex flex-col gap-3 shadow-retro hover:-translate-y-1 transition-transform cursor-pointer group relative overflow-hidden"
            >
              {/* Top Card Badge */}
              <div className="flex justify-between items-center border-b-thin border-lush-green pb-2">
                <span className="font-label-code text-[10px] bg-sunny-yellow text-lush-green px-2 py-0.5 border-thin border-lush-green font-bold rounded">
                  {card.id}
                </span>
                <span className="font-label-caps text-[10px] text-magenta-pink font-bold uppercase">
                  {card.builderClass}
                </span>
              </div>

              {/* Avatar + Main Details */}
              <div className="flex gap-3 items-center">
                <img
                  src={card.avatar}
                  alt={card.name}
                  className="w-16 h-16 rounded-full object-cover border-thin border-lush-green bg-surface-container"
                />
                <div className="flex flex-col min-w-0">
                  <h4 className="font-display-lg text-base font-black text-lush-green truncate uppercase group-hover:text-magenta-pink transition-colors">
                    {card.name}
                  </h4>
                  <span className="font-label-code text-xs text-lush-green opacity-80 font-bold truncate">
                    {card.handle}
                  </span>
                  <span className="font-label-code text-[11px] text-magenta-pink font-bold truncate mt-0.5">
                    ⚡ {card.role}
                  </span>
                </div>
              </div>

              {/* Quote Snippet */}
              <p className="font-body-md text-xs italic text-on-surface-variant bg-surface-bright p-2 rounded border-thin border-lush-green/40 line-clamp-2">
                "{card.quote || 'Building in Goa, shipping from paradise 🌴'}"
              </p>

              {/* Beach Bag Tags */}
              <div className="flex flex-wrap gap-1 pt-1 border-t-thin border-lush-green/30">
                {(card.beachBag || ['COCONUT']).map((bag, i) => (
                  <span
                    key={i}
                    className="font-label-code text-[9px] bg-sunny-yellow text-lush-green px-1.5 py-0.2 rounded border-thin border-lush-green font-bold"
                  >
                    {bag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
