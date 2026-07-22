import React from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';

// API isteğinde hata oluşması durumunda gösterilecek hata kartı bileşeni
export default function ErrorCard({ message = "Veriler alınamadı. Lütfen tekrar deneyin.", onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 rounded-2xl border-fintech-negative/20 bg-fintech-negative/5 shadow-glow-negative text-center max-w-md mx-auto my-10 flex flex-col items-center gap-4"
    >
      {/* Hata Simgesi */}
      <div className="w-12 h-12 rounded-full bg-fintech-negative/10 flex items-center justify-center text-fintech-negative border border-fintech-negative/20">
        <AlertOctagon size={24} />
      </div>

      {/* Hata Mesajı */}
      <div>
        <h4 className="text-base font-bold text-white mb-1">Veri Bağlantı Hatası</h4>
        <p className="text-sm text-slate-400">
          {message}
        </p>
      </div>

      {/* Yeniden Dene Butonu */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-fintech-negative/10 text-fintech-negative hover:bg-fintech-negative/20 border border-fintech-negative/20 transition-all"
        >
          <RefreshCw size={14} />
          <span>Tekrar Dene</span>
        </button>
      )}
    </motion.div>
  );
}
