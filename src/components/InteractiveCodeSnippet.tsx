import React from 'react';
import { motion } from 'motion/react';

interface Props {
  code: string;
  interactiveParts: { id: string; label: string }[];
  onPartClick: (id: string) => void;
  highlightedId?: string | null;
}

export default function InteractiveCodeSnippet({ code, interactiveParts, onPartClick, highlightedId }: Props) {
  // Sort by length descending to avoid partial matches (e.g., "move()" vs "move")
  const sortedParts = [...interactiveParts].sort((a, b) => b.label.length - a.label.length);
  
  // Escape regex special characters in labels
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  const regex = new RegExp(`(${sortedParts.map(p => escapeRegExp(p.label)).join('|')})`, 'g');
  
  const parts = code.split(regex);

  return (
    <pre className="bg-black/50 p-4 md:p-6 rounded-2xl border border-white/5 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto leading-relaxed">
      {parts.map((part, index) => {
        const interactivePart = interactiveParts.find(p => p.label === part);
        if (interactivePart) {
          const isHighlighted = highlightedId === interactivePart.id;
          return (
            <motion.span
              key={index}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(236, 72, 153, 0.2)' }}
              onClick={() => onPartClick(interactivePart.id)}
              className={`cursor-pointer px-1 rounded transition-all duration-300 font-bold inline-block ${
                isHighlighted 
                  ? 'bg-pink-500/40 text-pink-300 ring-1 ring-pink-500/50 scale-110' 
                  : 'text-pink-400 hover:text-pink-300'
              }`}
            >
              {part}
            </motion.span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </pre>
  );
}
