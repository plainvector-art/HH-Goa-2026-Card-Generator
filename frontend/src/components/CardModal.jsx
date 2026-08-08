import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';

export const CardModal = ({ card, cardRef, onClose, onViewGallery }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPng = async () => {
    if (!cardRef || !cardRef.current) return;
    setDownloading(true);

    try {
      // Primary Method: html-to-image with fontEmbedCSS bypassed to avoid SecurityError on external Google Fonts
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: false,
        fontEmbedCSS: '',
        pixelRatio: 2
      });

      const fileName = `${card?.name ? card.name.replace(/\s+/g, '-').toLowerCase() : 'hh-goa-builder'}-card.png`;
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (primaryErr) {
      console.warn('html-to-image primary export warning, attempting html2canvas fallback:', primaryErr);
      try {
        // Fallback Method: html2canvas
        const canvas = await html2canvas(cardRef.current, {
          useCORS: true,
          allowTaint: true,
          scale: 2,
          backgroundColor: null,
          logging: false
        });

        const dataUrl = canvas.toDataURL('image/png');
        const fileName = `${card?.name ? card.name.replace(/\s+/g, '-').toLowerCase() : 'hh-goa-builder'}-card.png`;
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      } catch (fallbackErr) {
        console.error('All PNG export methods failed:', fallbackErr);
        alert('Could not export PNG automatically. Please take a screenshot of your card!');
      }
    } finally {
      setDownloading(false);
    }
  };

  const shareText = `I just minted my official Hacker House Goa 2026 Builder ID! 🌴✨\nRole: ${card?.role}\nClass: ${card?.builderClass}\n#HHGoa2026 #FrameInGoa`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/builder/${card?.id || 'HH-GOA-001'}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-lush-green/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-sandy-off-white border-thick border-lush-green p-6 md:p-8 rounded-xl max-w-lg w-full shadow-retro-lg flex flex-col items-center gap-5 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lush-green hover:text-magenta-pink font-bold p-1 rounded border-thin border-lush-green bg-surface-bright"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Success Header */}
        <div className="text-center">
          <span className="bg-magenta-pink text-white font-label-caps text-xs px-3 py-1 rounded border-thin border-lush-green shadow-retro-sm uppercase font-bold inline-block mb-2">
            READY TO SHIP 🚀
          </span>
          <h2 className="font-display-lg text-2xl md:text-3xl font-black text-lush-green">
            YOUR BUILDER ID IS MINTED!
          </h2>
          <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-1">
            Welcome to the terminal wizards of paradise. Download your card or flex it on X.
          </p>
        </div>

        {/* Quick Details Card */}
        <div className="w-full bg-surface-bright border-thin border-lush-green p-4 rounded flex items-center justify-between shadow-retro-sm">
          <div>
            <span className="font-display-lg text-lg font-bold text-lush-green block">
              {card?.name}
            </span>
            <span className="font-label-code text-xs text-magenta-pink font-bold">
              {card?.role} • {card?.builderClass}
            </span>
          </div>
          <span className="font-label-code text-xs bg-sunny-yellow text-lush-green px-2 py-1 border-thin border-lush-green font-bold rounded">
            {card?.id}
          </span>
        </div>

        {/* Primary Actions */}
        <div className="w-full flex flex-col gap-3">
          {/* Download Button */}
          <button
            onClick={handleDownloadPng}
            disabled={downloading}
            className="w-full bg-sunny-yellow text-lush-green font-label-caps text-sm font-bold border-thick border-lush-green py-3.5 px-6 sticker-shadow flex items-center justify-center gap-2 hover:bg-surface-bright uppercase tracking-wider disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            {downloading ? 'GENERATING HIGH-RES PNG...' : 'DOWNLOAD PNG CARD'}
          </button>

          {/* Share to X */}
          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-surface-bright text-lush-green font-label-caps text-sm font-bold border-thick border-lush-green py-3 px-6 sticker-shadow flex items-center justify-center gap-2 hover:bg-magenta-pink hover:text-white transition-colors uppercase tracking-wider text-center"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path>
            </svg>
            FLEX ON X (TWITTER)
          </a>

          {/* Copy Shareable Link */}
          <button
            onClick={handleCopyLink}
            className="w-full bg-sandy-off-white text-lush-green font-label-code text-xs font-bold border-thin border-lush-green py-2 px-4 flex items-center justify-center gap-1.5 hover:bg-sunny-yellow"
          >
            <span className="material-symbols-outlined text-base">link</span>
            {copied ? 'LINK COPIED TO CLIPBOARD! 📋' : 'COPY SHAREABLE LINK'}
          </button>
        </div>

        {/* Footer Actions */}
        <div className="w-full flex justify-between items-center pt-2 border-t-thin border-lush-green/30 text-xs font-label-code">
          <button
            onClick={onViewGallery}
            className="text-magenta-pink font-bold hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">grid_view</span>
            View Community Manifest
          </button>
          <button
            onClick={onClose}
            className="text-lush-green hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Create Another Card
          </button>
        </div>
      </div>
    </div>
  );
};
