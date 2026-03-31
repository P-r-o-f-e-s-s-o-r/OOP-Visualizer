import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Cpu, Coffee, Info, Eye, EyeOff, Play, CheckCircle2, Settings, Droplets, Flame } from 'lucide-react';
import { MODULES } from '../types.ts';
import InteractiveCodeSnippet from './InteractiveCodeSnippet';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

export default function AbstractionModule({ onBack, onComplete }: Props) {
  const module = MODULES.find(m => m.id === 'abstraction')!;
  const [isBrewing, setIsBrewing] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [brewStep, setBrewStep] = useState(0);
  const [completedBrews, setCompletedBrews] = useState(0);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);

  // Clear highlight after delay
  useEffect(() => {
    if (highlightedPart && !isBrewing) {
      const timer = setTimeout(() => setHighlightedPart(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedPart, isBrewing]);

  const handleBrew = async () => {
    if (isBrewing) return;
    
    setIsBrewing(true);
    setHighlightedPart('brew');
    
    setBrewStep(1); // Heating water
    setHighlightedPart('heatWater');
    await new Promise(r => setTimeout(r, 1500));
    
    setBrewStep(2); // Grinding beans
    setHighlightedPart('grindBeans');
    await new Promise(r => setTimeout(r, 1500));
    
    setBrewStep(3); // Brewing
    setHighlightedPart('extractCoffee');
    await new Promise(r => setTimeout(r, 1500));
    
    setBrewStep(0);
    setIsBrewing(false);
    setHighlightedPart(null);
    setCompletedBrews(prev => prev + 1);
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
        <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs md:text-sm font-bold">
          <Cpu size={18} /> ABSTRACTION
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
            className="glass p-5 md:p-6 rounded-2xl border-l-4 border-cyan-500"
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Info size={18} className="text-cyan-500" /> Real-World Analogy
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
                className="text-[10px] md:text-xs font-bold text-cyan-500 hover:underline flex items-center gap-1"
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            
            <div className="flex flex-col items-center gap-6 md:gap-10 w-full z-10">
              {/* Coffee Machine Visual */}
              <div className={`relative w-40 h-52 md:w-48 md:h-64 bg-slate-800 rounded-3xl border-4 p-4 md:p-6 flex flex-col items-center justify-between shadow-2xl transition-colors duration-500 ${highlightedPart === 'brew' ? 'border-cyan-500' : 'border-slate-700'}`}>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: isBrewing ? '100%' : '0%' }}
                    transition={{ duration: 4.5, ease: 'linear' }}
                    className="h-full bg-cyan-500"
                  />
                </div>

                <div className="flex gap-2 md:gap-4">
                  <StatusIcon icon={Flame} label="Heat" active={brewStep === 1} highlighted={highlightedPart === 'heatWater'} />
                  <StatusIcon icon={Settings} label="Grind" active={brewStep === 2} highlighted={highlightedPart === 'grindBeans'} />
                  <StatusIcon icon={Droplets} label="Extract" active={brewStep === 3} highlighted={highlightedPart === 'extractCoffee'} />
                </div>

                <motion.div
                  animate={{ 
                    scale: isBrewing ? [1, 1.05, 1] : 1,
                    rotate: isBrewing ? [0, 1, -1, 0] : 0,
                    borderColor: highlightedPart === 'brew' ? '#06b6d4' : isBrewing ? '#06b6d4' : '#475569'
                  }}
                  transition={{ duration: 0.5, repeat: isBrewing ? Infinity : 0 }}
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${isBrewing ? 'bg-cyan-500/20 border-cyan-500' : 'bg-slate-700 border-slate-600'}`}
                >
                  <Coffee size={32} md:size={40} className={isBrewing || highlightedPart === 'brew' ? 'text-cyan-400' : 'text-slate-500'} />
                </motion.div>

                <div className={`w-full h-10 md:h-12 bg-slate-900 rounded-xl border flex items-center justify-center transition-colors ${highlightedPart === 'brew' ? 'border-cyan-500/50' : 'border-white/5'}`}>
                  <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${highlightedPart === 'brew' ? 'text-cyan-400' : 'text-cyan-500'}`}>
                    {brewStep === 0 ? 'Ready' : brewStep === 1 ? 'Heating...' : brewStep === 2 ? 'Grinding...' : 'Brewing...'}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h4 className={`text-lg md:text-xl font-bold uppercase tracking-widest transition-colors ${highlightedPart === 'brew' ? 'text-cyan-500' : 'text-glow'}`}>brew()</h4>
                <p className="text-slate-500 text-[10px] md:text-sm mt-2">Complex internal logic hidden behind a simple button</p>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="glass p-5 md:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h5 className="font-bold text-xs md:text-sm mb-1">Abstract Interface</h5>
              <p className="text-[10px] md:text-xs text-slate-500">The user only interacts with the public brew() method</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: highlightedPart === 'brew' ? 1.05 : 1,
                backgroundColor: highlightedPart === 'brew' ? '#0891b2' : '#06b6d4'
              }}
              onClick={handleBrew}
              onMouseEnter={() => setHighlightedPart('brew')}
              onMouseLeave={() => setHighlightedPart(null)}
              disabled={isBrewing}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-cyan-500/20"
            >
              <Play size={18} /> brew()
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
              <span className="text-[10px] md:text-xs font-mono text-slate-500">{completedBrews >= 1 ? 1 : 0}/1 Complete</span>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <ChallengeItem text="Trigger the brew() method" completed={completedBrews >= 1} />
              <ChallengeItem text="Observe hidden internal steps" completed={completedBrews >= 1} />
            </div>

            {completedBrews >= 1 && (
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

function StatusIcon({ icon: Icon, active, highlighted, label }: { icon: any, active: boolean, highlighted?: boolean, label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border transition-all ${active || highlighted ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20' : 'bg-white/5 border-white/10 text-slate-600'}`}>
        <Icon size={16} md:size={20} />
      </div>
      {label && <span className={`text-[8px] md:text-[10px] uppercase tracking-tighter font-bold transition-colors ${active || highlighted ? 'text-cyan-400' : 'text-slate-500'}`}>{label}</span>}
    </div>
  );
}

function ChallengeItem({ text, completed }: { text: string, completed: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${completed ? 'bg-green-500/5' : ''}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600'}`}>
        {completed && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-xs md:text-sm ${completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
        {text}
      </span>
    </div>
  );
}
