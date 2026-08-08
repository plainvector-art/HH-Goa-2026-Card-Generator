import React, { useState, useRef } from 'react';
import { playFlipSound } from './AudioEffects';

export const CardPreview = ({ cardData, isFlipped, setIsFlipped, foilEnabled, setFoilEnabled, cardRef }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Moderate tilt angles for subtle 3D depth
    setRotation({
      x: -(y / rect.height) * 12,
      y: (x / rect.width) * 12
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const toggleFlip = () => {
    playFlipSound();
    setIsFlipped(!isFlipped);
  };

  const themeColors = {
    tropical: {
      bg: 'bg-sandy-off-white',
      border: 'border-lush-green',
      accent: 'bg-magenta-pink',
      badgeBg: 'bg-sunny-yellow',
      text: 'text-lush-green'
    },
    cyber: {
      bg: 'bg-[#0E1416]',
      border: 'border-[#22D3EE]',
      accent: 'bg-[#22D3EE]',
      badgeBg: 'bg-[#66F796]',
      text: 'text-[#DDE4E5]'
    },
    sunset: {
      bg: 'bg-[#FFF3E0]',
      border: 'border-[#E65100]',
      accent: 'bg-[#FF6D00]',
      badgeBg: 'bg-[#FFD54F]',
      text: 'text-[#BF360C]'
    }
  };

  const currentTheme = themeColors[cardData.theme || 'tropical'];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* 3D Perspective Canvas Container */}
      <div
        className="perspective-1000 w-full max-w-md cursor-pointer group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
      >
        <div
          ref={cardRef}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg)`
          }}
          className="transform-style-3d relative w-full aspect-[1/1.55] rounded-xl transition-transform duration-300 shadow-[8px_8px_0px_0px_#0D3B2E]"
        >
          {/* ==================================================== */}
          {/* CARD FRONT SIDE                                      */}
          {/* ==================================================== */}
          <div className="backface-hidden absolute inset-0 bg-sandy-off-white border-[6px] border-lush-green rounded-xl overflow-hidden p-4 flex flex-col justify-between items-center text-lush-green">
            {/* Lanyard Hole Clip Graphic */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-lush-green rounded-b-md flex justify-center items-center z-30">
              <div className="w-6 h-1.5 bg-sunny-yellow rounded-full"></div>
            </div>

            {/* Foil Overlay */}
            {foilEnabled && <div className="holo-foil absolute inset-0 z-20 opacity-40"></div>}

            {/* Top Postage Stamp Header */}
            <div className="w-full flex justify-between items-start pt-2 px-1 z-10">
              {/* Palm Stamp graphic */}
              <div className="w-10 h-10 border-thin border-lush-green bg-sunny-yellow p-1 flex flex-col items-center justify-center rotate-[-4deg] shadow-retro-sm">
                <span className="material-symbols-outlined text-lush-green text-sm">palms</span>
                <span className="font-label-code text-[8px] font-bold">GOA</span>
              </div>

              {/* Header Event Title */}
              <div className="text-center">
                <div className="bg-magenta-pink text-white font-label-caps text-[11px] font-bold px-3 py-1 rounded border-thin border-lush-green shadow-retro-sm uppercase tracking-wider">
                  HH GOA 2026
                </div>
                <span className="font-label-code text-[9px] text-lush-green opacity-80 block mt-0.5">
                  OFFICIAL BUILDER PASS
                </span>
              </div>

              {/* Badge Stamp */}
              <div className="w-10 h-10 rounded-full border-thin border-lush-green bg-magenta-pink text-white p-1 flex items-center justify-center rotate-[6deg] shadow-retro-sm">
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
            </div>

            {/* Headline Title */}
            <div className="text-center flex items-center gap-1.5 z-10 mt-1">
              <h2 className="font-display-lg text-2xl font-black tracking-tight text-lush-green uppercase">
                HACKER
              </h2>
              <span className="font-display-lg text-lg text-sunny-yellow bg-magenta-pink px-2 py-0.5 rounded border-thin border-lush-green transform -rotate-3 shadow-retro-sm">
                GOA
              </span>
              <h2 className="font-display-lg text-2xl font-black tracking-tight text-lush-green uppercase">
                HOUSE
              </h2>
            </div>

            {/* Avatar Profile Area */}
            <div className="relative w-44 h-44 z-10 my-1">
              {/* Animated Rotating Dotted Border */}
              <div className="absolute inset-0 rounded-full border-[5px] border-dashed border-magenta-pink animate-[spin_40s_linear_infinite]"></div>
              
              <div className="absolute inset-2 rounded-full border-thick border-lush-green overflow-hidden bg-surface-container flex items-center justify-center shadow-inner">
                {cardData.avatar ? (
                  <img
                    src={cardData.avatar}
                    alt={cardData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-sandy-off-white text-lush-green">
                    <span className="material-symbols-outlined text-5xl">person</span>
                    <span className="font-label-code text-[10px] uppercase">Upload Avatar</span>
                  </div>
                )}
              </div>

              {/* Status Badge Tag */}
              <div className="absolute -bottom-2 right-0 bg-sunny-yellow text-lush-green font-label-caps text-[9px] font-bold px-2 py-0.5 rounded-full border-thin border-lush-green shadow-retro-sm uppercase">
                ⚡ SHIPPED
              </div>
            </div>

            {/* Name Plate */}
            <div className="w-full bg-lush-green text-white text-center py-2 relative rounded border-thin border-lush-green shadow-retro-yellow z-10">
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-sunny-yellow rounded-full"></div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-sunny-yellow rounded-full"></div>
              <h3 className="font-display-lg text-xl font-black uppercase tracking-wider truncate px-6">
                {cardData.name || 'YOUR NAME'}
              </h3>
              <p className="font-label-code text-[10px] text-sunny-yellow tracking-widest font-normal">
                {cardData.handle || '@BUILDER'}
              </p>
            </div>

            {/* Role Tag Banner */}
            <div className="w-full bg-[#FFF0B3] border-thin border-lush-green text-center py-1 flex items-center justify-center gap-1.5 z-10">
              <span className="material-symbols-outlined text-lush-green text-xs font-bold">bolt</span>
              <span className="font-label-code text-xs text-magenta-pink font-bold uppercase tracking-wide truncate">
                {cardData.role || 'FULLSTACK DEVELOPER'}
              </span>
              <span className="material-symbols-outlined text-lush-green text-xs font-bold">bolt</span>
            </div>

            {/* Meta Info Grid */}
            <div className="w-full grid grid-cols-3 gap-1 text-center border-t-thin border-lush-green pt-2 z-10 bg-sandy-off-white">
              {/* Builder Class */}
              <div className="flex flex-col items-center border-r-thin border-lush-green pr-1">
                <span className="font-label-caps text-[8px] font-bold text-lush-green uppercase">
                  ✦ CLASS ✦
                </span>
                <span className="font-display-lg text-magenta-pink text-[11px] font-extrabold leading-tight uppercase mt-0.5 truncate w-full">
                  {cardData.builderClass || 'TERMINAL WIZARD'}
                </span>
              </div>

              {/* Beach Bag */}
              <div className="flex flex-col items-center border-r-thin border-lush-green px-1">
                <span className="font-label-caps text-[8px] font-bold text-lush-green uppercase">
                  ✦ BEACH BAG ✦
                </span>
                <div className="flex flex-wrap justify-center gap-0.5 mt-0.5">
                  {(cardData.beachBag || ['COCONUT', 'LAPTOP']).slice(0, 2).map((item, idx) => (
                    <span
                      key={idx}
                      className="font-label-code text-[9px] bg-sunny-yellow text-lush-green px-1 rounded border-thin border-lush-green font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Serial ID */}
              <div className="flex flex-col items-center pl-1">
                <span className="font-label-caps text-[8px] font-bold text-lush-green uppercase">
                  ✦ PASS ID ✦
                </span>
                <span className="font-label-code text-[10px] text-lush-green font-bold mt-0.5">
                  {cardData.id || 'HH-GOA-2026'}
                </span>
              </div>
            </div>

            {/* Footer Watermark */}
            <div className="w-full text-center text-[8px] font-label-code text-lush-green opacity-70 z-10">
              PALOLEM BEACH • GOA • INDIA • AUG 2026
            </div>
          </div>

          {/* ==================================================== */}
          {/* CARD BACK SIDE (QR Code & Barcode Verification)      */}
          {/* ==================================================== */}
          <div className="rotate-y-180 backface-hidden absolute inset-0 bg-lush-green text-sandy-off-white border-[6px] border-sunny-yellow rounded-xl p-5 flex flex-col justify-between items-center scanline-overlay">
            {/* Top Barcode Header */}
            <div className="w-full flex justify-between items-center border-b-thin border-sunny-yellow pb-2">
              <span className="font-display-lg text-lg text-sunny-yellow font-black">
                HH GOA '26
              </span>
              <span className="font-label-code text-xs text-sandy-off-white border-thin border-sunny-yellow px-2 py-0.5 rounded">
                SECURE CREDENTIAL
              </span>
            </div>

            {/* Quote Block */}
            <div className="w-full bg-[#164E3D] border-thin border-sunny-yellow p-3 rounded text-center my-2">
              <span className="material-symbols-outlined text-sunny-yellow text-lg block mb-1">
                format_quote
              </span>
              <p className="font-body-md text-xs italic text-sandy-off-white">
                "{cardData.quote || 'Ship from Paradise. Build for the world.'}"
              </p>
            </div>

            {/* Simulated QR Code for Verification */}
            <div className="bg-sandy-off-white p-3 rounded border-thick border-sunny-yellow flex flex-col items-center gap-1 shadow-retro-yellow">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://hhgoa2026.dev/builder/${cardData.id || 'HH-GOA-001'}&color=0D3B2E&bgcolor=F9F3D9`}
                alt="QR Code"
                className="w-24 h-24"
              />
              <span className="font-label-code text-[9px] text-lush-green font-bold">
                SCAN TO VERIFY BUILDER
              </span>
            </div>

            {/* Event Specs */}
            <div className="w-full text-center font-label-code text-[10px] text-sunny-yellow space-y-0.5">
              <p>HACKER HOUSE GOA • PALOLEM</p>
              <p>VENUE ACCESS: ALL ZONES + SUNSET LOUNGE</p>
            </div>

            {/* Fake Barcode SVG */}
            <div className="w-full flex flex-col items-center pt-1 border-t-thin border-sunny-yellow/40">
              <div className="flex gap-1 h-6 items-center">
                {[4, 2, 6, 1, 5, 3, 2, 6, 4, 1, 3, 5, 2, 4, 6, 2, 1, 5, 3].map((w, i) => (
                  <div
                    key={i}
                    style={{ width: `${w}px` }}
                    className="h-full bg-sunny-yellow"
                  ></div>
                ))}
              </div>
              <span className="font-label-code text-[9px] tracking-widest text-sandy-off-white mt-1">
                *{cardData.id || 'HH-GOA-2026-001'}*
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Interactive Controls Bar */}
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        <button
          onClick={toggleFlip}
          className="bg-surface-bright text-lush-green font-label-code text-xs px-3 py-1.5 rounded border-thin border-lush-green sticker-shadow font-bold flex items-center gap-1 hover:bg-sunny-yellow"
        >
          <span className="material-symbols-outlined text-base">3d_rotation</span>
          {isFlipped ? 'SHOW FRONT' : 'FLIP CARD (BACK)'}
        </button>

        <button
          onClick={() => setFoilEnabled(!foilEnabled)}
          className={`font-label-code text-xs px-3 py-1.5 rounded border-thin border-lush-green sticker-shadow font-bold flex items-center gap-1 ${
            foilEnabled ? 'bg-magenta-pink text-white' : 'bg-surface-bright text-lush-green hover:bg-sunny-yellow'
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          HOLOGRAM FOIL: {foilEnabled ? 'ON' : 'OFF'}
        </button>
      </div>
    </div>
  );
};
