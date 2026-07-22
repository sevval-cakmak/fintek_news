import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

// Üst bilgi ve başlık alanını içeren bileşen
export default function Header() {
  return (
    <motion.header 
      // Giriş animasyonu: Sayfa yüklendiğinde hafifçe belirir ve yukarıdan aşağıya kayar
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6 mb-8 gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
          Borsa Haber Duygu Analizi
        </h1>
        <p className="mt-2 text-sm text-slate-400 max-w-xl">
          FinBERT destekli yapay zeka ile finans haberlerini analiz ederek piyasa duyarlılığını görüntüleyin.
        </p>
      </div>

      {/* Sağ üst köşedeki premium yapay zeka etiketi */}
      <div className="flex items-center self-start md:self-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-fintech-accent bg-fintech-accent/10 border border-fintech-accent/20 shadow-glow-accent">
          <Cpu size={14} className="animate-pulse" />
          <span>Powered by FinBERT AI</span>
        </div>
      </div>
    </motion.header>
  );
}
