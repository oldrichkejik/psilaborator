import React from 'react';
import { Download, RefreshCcw } from 'lucide-react';

interface ResultProps {
  imageUrl: string | null;
  dogName: string;
  breeds: string[];
  onReset: () => void;
}

const Result: React.FC<ResultProps> = ({ imageUrl, dogName, breeds, onReset }) => {
  if (!imageUrl) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${dogName.replace(/\s+/g, '_')}_psi_laborator.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border-4 border-green-100 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <img 
          src={imageUrl} 
          alt={dogName} 
          className="relative rounded-[1.75rem] w-full shadow-lg border-4 border-white aspect-square object-cover"
        />
      </div>
      
      <div className="text-center mt-6">
        <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
          {dogName}
        </h2>
        <p className="text-slate-500 font-medium text-lg">
          Mix: {breeds.join(" + ")}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <button 
          onClick={handleDownload}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Download size={20} />
          Uložit
        </button>
        <button 
          onClick={onReset}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCcw size={20} />
          Zkusit znovu
        </button>
      </div>
    </div>
  );
};

export default Result;