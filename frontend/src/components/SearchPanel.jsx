import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// Kullanıcının hisse adı arayabileceği panel bileşeni
export default function SearchPanel({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  // Form gönderildiğinde aramayı tetikleyen fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="w-full">
        {/* Cam morfolojisi (glassmorphism) stili arama kartı */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-center shadow-lg">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
              placeholder="Hisse adı girin (Örn: Apple, Tesla, Nvidia, Microsoft...)"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-slate-500 glass-input text-base"
            />
          </div>
          
          {/* Hareketli Analiz Et Düğmesi */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: '#0ea5e9' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-fintech-accent border border-fintech-accent/30 shadow-glow-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isLoading ? 'Analiz Ediliyor...' : 'Analiz Et'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
