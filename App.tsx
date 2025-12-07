import React, { useState, useRef, useEffect } from 'react';
import { DogConfig, DogStyle, DogPose } from './types';
import Controls from './components/Controls';
import Result from './components/Result';
import { generateDogImage } from './services/geminiService';
import { FlaskConical } from 'lucide-react';

const App: React.FC = () => {
  const [config, setConfig] = useState<DogConfig>({
    breeds: [],
    pose: DogPose.FRONT,
    style: DogStyle.REALISTIC,
    name: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Ref for auto-scrolling
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedImage && resultRef.current) {
      // Small delay to ensure render is complete
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [generatedImage]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateDogImage(config);
      setGeneratedImage(imageUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Nepodařilo se vygenerovat pejska. Zkuste to prosím znovu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setError(null);
    // Optional: scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block animate-bounce mb-2 text-6xl md:text-7xl filter drop-shadow-lg cursor-default select-none">
            🐶 🧪 ⚡
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
  Vstup do světa psí fantazie! 🐾 Vyber si oblíbená plemena, zamíchej je dohromady a nech umělou inteligenci, aby ti vyčarovala toho nejroztomilejšího (nebo nejbláznivějšího) pejska na světě.
</p>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Staň se šíleným vědcem! Namíchej DNA různých plemen a vytvoř si svého unikátního čtyřnohého kamaráda.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Controls */}
          <div className="order-2 lg:order-1">
             <Controls 
               config={config} 
               setConfig={setConfig} 
               onGenerate={handleGenerate}
               isLoading={isLoading}
             />
          </div>

          {/* Right Column: Results or Placeholder */}
          <div className="order-1 lg:order-2" ref={resultRef}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 border border-red-200">
                <strong>Chyba:</strong> {error}
              </div>
            )}
            
            {generatedImage ? (
              <Result 
                imageUrl={generatedImage} 
                dogName={config.name} 
                breeds={config.breeds}
                onReset={handleReset}
              />
            ) : (
              <div className="hidden lg:flex flex-col items-center justify-center h-full min-h-[500px] bg-white/50 border-4 border-dashed border-slate-200 rounded-3xl p-8 text-center">
                <div className="opacity-20 mb-4">
                  <FlaskConical size={120} />
                </div>
                <h3 className="text-2xl font-bold text-slate-400 mb-2">Čekám na experiment</h3>
                <p className="text-slate-400">Vyplň údaje vlevo a stiskni tlačítko pro vytvoření nového druhu!</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>Používá Google Gemini AI • Vytvořeno pro zábavu</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
