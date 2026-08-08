import React, { useState, useEffect, useRef } from 'react';
import { TopAppBar } from './components/TopAppBar';
import { CardEditor } from './components/CardEditor';
import { CardPreview } from './components/CardPreview';
import { CardModal } from './components/CardModal';
import { BuilderGallery } from './components/BuilderGallery';
import { triggerTropicalConfetti } from './components/Confetti';
import { playStampSound } from './components/AudioEffects';
import { saveCard, fetchCards } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState('editor');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [foilEnabled, setFoilEnabled] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cardCount, setCardCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [savedCard, setSavedCard] = useState(null);

  const cardRef = useRef(null);

  // Live draft card state
  const [cardData, setCardData] = useState({
    id: 'HH-GOA-2026-001',
    name: 'ARJUN MEHTA',
    handle: '@arjun_code',
    role: 'SOLANA / RUST',
    builderClass: 'TERMINAL WIZARD',
    theme: 'tropical',
    quote: 'Shipping dApps at 4 AM from Palolem Beach 🏖️',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    badges: ['READY TO SHIP', 'COCONUT POWERED', 'SOLANA / RUST'],
    beachBag: ['LAPTOP', 'COCONUT', 'FLIP FLOPS']
  });

  const loadCardCount = async () => {
    const data = await fetchCards();
    setCardCount(data.count || 0);
  };

  useEffect(() => {
    loadCardCount();
  }, []);

  const handleGenerateCard = async () => {
    try {
      setIsGenerating(true);
      if (soundEnabled) playStampSound();

      // Save card to backend REST API
      const result = await saveCard(cardData);
      const mintedCard = result.card || cardData;

      setSavedCard(mintedCard);
      setCardData(mintedCard);
      loadCardCount();

      // Trigger Confetti explosion
      triggerTropicalConfetti();

      // Open celebration modal
      setShowModal(true);
    } catch (err) {
      console.warn('Backend save notice, using current live card:', err);
      triggerTropicalConfetti();
      setSavedCard(cardData);
      setShowModal(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectCardFromGallery = (selected) => {
    setCardData(selected);
    setSavedCard(selected);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen flex flex-col celebration-bg">
      {/* Navigation App Bar */}
      <TopAppBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cardCount={cardCount}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 md:px-12 py-8 md:py-12 flex flex-col justify-center">
        {activeTab === 'editor' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto w-full">
            {/* Left Column: Form Controls */}
            <section className="lg:col-span-5 w-full">
              <CardEditor
                cardData={cardData}
                setCardData={setCardData}
                onGenerate={handleGenerateCard}
                isGenerating={isGenerating}
                soundEnabled={soundEnabled}
              />
            </section>

            {/* Right Column: Live Interactive Card Canvas */}
            <section className="lg:col-span-7 w-full flex justify-center items-start lg:sticky top-20">
              <CardPreview
                cardData={cardData}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
                foilEnabled={foilEnabled}
                setFoilEnabled={setFoilEnabled}
                cardRef={cardRef}
              />
            </section>
          </div>
        ) : (
          <BuilderGallery
            onSelectCard={handleSelectCardFromGallery}
            onCreateNew={() => setActiveTab('editor')}
          />
        )}
      </main>

      {/* Minted Card Celebration Modal */}
      {showModal && (
        <CardModal
          card={savedCard || cardData}
          cardRef={cardRef}
          onClose={() => setShowModal(false)}
          onViewGallery={() => {
            setShowModal(false);
            setActiveTab('gallery');
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-lush-green border-t-thick border-sunny-yellow text-sandy-off-white py-6 px-4 md:px-12 mt-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-label-code">
        <div className="font-display-lg text-lg text-sunny-yellow font-black">
          HH GOA 2026
        </div>
        <div className="flex gap-4 opacity-80">
          <a href="#" className="hover:text-magenta-pink transition-colors">GALLERY</a>
          <a href="#" className="hover:text-magenta-pink transition-colors">RULES</a>
          <a href="#" className="hover:text-magenta-pink transition-colors">PRIVACY</a>
          <a href="#" className="hover:text-magenta-pink transition-colors">TWITTER</a>
        </div>
        <div className="opacity-70">
          © 2026 Hacker House Goa. #ShipFromParadise
        </div>
      </footer>
    </div>
  );
}

export default App;
