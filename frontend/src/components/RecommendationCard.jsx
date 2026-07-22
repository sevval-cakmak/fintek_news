import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react';

// Yatırım analiz tavsiyesini gösteren ana kart bileşeni
export default function RecommendationCard({ tavsiye }) {
  const isBuy = tavsiye.includes("AL");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass-panel p-6 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 ${
        isBuy 
          ? 'shadow-glow-positive border-fintech-positive/10 bg-fintech-positive/[0.02]' 
          : 'shadow-glow-negative border-fintech-negative/10 bg-fintech-negative/[0.02]'
      }`}
    >
      {/* Üst Kısım: Başlık ve İkon */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Yapay Zeka Kararı
        </span>
        <ShieldCheck size={16} className={isBuy ? 'text-fintech-positive' : 'text-fintech-negative'} />
      </div>

      {/* Orta Kısım: Tavsiye Metni ve Trend Simgesi */}
      <div className="py-8 flex flex-col items-center justify-center text-center">
        {isBuy ? (
          <div className="w-16 h-16 rounded-full bg-fintech-positive/10 flex items-center justify-center mb-4 text-fintech-positive border border-fintech-positive/20">
            <TrendingUp size={32} />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-fintech-negative/10 flex items-center justify-center mb-4 text-fintech-negative border border-fintech-negative/20">
            <TrendingDown size={32} />
          </div>
        )}

        <h3 className="text-sm text-slate-400 font-medium">Haber Akışı Değerlendirmesi</h3>
        <span className={`text-3xl font-black tracking-wide mt-2 ${
          isBuy ? 'text-fintech-positive' : 'text-fintech-negative'
        }`}>
          {isBuy ? 'AL 🟢' : 'SATMA / BEKLE 🔴'}
        </span>
      </div>

      {/* Alt Açıklama Metni */}
      <div className="text-center">
        <p className="text-[11px] text-slate-500">
          FinBERT AI tarafından duygu ağırlık oranları hesaplanarak oluşturulan teknik tavsiyedir.
        </p>
      </div>
    </motion.div>
  );
}
