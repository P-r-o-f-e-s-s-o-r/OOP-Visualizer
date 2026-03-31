import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Layers, Dog, Cat, Bird, Info, Eye, EyeOff, Play, CheckCircle2, Volume2 } from 'lucide-react';
import { MODULES } from '../types.ts';
import InteractiveCodeSnippet from './InteractiveCodeSnippet';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

type AnimalType = 'dog' | 'cat' | 'bird';

export default function PolymorphismModule({ onBack, onComplete }: Props) {
  const module = MODULES.find(m => m.id === 'polymorphism')!;
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalType>('dog');
  const [showCode, setShowCode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedAnimals, setCompletedAnimals] = useState<AnimalType[]>([]);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);

  // Clear highlight after delay
  useEffect(() => {
    if (highlightedPart) {
      const timer = setTimeout(() => setHighlightedPart(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedPart]);

  const handleSpeak = () => {
    setIsSpeaking(true);
    setHighlightedPart('speak');
    setTimeout(() => setIsSpeaking(false), 1500);
    if (!completedAnimals.includes(selectedAnimal)) {
      setCompletedAnimals(prev => [...prev, selectedAnimal]);
    }
  };

  const getSound = () => {
    switch (selectedAnimal) {
      case 'dog': return 'Woof! Woof!';
      case 'cat': return 'Meow...';
      case 'bird': return 'Chirp! Chirp!';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
          <motion.div whileHover={{ x: -5 }}>
            <ArrowLeft size={20} />
          </motion.div> 
          Back to Dashboard
        </button>
        <div className="flex items-center gap-2 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-xs md:text-sm font-bold">
          <Layers size={18} /> POLYMORPHISM
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        {/* Left: Content */}
        <div className="space-y-6 md:space-y-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <h2 className="text-3xl md:text-4xl font-black mb-4">{module.title}</h2>
            <p className="text-slate-400 leading-relaxed text-base md:text-lg">
              {module.description}
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass p-5 md:p-6 rounded-2xl border-l-4 border-pink-500"
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Info size={18} className="text-pink-500" /> Real-World Analogy
            </h4>
            <p className="text-slate-300 text-xs md:text-sm italic leading-relaxed">
              "{module.analogy}"
            </p>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500">Code Implementation</h4>
              <button 
                onClick={() => setShowCode(!showCode)}
                className="text-[10px] md:text-xs font-bold text-pink-500 hover:underline flex items-center gap-1"
              >
                {showCode ? <EyeOff size={14} /> : <Eye size={14} />} {showCode ? 'Hide Code' : 'Show Code'}
              </button>
            </div>
            
            <AnimatePresence>
              {showCode && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <InteractiveCodeSnippet 
                    code={module.codeSnippet}
                    interactiveParts={module.interactiveParts}
                    onPartClick={(id) => setHighlightedPart(id)}
                    highlightedId={highlightedPart}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Simulation */}
        <div className="space-y-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[350px] md:min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-pink-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            
            <div className="flex flex-col items-center gap-6 md:gap-10 w-full z-10">
              {/* Animal Selector */}
              <div className="flex items-center gap-3 md:gap-4">
                <AnimalTab 
                  icon={Dog} 
                  active={selectedAnimal === 'dog'} 
                  onClick={() => setSelectedAnimal('dog')} 
                />
                <AnimalTab 
                  icon={Cat} 
                  active={selectedAnimal === 'cat'} 
                  onClick={() => setSelectedAnimal('cat')} 
                />
                <AnimalTab 
                  icon={Bird} 
                  active={selectedAnimal === 'bird'} 
                  onClick={() => setSelectedAnimal('bird')} 
                />
              </div>

              {/* Visual Representation */}
              <div className="relative">
                <motion.div
                  key={selectedAnimal}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: isSpeaking ? [1, 1.1, 1] : 1,
                    y: isSpeaking ? [0, -10, 0] : 0,
                    opacity: 1,
                    borderColor: highlightedPart === 'speak' ? '#ec4899' : isSpeaking ? '#ec4899' : '#334155'
                  }}
                  transition={{
                    scale: { type: 'spring', stiffness: 200 },
                    y: { duration: 0.3 }
                  }}
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isSpeaking ? 'bg-pink-500/20 border-pink-500 shadow-2xl shadow-pink-500/20' : 'bg-slate-800/50 border-slate-700'}`}
                >
                  {selectedAnimal === 'dog' && <Dog size={60} md:size={80} className="text-blue-400" />}
                  {selectedAnimal === 'cat' && <Cat size={60} md:size={80} className="text-purple-400" />}
                  {selectedAnimal === 'bird' && <Bird size={60} md:size={80} className="text-yellow-400" />}
                </motion.div>

                <AnimatePresence>
                  {isSpeaking && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, x: 30, y: -30 }}
                      animate={{ opacity: 1, scale: 1, x: 50, y: -50 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-0 right-0 bg-white text-slate-900 px-3 md:px-4 py-1 md:py-2 rounded-2xl font-bold text-xs md:text-sm shadow-xl z-20"
                    >
                      {getSound()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-center">
                <h4 className={`text-lg md:text-xl font-bold uppercase tracking-widest transition-colors ${highlightedPart === 'speak' ? 'text-pink-500' : 'text-glow'}`}>Animal.speak()</h4>
                <p className="text-slate-500 text-[10px] md:text-sm mt-2">Same interface, different implementation</p>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="glass p-5 md:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h5 className="font-bold text-xs md:text-sm mb-1">Polymorphic Call</h5>
              <p className="text-[10px] md:text-xs text-slate-500">Trigger the speak() method on the base Animal interface</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: highlightedPart === 'speak' ? 1.05 : 1,
                backgroundColor: highlightedPart === 'speak' ? '#db2777' : '#ec4899'
              }}
              onClick={handleSpeak}
              onMouseEnter={() => setHighlightedPart('speak')}
              onMouseLeave={() => setHighlightedPart(null)}
              disabled={isSpeaking}
              className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-pink-500/20"
            >
              <Volume2 size={18} /> speak()
            </motion.button>
          </div>

          {/* Progress */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/5 p-5 md:p-6 rounded-3xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-xs md:text-sm">Learning Challenge</h5>
              <span className="text-[10px] md:text-xs font-mono text-slate-500">{completedAnimals.length}/3 Complete</span>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <ChallengeItem text="Observe Dog's speak() implementation" completed={completedAnimals.includes('dog')} />
              <ChallengeItem text="Observe Cat's speak() implementation" completed={completedAnimals.includes('cat')} />
              <ChallengeItem text="Observe Bird's speak() implementation" completed={completedAnimals.includes('bird')} />
            </div>

            {completedAnimals.length === 3 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full mt-6 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
              >
                <CheckCircle2 size={20} /> Complete Module
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function AnimalTab({ icon: Icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${active ? 'bg-pink-500 text-white border-pink-500 shadow-lg shadow-pink-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:border-pink-500/50'}`}
    >
      <Icon size={24} />
    </button>
  );
}

function ChallengeItem({ text, completed }: { text: string, completed: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${completed ? 'bg-green-500/5' : ''}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600'}`}>
        {completed && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-sm ${completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
        {text}
      </span>
    </div>
  );
}
