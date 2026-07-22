import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, HelpCircle } from 'lucide-react';

// Uygulama altındaki yasal uyarı ve kaynak bilgilerini içeren bileşen
export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full mt-16 border-t border-slate-900 pt-8 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      {/* Sol Kısım: Yasal Yatırım Uyarısı */}
      <div className="flex items-start gap-3 max-w-xl">
        <AlertCircle size={16} className="text-slate-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[11px] leading-relaxed text-slate-500 font-semibold uppercase tracking-wider">
            Yasal Uyarı
          </p>
          <p className="text-xs leading-relaxed text-slate-500">
            Bu sistem yalnızca haber duygu analizi üretmektedir. Sunulan analizler, grafikler ve karar çıktısı (AL / BEKLE) hiçbir suretle yatırım tavsiyesi niteliği taşımaz. Yatırım kararlarınızı kendi analizlerinize dayanarak almalısınız.
          </p>
        </div>
      </div>

      {/* Sağ Kısım: Altyapı ve Veri Kaynağı Bilgileri */}
      <div className="flex flex-col gap-2 shrink-0 md:text-right">
        <div className="text-xs text-slate-400">
          Veri Kaynağı: <span className="text-slate-300 font-bold">NewsAPI</span>
        </div>
        <div className="text-xs text-slate-400">
          Analiz Motoru: <span className="text-slate-300 font-bold">FinBERT NLP</span>
        </div>
        <div className="text-[10px] text-slate-600 mt-1">
          © {new Date().getFullYear()} FinTech Analiz Paneli. Tüm Hakları Saklıdır.
        </div>
      </div>
    </motion.footer>
  );
}
