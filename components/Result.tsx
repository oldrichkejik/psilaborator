import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface ResultProps {
  imageUrl: string;
  dogName: string;
  breeds: string[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ imageUrl, dogName, breeds, onReset }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [currentImgUrl, setCurrentImgUrl] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  // 1. Loading Bar Animace
  useEffect(() => {
    setIsImgLoading(true);
    setProgress(0);
    setRetryCount(0);
    setHasError(false);
    setCurrentImgUrl(imageUrl);

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Zasekneme se na 95%, dokud se obrázek fakt nenačte
        if (prev >= 95) return 95; 
        return prev + Math.random() * 8;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [imageUrl]);

  // 2. Funkce pro úspěšné načtení
  const handleImageLoad = () => {
    setProgress(100);
    setTimeout(() => setIsImgLoading(false), 500);
  };

  // 3. Funkce pro chybu (RETRY LOGIC)
  const handleImageError = () => {
    // Pokud jsme to zkusili méně než 10x (cca 30 sekund), zkusíme to znovu
    if (retryCount < 10) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Trik: Přidáme na konec URL náhodné číslo, aby to prohlížeč zkusil znovu načíst
        setCurrentImgUrl(`${imageUrl}&retry=${retryCount + 1}`);
      }, 3000); // Počkáme 3 sekundy před dalším pokusem
    } else {
      // Po 10 pokusech to vzdáme
      setHasError(true);
      setIsImgLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(currentImgUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dogName || 'pejsek'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      window.open(currentImgUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 h-full flex flex-col animate-fade-in">
      <div className="relative aspect-square w-full bg-slate-100 rounded-2xl overflow-hidden mb-6 group">
        
        {/* Loading Stav */}
        {isImgLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 p-8 text-center transition-opacity duration-500">
            <div className="mb-4 relative">
               <Sparkles className="text-purple-500 animate-spin-slow" size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              {retryCount > 0 ? `Stále míchám... (pokus ${retryCount})` : "Míchám DNA... 🧬"}
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
              Tvoření nového života chvilku trvá. Strpení...
            </p>
            
            <div className="w-full max-w-[200px] h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Chybový Stav (když to fakt nevyjde) */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10 p-8 text-center">
            <AlertCircle className="text-red-500 mb-4" size={48} />
            <h3 className="text-xl font-bold text-slate-700 mb-2">Něco se pokazilo 😔</h3>
            <p className="text-slate-500 mb-4 text-sm">Pejsek utekl. Zkus to prosím znovu.</p>
          </div>
        )}

        {/* Samotný Obrázek */}
        <img 
          src={currentImgUrl} 
          alt={`Mix: ${breeds.join(' + ')}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isImgLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
        {!isImgLoading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
      </div>

      <div className="text-center mt-auto">
        <h2 className="text-3xl font-black text-slate-800 mb-2 lowercase tracking-tight">
          {dogName || 'bezejmenný'}
        </h2>
        <p className="text-slate-500 font-medium mb-6">
          Mix: {breeds.join(' + ')}
        </p>

        <div className="flex gap-3 justify-center">
          <button 
            onClick={handleDownload}
            disabled={isImgLoading || hasError}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/30"
          >
            <Download size={20} />
            Uložit
          </button>
          
          <button 
            onClick={onReset}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Zkusit znovu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
