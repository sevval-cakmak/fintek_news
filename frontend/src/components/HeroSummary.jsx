import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle, Percent } from 'lucide-react';

// Arama sonuçları ekranındaki en üst devasa özet alanı
export default function HeroSummary({ hisse, tavsiye, pozitifOrani }) {
  const isBuy = tavsiye.includes("AL");
  
  // Pozitif haber oranına göre piyasa görünümü belirlenir
  let marketOutlook = "Nötr / Dengeli";
  let outlookColor = "text-slate-400 border-slate-700/50 bg-slate-500/5";
  
  if (pozitifOrani > 55) {
    marketOutlook = "Olumlu Görünüm";
    outlookColor = "text-fintech-positive border-fintech-positive/20 bg-fintech-positive/5 shadow-glow-positive";
  } else if (pozitifOrani < 45) {
    marketOutlook = "Temkinli / Zayıf Görünüm";
    outlookColor = "text-fintech-negative border-fintech-negative/20 bg-fintech-negative/5 shadow-glow-negative";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass-panel p-6 md:p-8 rounded-3xl mb-8 relative overflow-hidden transition-all duration-300 border-l-4 ${
        isBuy ? 'border-l-fintech-positive shadow-glow-positive' : 'border-l-fintech-negative shadow-glow-negative'
      }`}
    >
      {/* Arka plan ışık efektleri */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-radial-gradient from-white/5 to-transparent pointer-events-none rounded-full blur-3xl"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Sol Sütun: Hisse Adı ve Piyasa Görünümü */}
        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Analiz Edilen Hisse</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
              {hisse.toUpperCase()}
            </h2>
            <p className="text-xs text-slate-500 mt-1">Son haber akışına göre oluşturulan genel veri analizi</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-slate-400">Genel Piyasa Görünümü:</span>
            <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${outlookColor}`}>
              {marketOutlook}
            </div>
          </div>
        </div>

        {/* Sağ Sütun: Tavsiye ve Pozitif Haber Oranı */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6">
          {/* Yatırım Önerisi Bölümü */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Analiz Tavsiyesi</span>
            <div className="flex items-center gap-2 mt-2">
              {isBuy ? (
                <TrendingUp className="text-fintech-positive w-6 h-6" />
              ) : (
                <TrendingDown className="text-fintech-negative w-6 h-6" />
              )}
              <span className={`text-xl font-bold ${isBuy ? 'text-fintech-positive' : 'text-fintech-negative'}`}>
                {isBuy ? 'AL' : 'SATMA / BEKLE'}
              </span>
            </div>
          </div>

          {/* Pozitif Haber Oranı Bölümü */}
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-medium">Pozitif Haber Oranı</span>
            <div className="flex items-center gap-1 mt-2">
              <Percent size={18} className="text-fintech-accent" />
              <span className="text-2xl font-black text-white">
                {pozitifOrani}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
