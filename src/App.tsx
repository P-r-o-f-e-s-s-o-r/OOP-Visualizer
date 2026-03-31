import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  ChevronRight, 
  Home, 
  Info,
  Shield,
  GitBranch,
  Layers,
  Cpu
} from 'lucide-react';
import { ConceptId, MODULES, UserProgress } from './types.ts';

// Modules
import EncapsulationModule from './components/EncapsulationModule.tsx';
import InheritanceModule from './components/InheritanceModule.tsx';
import PolymorphismModule from './components/PolymorphismModule.tsx';
import AbstractionModule from './components/AbstractionModule.tsx';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | ConceptId>('home');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('oop-progress') : null;
    return saved ? JSON.parse(saved) : { xp: 0, completedModules: [], badges: [] };
  });

  useEffect(() => {
    localStorage.setItem('oop-progress', JSON.stringify(progress));
  }, [progress]);

  const addXP = (amount: number, moduleId?: ConceptId) => {
    setProgress(prev => {
      const alreadyCompleted = moduleId && prev.completedModules.includes(moduleId);
      return {
        ...prev,
        xp: prev.xp + amount,
        completedModules: moduleId && !alreadyCompleted 
          ? [...prev.completedModules, moduleId] 
          : prev.completedModules,
        badges: moduleId && !alreadyCompleted && !prev.badges.includes(`${moduleId}-master`)
          ? [...prev.badges, `${moduleId}-master`]
          : prev.badges
      };
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onSelectModule={setCurrentView} progress={progress} />;
      case 'encapsulation':
        return <EncapsulationModule onBack={() => setCurrentView('home')} onComplete={() => addXP(100, 'encapsulation')} />;
      case 'inheritance':
        return <InheritanceModule onBack={() => setCurrentView('home')} onComplete={() => addXP(100, 'inheritance')} />;
      case 'polymorphism':
        return <PolymorphismModule onBack={() => setCurrentView('home')} onComplete={() => addXP(100, 'polymorphism')} />;
      case 'abstraction':
        return <AbstractionModule onBack={() => setCurrentView('home')} onComplete={() => addXP(100, 'abstraction')} />;
      default:
        return <HomeView onSelectModule={setCurrentView} progress={progress} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setCurrentView('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <Cpu className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tighter text-glow">OOP VISUALIZER</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <button onClick={() => setCurrentView('home')} className="hover:text-primary transition-colors">Home</button>
          </div>
          
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <Trophy className="text-yellow-400" size={18} />
            <span className="font-bold text-sm">{progress.xp} XP</span>
          </div>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© 2026 OOP Visualizer • Interactive Learning Platform</p>
      </footer>
    </div>
  );
}

function HomeView({ onSelectModule, progress }: { onSelectModule: (id: ConceptId) => void, progress: UserProgress }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto py-6 md:py-10 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest mb-2 md:4"
        >
          Interactive Learning Experience
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-tight"
        >
          Master OOP Concepts Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent animate-gradient-x">Visual Simulations</span>
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed px-2"
        >
          Don't just read about Object-Oriented Programming. See it in action, interact with objects, and play mini-games to solidify your understanding.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4 px-6 sm:px-0"
        >
          <button 
            onClick={() => onSelectModule('encapsulation')}
            className="btn-primary flex items-center justify-center gap-2 group"
          >
            Start Learning 
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={20} />
            </motion.span>
          </button>
          <button 
            onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-all font-semibold"
          >
            View Curriculum
          </button>
        </motion.div>
      </section>

      {/* Concept Grid */}
      <motion.section 
        id="curriculum"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0 scroll-mt-24"
      >
        {MODULES.map((module) => {
          const Icon = getIconForModule(module.id);
          const isCompleted = progress.completedModules.includes(module.id);
          
          return (
            <motion.div
              key={module.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectModule(module.id)}
              className="glass p-6 md:p-8 rounded-3xl cursor-pointer group hover:border-primary/50 transition-all relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-4">
                {isCompleted && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-green-500/20 text-green-400 p-1.5 rounded-full border border-green-500/30 shadow-lg shadow-green-500/10"
                  >
                    <Trophy size={14} />
                  </motion.div>
                )}
              </div>
              
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform ${getBgForModule(module.id)}`}>
                <Icon className="text-white" size={24} md:size={28} />
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{module.title}</h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                {module.description.substring(0, 100)}...
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{module.xp} XP</span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-around gap-8 md:gap-10 mx-4 md:mx-0"
      >
        <div className="text-center group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-3xl md:text-4xl font-black text-primary mb-2"
          >
            {progress.completedModules.length}/4
          </motion.div>
          <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Modules Complete</div>
        </div>
        <div className="w-full md:w-px h-px md:h-12 bg-white/10" />
        <div className="text-center group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-3xl md:text-4xl font-black text-secondary mb-2"
          >
            {progress.xp}
          </motion.div>
          <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Total XP Earned</div>
        </div>
        <div className="w-full md:w-px h-px md:h-12 bg-white/10" />
        <div className="text-center group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-3xl md:text-4xl font-black text-accent mb-2"
          >
            {progress.badges.length}
          </motion.div>
          <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-widest font-bold">Badges Collected</div>
        </div>
      </motion.section>
    </div>
  );
}

function getIconForModule(id: ConceptId) {
  switch (id) {
    case 'encapsulation': return Shield;
    case 'inheritance': return GitBranch;
    case 'polymorphism': return Layers;
    case 'abstraction': return Cpu;
    default: return BookOpen;
  }
}

function getBgForModule(id: ConceptId) {
  switch (id) {
    case 'encapsulation': return 'bg-blue-500 shadow-lg shadow-blue-500/20';
    case 'inheritance': return 'bg-purple-500 shadow-lg shadow-purple-500/20';
    case 'polymorphism': return 'bg-pink-500 shadow-lg shadow-pink-500/20';
    case 'abstraction': return 'bg-cyan-500 shadow-lg shadow-cyan-500/20';
    default: return 'bg-slate-500';
  }
}
