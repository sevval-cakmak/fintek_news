import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

// Haber duygu dağılımına göre piyasa duyarlılık endeksini gösteren yarım daire bileşeni
export default function SentimentGauge({ pozitif, negatif, notr }) {
  const toplam = pozitif + negatif + notr;
  
  // Basit duyarlılık skoru hesaplama formülü:
  // (Pozitif - Negatif) / Toplam oranını -1 ile +1 arasından 0 ile 100 arasına ölçekler
  const skor = toplam > 0 
    ? Math.round((((pozitif - negatif) / toplam) * 50) + 50) 
    : 50;

  // Skor aralığına göre renk ve durum açıklaması belirlenir
  let durumText = "Dengeli";
  let gaugeColor = "#38bdf8"; // fintech-accent (mavi)
  
  if (skor > 55) {
    durumText = "İyimser";
    gaugeColor = "#10b981"; // fintech-positive (yeşil)
  } else if (skor < 45) {
    durumText = "Temkinli";
    gaugeColor = "#ef4444"; // fintech-negative (kırmızı)
  }

  // SVG Yay (Arc) hesaplaması: Yarıçapı 50 olan yarım çemberin uzunluğu pi * r
  const radius = 50;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // ~157.08
  const strokeDashoffset = circumference - (skor / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full shadow-lg"
    >
      {/* Üst Kısım */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Piyasa Duyarlılık Endeksi
        </span>
        <BarChart3 size={16} className="text-fintech-accent" />
      </div>

      {/* Gösterge Alanı */}
      <div className="relative flex flex-col items-center justify-center my-2">
        <svg viewBox="0 0 120 75" className="w-full max-w-[180px] mx-auto">
          {/* Arka plan yayı (Gri) */}
          <path
            d="M 10 65 A 50 50 0 0 1 110 65"
            fill="none"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Aktif duyarlılık yayı (Renkli) */}
          <motion.path
            d="M 10 65 A 50 50 0 0 1 110 65"
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Yarım Dairenin Merkezindeki Skor Bilgisi */}
        <div className="absolute bottom-1 flex flex-col items-center text-center">
          <span className="text-2xl font-black text-white">{skor} <span className="text-xs text-slate-500">/ 100</span></span>
          <span 
            className="text-[11px] font-bold uppercase tracking-wider mt-0.5 px-2 py-0.5 rounded bg-slate-800 border border-slate-700/50"
            style={{ color: gaugeColor }}
          >
            {durumText}
          </span>
        </div>
      </div>

      {/* Alt Bölüm Açıklaması */}
      <div className="text-center mt-4">
        <p className="text-[11px] text-slate-500">
          Haber duyarlılık ağırlıklarına göre normalize edilmiş genel eğilim puanıdır.
        </p>
      </div>
    </motion.div>
  );
}
