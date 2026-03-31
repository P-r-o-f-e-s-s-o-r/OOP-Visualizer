import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, GitBranch, Car, Zap, Truck, Info, Eye, EyeOff, Play, CheckCircle2, ChevronRight } from 'lucide-react';
import { MODULES } from '../types.ts';
import InteractiveCodeSnippet from './InteractiveCodeSnippet';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

type VehicleType = 'vehicle' | 'car' | 'electric';

export default function InheritanceModule({ onBack, onComplete }: Props) {
  const module = MODULES.find(m => m.id === 'inheritance')!;
  const [selectedType, setSelectedType] = useState<VehicleType>('vehicle');
  const [showCode, setShowCode] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<VehicleType[]>([]);
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);

  // Clear highlight after delay
  useEffect(() => {
    if (highlightedPart) {
      const timer = setTimeout(() => setHighlightedPart(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedPart]);

  const handleMove = () => {
    setIsMoving(true);
    setHighlightedPart('move');
    setTimeout(() => setIsMoving(false), 2000);
    if (!completedSteps.includes(selectedType)) {
      setCompletedSteps(prev => [...prev, selectedType]);
    }
  };

  const properties = {
    vehicle: ['speed', 'move()'],
    car: ['speed', 'move()', 'fuelLevel', 'honk()'],
    electric: ['speed', 'move() (overridden)', 'fuelLevel', 'honk()', 'batteryLevel', 'charge()']
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
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-xs md:text-sm font-bold">
          <GitBranch size={18} /> INHERITANCE
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
            className="glass p-5 md:p-6 rounded-2xl border-l-4 border-purple-500"
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Info size={18} className="text-purple-500" /> Real-World Analogy
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
                className="text-[10px] md:text-xs font-bold text-purple-500 hover:underline flex items-center gap-1"
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
            className="glass p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-purple-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            
            <div className="flex flex-col items-center gap-6 md:gap-8 w-full max-w-md z-10">
              {/* Hierarchy Visualization */}
              <div className="flex flex-col items-center gap-2 md:gap-4 w-full">
                <HierarchyNode 
                  label="Vehicle (Parent)" 
                  active={selectedType === 'vehicle'} 
                  onClick={() => setSelectedType('vehicle')}
                />
                <motion.div 
                  animate={{ height: selectedType === 'vehicle' ? 40 : 32 }}
                  className="w-px bg-purple-500/30" 
                />
                <HierarchyNode 
                  label="Car (Child of Vehicle)" 
                  active={selectedType === 'car'} 
                  onClick={() => setSelectedType('car')}
                />
                <motion.div 
                  animate={{ height: selectedType === 'car' ? 40 : 32 }}
                  className="w-px bg-purple-500/30" 
                />
                <HierarchyNode 
                  label="ElectricCar (Child of Car)" 
                  active={selectedType === 'electric'} 
                  onClick={() => setSelectedType('electric')}
                />
              </div>

              {/* Visual Representation */}
              <motion.div
                key={selectedType}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: isMoving ? [0, 50, -50, 0] : 0,
                  rotate: isMoving ? [0, 2, -2, 0] : 0,
                  borderColor: highlightedPart === 'move' ? '#a855f7' : isMoving ? '#a855f7' : '#334155'
                }}
                transition={{ 
                  scale: { type: 'spring', stiffness: 200 },
                  x: { duration: 2, repeat: isMoving ? Infinity : 0 }
                }}
                className={`w-28 h-28 md:w-32 md:h-32 rounded-3xl flex items-center justify-center border-4 transition-all duration-500 ${isMoving ? 'bg-purple-500/20 border-purple-500 shadow-2xl shadow-purple-500/20' : 'bg-slate-800/50 border-slate-700'}`}
              >
                {selectedType === 'vehicle' && <Truck size={50} md:size={60} className="text-slate-400" />}
                {selectedType === 'car' && <Car size={50} md:size={60} className="text-purple-400" />}
                {selectedType === 'electric' && <Zap size={50} md:size={60} className="text-yellow-400" />}
              </motion.div>

              <div className="text-center">
                <h4 className="text-lg md:text-xl font-bold capitalize">{selectedType} Object</h4>
                <div className="flex flex-wrap justify-center gap-1 md:gap-2 mt-3">
                  {properties[selectedType].map(prop => (
                    <motion.span 
                      key={prop}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ 
                        scale: (highlightedPart === 'speed' && prop === 'speed') || (highlightedPart === 'move' && prop.includes('move')) ? 1.1 : 1,
                        opacity: 1,
                        backgroundColor: (highlightedPart === 'speed' && prop === 'speed') || (highlightedPart === 'move' && prop.includes('move')) ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        borderColor: (highlightedPart === 'speed' && prop === 'speed') || (highlightedPart === 'move' && prop.includes('move')) ? '#a855f7' : 'rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={() => {
                        if (prop === 'speed') setHighlightedPart('speed');
                        if (prop.includes('move')) setHighlightedPart('move');
                      }}
                      onMouseLeave={() => setHighlightedPart(null)}
                      className="px-2 md:px-3 py-1 bg-white/5 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-purple-300 border border-white/5 cursor-default"
                    >
                      {prop}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Controls */}
          <div className="glass p-5 md:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h5 className="font-bold text-xs md:text-sm mb-1">Method Execution</h5>
              <p className="text-[10px] md:text-xs text-slate-500">Trigger inherited or overridden methods</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: highlightedPart === 'move' ? 1.05 : 1,
                backgroundColor: highlightedPart === 'move' ? '#9333ea' : '#a855f7'
              }}
              onClick={handleMove}
              onMouseEnter={() => setHighlightedPart('move')}
              onMouseLeave={() => setHighlightedPart(null)}
              disabled={isMoving}
              className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-purple-500/20"
            >
              <Play size={18} /> move()
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
              <span className="text-[10px] md:text-xs font-mono text-slate-500">{completedSteps.length}/3 Complete</span>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <ChallengeItem text="Test base Vehicle move()" completed={completedSteps.includes('vehicle')} />
              <ChallengeItem text="Test Car inheritance" completed={completedSteps.includes('car')} />
              <ChallengeItem text="Test ElectricCar override" completed={completedSteps.includes('electric')} />
            </div>

            {completedSteps.length === 3 && (
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

function HierarchyNode({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-xl border transition-all w-full text-sm font-bold ${active ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/20' : 'bg-white/5 border-white/10 text-slate-400 hover:border-purple-500/50'}`}
    >
      {label}
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
