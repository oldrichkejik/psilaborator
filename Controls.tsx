import React, { useState } from 'react';
import { BREEDS, STYLES, POSES } from '../constants';
import { DogConfig, DogStyle } from '../types';
import { TestTube, Sparkles, Search, ChevronDown } from 'lucide-react';

interface ControlsProps {
  config: DogConfig;
  setConfig: React.Dispatch<React.SetStateAction<DogConfig>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const Controls: React.FC<ControlsProps> = ({ config, setConfig, onGenerate, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleBreedChange = (breed: string) => {
    if (config.breeds.includes(breed)) {
      setConfig(prev => ({ ...prev, breeds: prev.breeds.filter(b => b !== breed) }));
    } else {
      if (config.breeds.length < 3) {
        setConfig(prev => ({ ...prev, breeds: [...prev.breeds, breed] }));
      }
    }
  };

  const filteredBreeds = BREEDS.filter(breed => 
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isFormValid = config.breeds.length >= 2 && config.name.trim().length > 0;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-indigo-100 space-y-6">
      <div className="space-y-4">
        
        {/* Name Input */}
        <div>
          <label className="block text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span className="bg-indigo-100 p-1 rounded-lg">🐶</span> Jméno pejska
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Např. Rex, Alík..."
            className="w-full p-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium text-slate-700"
            maxLength={20}
          />
        </div>

        {/* Breeds Selection */}
        <div>
          <label className="block text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span className="bg-pink-100 p-1 rounded-lg">🧬</span> Vyber 2-3 plemena
          </label>
          
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Hledat plemeno..."
              className="w-full pl-10 p-2 rounded-xl border-2 border-slate-100 focus:border-indigo-300 outline-none text-sm font-medium"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-50">
            {filteredBreeds.map(breed => (
              <button
                key={breed}
                onClick={() => handleBreedChange(breed)}
                className={`p-2 text-sm rounded-xl border-2 transition-all font-medium text-left truncate ${
                  config.breeds.includes(breed)
                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-md transform scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
                title={breed}
              >
                {breed}
              </button>
            ))}
            {filteredBreeds.length === 0 && (
              <p className="col-span-full text-center text-slate-400 text-sm py-4">
                Žádné plemeno nenalezeno 😕
              </p>
            )}
          </div>
          
          {config.breeds.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
               {config.breeds.map(b => (
                 <span key={b} className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700">
                   {b}
                   <button 
                     onClick={(e) => { e.stopPropagation(); handleBreedChange(b); }}
                     className="ml-1 hover:text-indigo-900"
                   >
                     ×
                   </button>
                 </span>
               ))}
            </div>
          )}

          <p className="text-xs text-slate-400 mt-2 text-right">
            Vybráno: {config.breeds.length}/3
          </p>
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span className="bg-yellow-100 p-1 rounded-lg">🎨</span> Styl obrázku
          </label>
          <div className="relative">
            <select
              value={config.style}
              onChange={(e) => setConfig(prev => ({ ...prev, style: e.target.value as DogStyle }))}
              className="w-full p-3 pr-10 rounded-xl border-2 border-indigo-100 bg-white focus:border-indigo-500 outline-none font-medium text-slate-700 appearance-none cursor-pointer transition-colors hover:border-indigo-300"
            >
              {STYLES.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Pose Selection */}
        <div>
          <label className="block text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
            <span className="bg-green-100 p-1 rounded-lg">📸</span> Póza
          </label>
          <div className="relative">
            <select
              value={config.pose}
              onChange={(e) => setConfig(prev => ({ ...prev, pose: e.target.value }))}
              className="w-full p-3 pr-10 rounded-xl border-2 border-indigo-100 bg-white focus:border-indigo-500 outline-none font-medium text-slate-700 appearance-none cursor-pointer transition-colors hover:border-indigo-300"
            >
              {POSES.map(pose => (
                <option key={pose} value={pose}>{pose}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onGenerate}
          disabled={!isFormValid || isLoading}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-3 mt-4 ${
            !isFormValid || isLoading
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <TestTube className="animate-spin" />
              Míchám DNA...
            </>
          ) : (
            <>
              <Sparkles />
              Vytvořit Pejska
            </>
          )}
        </button>
        
        {!isFormValid && (
          <p className="text-center text-red-400 text-sm font-medium">
            Zadej jméno a vyber 2-3 plemena.
          </p>
        )}
      </div>
    </div>
  );
};

export default Controls;