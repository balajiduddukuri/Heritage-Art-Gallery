import React, { useState, useEffect, useCallback } from 'react';
import { ArtStyle, GeneratedArt } from './types';
import { generateArtImage } from './services/geminiService';
import ArtFrame from './components/ArtFrame';
import { PaletteIcon, RefreshCwIcon, ChevronRightIcon, PlayIcon, PauseIcon } from './components/Icons';
import { ART_PROMPTS } from './constants';

const App: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState<ArtStyle>(ArtStyle.PATTACHITRA);
  const [generatedHistory, setGeneratedHistory] = useState<GeneratedArt[]>([]);
  const [currentArt, setCurrentArt] = useState<GeneratedArt | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAutoMode, setIsAutoMode] = useState<boolean>(false);

  const handleGenerate = useCallback(async (style: ArtStyle) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateArtImage(style);
      const newArt: GeneratedArt = {
        id: crypto.randomUUID(),
        url: imageUrl,
        style: style,
        timestamp: Date.now()
      };
      
      setGeneratedHistory(prev => [newArt, ...prev]);
      setCurrentArt(newArt);
    } catch (err) {
      console.error(err);
      setError("The artist is taking a break. Please try again shortly.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handler for style selection tiles
  const handleStyleSelect = useCallback((style: ArtStyle, isAutoEvent = false) => {
    if (!isAutoEvent) {
      setIsAutoMode(false); // Stop auto mode on manual interaction
    }

    if (style === currentStyle && currentArt && !isAutoEvent) return; 
    
    setCurrentStyle(style);
    handleGenerate(style);
  }, [currentStyle, currentArt, handleGenerate]);

  const handleRetry = () => {
    setIsAutoMode(false); // Manual retry stops auto mode
    handleGenerate(currentStyle);
  };

  // Auto Mode Logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isAutoMode && !isLoading) {
      timeoutId = setTimeout(() => {
        const styles = Object.values(ArtStyle) as ArtStyle[];
        const currentIndex = styles.indexOf(currentStyle);
        const nextIndex = (currentIndex + 1) % styles.length;
        const nextStyle = styles[nextIndex];
        
        handleStyleSelect(nextStyle, true);
      }, 10000); // 10 seconds viewing time
    }

    return () => clearTimeout(timeoutId);
  }, [isAutoMode, isLoading, currentStyle, handleStyleSelect]);

  // Initial generation on mount (optional)
  useEffect(() => {
    // handleGenerate(ArtStyle.PATTACHITRA); 
  }, [handleGenerate]);

  const getLoadingMessage = (style: ArtStyle) => {
    switch (style) {
      case ArtStyle.WARLI: return "Sketching tribal rhythms...";
      case ArtStyle.PATTACHITRA: return "Painting divine narratives...";
      case ArtStyle.BAPU: return "Drawing soulful expressions...";
      default: return "Creating masterpiece...";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-200 flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar / Controls */}
      <aside className="w-full md:w-80 lg:w-96 bg-[#111] border-r border-[#222] flex flex-col z-20 shadow-2xl">
        <div className="p-8 border-b border-[#222]">
          <div className="flex items-center space-x-3 text-amber-500 mb-2">
            <PaletteIcon className="w-6 h-6" />
            <span className="text-xs uppercase tracking-[0.2em] font-bold">Heritage AI</span>
          </div>
          <h1 className="text-3xl font-serif text-white leading-tight">
            Indian Art<br/>Gallery
          </h1>
          <p className="mt-4 text-sm text-stone-400 font-light leading-relaxed">
            Experience the rhythmic symmetry of Warli, the divine intricacy of Pattachitra, and the soulful lines of Bapu style, reimagined by AI.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Style Selector */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold">Select Collection</h3>
            <div className="space-y-4">
              {(Object.values(ArtStyle) as ArtStyle[]).map((style) => (
                <button
                  key={style}
                  onClick={() => handleStyleSelect(style)}
                  disabled={isLoading}
                  className={`w-full text-left group relative overflow-hidden rounded-lg border transition-all duration-300 ${
                    currentStyle === style 
                      ? 'border-amber-600 bg-amber-900/10' 
                      : 'border-[#333] hover:border-stone-500 bg-[#161616]'
                  }`}
                >
                  <div className="p-5 relative z-10">
                     <div className="flex justify-between items-center mb-2">
                        <span className={`font-serif text-lg ${currentStyle === style ? 'text-amber-500' : 'text-stone-300'}`}>
                          {style}
                        </span>
                        {isLoading && currentStyle === style && (
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                        )}
                     </div>
                     <p className="text-xs text-stone-500 leading-relaxed pr-4">
                       {ART_PROMPTS[style].description}
                     </p>
                  </div>
                  
                  {/* Active Indicator Bar */}
                  {currentStyle === style && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* History / Gallery Thumbs */}
          {generatedHistory.length > 0 && (
             <div className="pt-6 border-t border-[#222]">
               <h3 className="text-xs uppercase tracking-widest text-stone-500 mb-4 font-bold">Recent Curation</h3>
               <div className="grid grid-cols-2 gap-3">
                 {generatedHistory.map((art) => (
                   <button 
                    key={art.id}
                    onClick={() => {
                      setIsAutoMode(false); // Stop auto on history click
                      setCurrentArt(art);
                      setCurrentStyle(art.style);
                    }}
                    className={`relative aspect-square rounded overflow-hidden border transition-all ${
                      currentArt?.id === art.id ? 'border-amber-500 ring-1 ring-amber-500' : 'border-[#333] opacity-60 hover:opacity-100'
                    }`}
                   >
                     <img src={art.url} alt="Gallery thumbnail" className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
             </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-[#222] bg-[#0f0f0f] space-y-3">
          {/* Auto Mode Toggle */}
          <button
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`w-full py-3 px-4 rounded-sm border transition-all flex items-center justify-center space-x-2 text-xs uppercase tracking-widest ${
              isAutoMode 
                ? 'bg-amber-900/20 border-amber-600/50 text-amber-500' 
                : 'border-[#333] hover:border-stone-500 text-stone-400 hover:text-stone-200'
            }`}
          >
            {isAutoMode ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
            <span>{isAutoMode ? 'Pause Auto-Tour' : 'Start Auto-Tour'}</span>
          </button>

          <button
            onClick={() => handleRetry()}
            disabled={isLoading}
            className="w-full py-4 bg-stone-100 hover:bg-white text-black font-serif uppercase tracking-widest text-sm flex items-center justify-center space-x-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
          >
             {isLoading ? (
               <span>Curating...</span>
             ) : (
               <>
                 <RefreshCwIcon className="w-4 h-4" />
                 <span>Generate New</span>
               </>
             )}
          </button>
        </div>
      </aside>

      {/* Main Gallery Area */}
      <main className="flex-1 relative flex flex-col h-[100vh]"> {/* Fixed height for scrollable content inside if needed, mostly static frame */}
        
        {/* Top Navbar / Breadcrumb (Mobile mostly) */}
        <div className="md:hidden h-16 border-b border-[#222] flex items-center px-6 bg-[#111]">
           <span className="font-serif text-amber-500">Heritage Gallery</span>
        </div>

        <div className="flex-1 bg-neutral-950 relative overflow-hidden flex items-center justify-center p-4 md:p-12">
            
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black pointer-events-none"></div>
            
            {/* Ambient Light Effect */}
            <div className="absolute top-[-10%] left-[20%] w-[60%] h-[40%] bg-amber-900/10 blur-[100px] pointer-events-none rounded-full"></div>

            {/* Error Message */}
            {error && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-900/90 text-red-100 px-6 py-3 rounded border border-red-700 backdrop-blur-md shadow-xl flex items-center space-x-3">
                <span className="text-xl">⚠️</span>
                <p>{error}</p>
                <button onClick={() => setError(null)} className="ml-4 text-xs underline">Dismiss</button>
              </div>
            )}

            {/* The Artwork Component */}
            <div className="z-10 w-full max-w-5xl h-full flex flex-col justify-center">
               <ArtFrame 
                  art={currentArt} 
                  isLoading={isLoading} 
                  loadingMessage={getLoadingMessage(currentStyle)}
               />
            </div>
            
            {/* Auto Mode Indicator in Main View */}
            {isAutoMode && (
              <div className="absolute bottom-8 right-8 flex items-center space-x-2 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-500 text-xs tracking-wider animate-pulse">
                <PlayIcon className="w-3 h-3" />
                <span>Auto-Tour Active</span>
              </div>
            )}
        </div>
        
        {/* Footer info */}
        <div className="h-12 border-t border-[#222] bg-[#0a0a0a] flex items-center justify-between px-8 text-[10px] uppercase tracking-widest text-stone-600">
           <span>Gemini AI Collection</span>
           <span>Est. 2024</span>
        </div>
      </main>
    </div>
  );
};

export default App;