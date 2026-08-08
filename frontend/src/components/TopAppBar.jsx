import React from 'react';

export const TopAppBar = ({ activeTab, setActiveTab, cardCount, soundEnabled, setSoundEnabled }) => {
  return (
    <header className="bg-sandy-off-white border-b-thick border-lush-green docked full-width top-0 z-50 flex flex-col md:flex-row justify-between items-center px-4 md:px-12 py-3 w-full gap-3 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="font-display-lg text-2xl md:text-3xl font-black text-lush-green tracking-tight flex items-center gap-2">
          <span className="bg-sunny-yellow text-lush-green border-thin border-lush-green px-2 py-0.5 rounded text-lg rotate-[-3deg] inline-block shadow-retro-sm">
            GOA '26
          </span>
          HH GOA 2026
        </span>
        <span className="hidden sm:inline-block font-label-code text-xs bg-magenta-pink text-white px-2 py-1 rounded border-thin border-lush-green font-bold">
          CARD MINT
        </span>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 font-label-caps text-xs">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 uppercase font-bold border-thin border-lush-green transition-all flex items-center gap-1.5 ${
            activeTab === 'editor'
              ? 'bg-sunny-yellow text-lush-green sticker-shadow'
              : 'bg-surface-bright text-lush-green hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-sm">badge</span>
          CREATE CARD
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          className={`px-4 py-2 uppercase font-bold border-thin border-lush-green transition-all flex items-center gap-1.5 ${
            activeTab === 'gallery'
              ? 'bg-sunny-yellow text-lush-green sticker-shadow'
              : 'bg-surface-bright text-lush-green hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-sm">grid_view</span>
          BUILDER MANIFEST
          {cardCount > 0 && (
            <span className="bg-magenta-pink text-white px-1.5 py-0.2 text-[10px] rounded-full">
              {cardCount}
            </span>
          )}
        </button>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Disable sound FX' : 'Enable sound FX'}
          className="text-lush-green hover:text-magenta-pink transition-colors p-2 border-thin border-lush-green bg-surface-bright rounded hover:bg-surface-container active:scale-95 flex items-center"
        >
          <span className="material-symbols-outlined text-lg">
            {soundEnabled ? 'volume_up' : 'volume_off'}
          </span>
        </button>

        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex font-label-code text-xs text-lush-green hover:text-magenta-pink font-bold border-thin border-lush-green px-3 py-1.5 bg-surface-bright items-center gap-1 hover:bg-surface-container"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path>
          </svg>
          #FrameInGoa
        </a>
      </div>
    </header>
  );
};
