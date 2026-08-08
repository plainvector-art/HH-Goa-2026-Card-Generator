import React, { useState } from 'react';
import { uploadAvatar } from '../services/api';
import { playKeypressSound } from './AudioEffects';

export const CardEditor = ({ cardData, setCardData, onGenerate, isGenerating, soundEnabled }) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (soundEnabled) playKeypressSound();
    setCardData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create local object URL for instant preview
    const localUrl = URL.createObjectURL(file);
    setCardData((prev) => ({ ...prev, avatar: localUrl }));

    // Upload to backend API in background
    try {
      setUploading(true);
      const res = await uploadAvatar(file);
      if (res.url) {
        setCardData((prev) => ({ ...prev, avatar: res.url }));
      }
    } catch (err) {
      console.warn('Backend upload skipped, using local URL:', err);
    } finally {
      setUploading(false);
    }
  };

  const stockAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'
  ];

  const beachBagOptions = ['COCONUT', 'LAPTOP', 'FLIP FLOPS', 'MATCHA', 'POWERBANK', 'SUNGLASSES', 'DESK MAT'];

  const toggleBeachBagItem = (item) => {
    if (soundEnabled) playKeypressSound();
    setCardData((prev) => {
      const current = prev.beachBag || [];
      const exists = current.includes(item);
      const updated = exists ? current.filter((i) => i !== item) : [...current, item];
      return { ...prev, beachBag: updated };
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <h1 className="font-display-lg text-2xl md:text-3xl font-black text-lush-green uppercase mb-1">
          CONFIGURE IDENTITY
        </h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Fill in your details to mint your official Hacker House Goa 2026 builder pass.
        </p>
      </div>

      <div className="bg-surface-bright p-5 md:p-6 border-thick border-lush-green sticker-shadow flex flex-col gap-4 rounded-lg">
        {/* Avatar Upload Section */}
        <div className="flex flex-col gap-2">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase flex justify-between">
            <span>Avatar Mugshot</span>
            {uploading && <span className="text-magenta-pink animate-pulse">Uploading...</span>}
          </label>

          <div className="flex gap-3 items-center">
            {/* Direct Upload Box */}
            <label className="flex-1 border-2 border-dashed border-lush-green bg-sandy-off-white p-4 flex flex-col items-center justify-center cursor-pointer hover:border-magenta-pink transition-colors rounded">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <span className="material-symbols-outlined text-3xl text-lush-green mb-1">
                add_a_photo
              </span>
              <span className="font-label-code text-xs font-bold text-lush-green">
                Choose Image File
              </span>
            </label>

            {/* Quick Preset Avatars */}
            <div className="flex flex-col gap-1">
              <span className="font-label-code text-[10px] text-lush-green font-bold">PRESETS</span>
              <div className="flex gap-1">
                {stockAvatars.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`Preset ${idx}`}
                    onClick={() => setCardData((prev) => ({ ...prev, avatar: url }))}
                    className={`w-9 h-9 rounded-full object-cover border-thin cursor-pointer hover:scale-110 transition-transform ${
                      cardData.avatar === url ? 'border-magenta-pink ring-2 ring-magenta-pink' : 'border-lush-green'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={cardData.name}
            onChange={handleChange}
            placeholder="e.g. ARJUN MEHTA"
            className="retro-input w-full p-2.5 text-sm rounded"
          />
        </div>

        {/* Handle / Twitter */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase" htmlFor="handle">
            Twitter / GitHub Handle
          </label>
          <input
            id="handle"
            type="text"
            value={cardData.handle}
            onChange={handleChange}
            placeholder="e.g. @arjun_code"
            className="retro-input w-full p-2.5 text-sm rounded"
          />
        </div>

        {/* Primary Stack / Role */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase" htmlFor="role">
            Primary Stack / Role
          </label>
          <input
            id="role"
            type="text"
            value={cardData.role}
            onChange={handleChange}
            placeholder="e.g. SOLANA / RUST or AI / REACT"
            className="retro-input w-full p-2.5 text-sm rounded"
          />
        </div>

        {/* Builder Class Select */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase" htmlFor="builderClass">
            Builder Class
          </label>
          <select
            id="builderClass"
            value={cardData.builderClass}
            onChange={handleChange}
            className="retro-input w-full p-2.5 text-sm rounded font-bold text-lush-green"
          >
            <option value="TERMINAL WIZARD">🧙‍♂️ TERMINAL WIZARD</option>
            <option value="SHIP MASTER">🚢 SHIP MASTER</option>
            <option value="PIXEL PUSHER">🎨 PIXEL PUSHER</option>
            <option value="PROTOCOL ARCHITECT">🏗️ PROTOCOL ARCHITECT</option>
            <option value="AI ALCHEMIST">🧪 AI ALCHEMIST</option>
            <option value="BEACH CODE JUNKIE">🌴 BEACH CODE JUNKIE</option>
          </select>
        </div>

        {/* Custom Quote */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase" htmlFor="quote">
            Builder Quote / Motto
          </label>
          <input
            id="quote"
            type="text"
            value={cardData.quote}
            onChange={handleChange}
            placeholder="e.g. Shipping dApps at 4 AM from Palolem Beach 🏖️"
            className="retro-input w-full p-2.5 text-sm rounded"
          />
        </div>

        {/* Beach Bag Essentials Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-code text-xs font-bold text-lush-green uppercase">
            Beach Bag Essentials
          </label>
          <div className="flex flex-wrap gap-1.5">
            {beachBagOptions.map((item) => {
              const selected = (cardData.beachBag || []).includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleBeachBagItem(item)}
                  className={`font-label-code text-xs px-2.5 py-1 rounded border-thin transition-all font-bold ${
                    selected
                      ? 'bg-magenta-pink text-white border-lush-green shadow-retro-sm'
                      : 'bg-sandy-off-white text-lush-green border-lush-green hover:bg-sunny-yellow'
                  }`}
                >
                  {selected ? `✓ ${item}` : `+ ${item}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Generate / Mint Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-sunny-yellow text-lush-green border-thick border-lush-green py-4 font-label-caps text-sm font-bold uppercase tracking-widest sticker-shadow hover:bg-surface-bright transition-all active:translate-x-1 active:translate-y-1 flex justify-center items-center gap-2 rounded-lg"
      >
        <span className="material-symbols-outlined text-2xl">badge</span>
        {isGenerating ? 'MINTING CARD...' : 'GENERATE & MINT ID CARD'}
      </button>
    </div>
  );
};
