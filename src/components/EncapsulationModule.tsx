import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Unlock, ShieldCheck, Eye, EyeOff, Play, RotateCcw, CheckCircle2, Info } from 'lucide-react';
import { MODULES } from '../types.ts';
import InteractiveCodeSnippet from './InteractiveCodeSnippet';

interface Props {
  onBack: () => void;
  onComplete: () => void;
}

export default function EncapsulationModule({ onBack, onComplete }: Props) {
  const module = MODULES.find(m => m.id === 'encapsulation')!;
  const [balance, setBalance] = useState(100);
  const [isLocked, setIsLocked] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [gameStep, setGameStep] = useState(0);
  const [inputAmount, setInputAmount] = useState('');
  const [message, setMessage] = useState('The vault is locked. Access data via methods.');
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);

  // Clear highlight after delay
  useEffect(() => {
    if (highlightedPart) {
      const timer = setTimeout(() => setHighlightedPart(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedPart]);

  const handleDeposit = () => {
    const amount = parseInt(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid positive amount.');
      return;
    }
    
    setBalance(prev => prev + amount);
    setInputAmount('');
    setMessage(`Successfully deposited $${amount} via public method deposit().`);
    setHighlightedPart('deposit');
    if (gameStep === 1) setGameStep(2);
  };

  const handleDirectAccess = () => {
    setMessage('ERROR: Cannot access private variable "balance" directly!');
    setHighlightedPart('balance');
    if (gameStep === 0) setGameStep(1);
  };

  const handleGetBalance = () => {
    setIsLocked(!isLocked);
    if (isLocked) {
      setHighlightedPart('getBalance');
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
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs md:text-sm font-bold">
          <ShieldCheck size={18} /> ENCAPSULATION
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
            className="glass p-5 md:p-6 rounded-2xl border-l-4 border-blue-500"
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Real-World Analogy
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
                className="text-[10px] md:text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-blue-500/10 blur-[80px] md:blur-[100px] rounded-full" />
            
            <motion.div
              animate={{ 
                scale: isLocked ? 1 : 1.05,
                rotateY: isLocked ? 0 : 10,
                boxShadow: isLocked ? "0 0 0 rgba(14, 165, 233, 0)" : "0 0 40px rgba(14, 165, 233, 0.2)",
                borderColor: highlightedPart === 'balance' ? '#ef4444' : isLocked ? '#334155' : '#3b82f6'
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              onClick={() => setHighlightedPart('balance')}
              className={`w-36 h-36 md:w-48 md:h-48 rounded-3xl flex items-center justify-center border-4 transition-colors duration-500 z-10 cursor-pointer ${isLocked ? 'bg-slate-800/50 border-slate-700' : 'bg-blue-500/20 border-blue-500 shadow-2xl shadow-blue-500/20'}`}
            >
              {isLocked ? (
                <Lock size={60} md:size={80} className={highlightedPart === 'balance' ? 'text-red-500' : 'text-slate-600'} />
              ) : (
                <Unlock size={60} md:size={80} className="text-blue-400" />
              )}
            </motion.div>

            <div className="mt-8 md:mt-10 text-center space-y-2 z-10">
              <div className={`text-[10px] md:text-sm font-bold uppercase tracking-widest transition-colors ${highlightedPart === 'balance' ? 'text-red-500' : 'text-slate-500'}`}>Private Balance</div>
              <motion.div 
                key={balance}
                initial={{ scale: 1.2, color: '#0ea5e9' }}
                animate={{ 
                  scale: highlightedPart === 'balance' ? 1.1 : 1, 
                  color: highlightedPart === 'balance' ? '#ef4444' : '#e2e8f0' 
                }}
                className="text-4xl md:text-5xl font-black text-glow"
              >
                ${isLocked ? '???' : balance}
              </motion.div>
            </div>

            <motion.div 
              key={message}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 md:mt-8 px-4 md:px-6 py-2 md:py-3 bg-black/30 rounded-xl border border-white/5 text-[10px] md:text-sm font-medium text-blue-300 max-w-xs text-center z-10"
            >
              {message}
            </motion.div>
          </motion.div>

          {/* Controls */}
          <div className="glass p-5 md:p-6 rounded-3xl space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
              <input 
                type="number" 
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="Amount to deposit..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  scale: highlightedPart === 'deposit' ? 1.05 : 1,
                  backgroundColor: highlightedPart === 'deposit' ? '#2563eb' : '#3b82f6'
                }}
                onClick={handleDeposit}
                onMouseEnter={() => setHighlightedPart('deposit')}
                onMouseLeave={() => setHighlightedPart(null)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
              >
                <Play size={18} /> deposit()
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  borderColor: highlightedPart === 'balance' ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'
                }}
                onClick={handleDirectAccess}
                onMouseEnter={() => setHighlightedPart('balance')}
                onMouseLeave={() => setHighlightedPart(null)}
                className="px-4 py-3 rounded-xl border border-red-500/30 text-red-400 text-[10px] md:text-sm font-bold hover:bg-red-500/10 transition-all"
              >
                Direct Access: balance = 500
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={{ 
                  scale: highlightedPart === 'getBalance' ? 1.05 : 1,
                  borderColor: highlightedPart === 'getBalance' ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)'
                }}
                onClick={handleGetBalance}
                onMouseEnter={() => setHighlightedPart('getBalance')}
                onMouseLeave={() => setHighlightedPart(null)}
                className="px-4 py-3 rounded-xl border border-blue-500/30 text-blue-400 text-[10px] md:text-sm font-bold hover:bg-blue-500/10 transition-all"
              >
                {isLocked ? 'Call getBalance()' : 'Hide Balance'}
              </motion.button>
            </div>
          </div>

          {/* Progress / Game Goal */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/5 p-5 md:p-6 rounded-3xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-bold text-xs md:text-sm">Learning Challenge</h5>
              <span className="text-[10px] md:text-xs font-mono text-slate-500">Step {gameStep + 1}/3</span>
            </div>
            
            <div className="space-y-2 md:space-y-3">
              <ChallengeItem 
                text="Try to access balance directly" 
                active={gameStep === 0} 
                completed={gameStep > 0} 
              />
              <ChallengeItem 
                text="Use deposit() method to add funds" 
                active={gameStep === 1} 
                completed={gameStep > 1} 
              />
              <ChallengeItem 
                text="Use getBalance() to view the result" 
                active={gameStep === 2} 
                completed={gameStep > 2 || !isLocked} 
              />
            </div>

            {((gameStep >= 2 && !isLocked) || gameStep > 2) && (
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

function ChallengeItem({ text, active, completed }: { text: string, active: boolean, completed: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-blue-500/10 border border-blue-500/20' : ''}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-600'}`}>
        {completed && <CheckCircle2 size={14} />}
      </div>
      <span className={`text-sm ${completed ? 'text-slate-500 line-through' : active ? 'text-white font-medium' : 'text-slate-400'}`}>
        {text}
      </span>
    </div>
  );
}
