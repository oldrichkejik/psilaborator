import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Sparkles } from 'lucide-react';

interface ResultProps {
  imageUrl: string;
  dogName: string;
  breeds: string[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ imageUrl, dogName, breeds, onReset }) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Efekt pro animaci Loading Baru
  useEffect(() => {
    // Reset při nové URL
    setIsImgLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        // Zpomalíme, když se blížíme k 90%, a tam čekáme
        if (prev >= 90) return 90; 
        // Jinak přičítáme náhodně trochu procent
        return prev + Math.random() * 5;
      });
    }, 500); // Aktualizace každou půl sekundu

    return () => clearInterval(interval);
  }, [imageUrl]);

  const handleImageLoad = () => {
    setProgress(100);
    // Malá pauza, aby si uživatel všiml 100%, než zmizí loading bar
    setTimeout(() => {
      setIsImgLoading(false);
    }, 500);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
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
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 h-full flex flex-col animate-fade-in">
      <div className="relative aspect-square w-full bg-slate-100 rounded-2xl overflow-hidden mb-6 group">
        
        {/* Loading Bar Sekce */}
        {isImgLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 z-10 p-8 text-center">
            <div className="mb-4 relative">
               <Sparkles className="text-purple-500 animate-spin-slow" size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">Míchám DNA... 🧬</h3>
            <p className="text-slate-500 mb-6 text-sm">Chvilku strpení, maluji nového pejska.</p>
            
            {/* Samotný grafický Loading Bar */}
            <div className="w-full max-w-[200px] h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">{Math.round(progress)}%</p>
          </div>
        )}

        {/* Obrázek - je tam, ale skrytý dokud se nenačte */}
        <img 
          src={imageUrl} 
          alt={`Mix: ${breeds.join(' + ')}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isImgLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={() => setIsImgLoading(false)} // Kdyby to selhalo, ať nezůstane viset loading
        />
        
        {!isImgLoading && (
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
            disabled={isImgLoading}
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
