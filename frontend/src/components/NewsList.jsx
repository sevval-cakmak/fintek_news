import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

// Haber duygu etiketini biçimlendiren yardımcı fonksiyon
const getSentimentBadge = (duygu) => {
  switch (duygu.toLowerCase()) {
    case 'positive':
      return {
        label: 'Pozitif',
        styles: 'bg-fintech-positive/10 text-fintech-positive border-fintech-positive/20 shadow-glow-positive',
        icon: CheckCircle2,
      };
    case 'negative':
      return {
        label: 'Negatif',
        styles: 'bg-fintech-negative/10 text-fintech-negative border-fintech-negative/20 shadow-glow-negative',
        icon: AlertTriangle,
      };
    default:
      return {
        label: 'Nötr',
        styles: 'bg-slate-800 text-slate-400 border-slate-700/50',
        icon: HelpCircle,
      };
  }
};

// Haber akışını premium kartlarla listeleyen bileşen
export default function NewsList({ haberler }) {
  if (!haberler || haberler.length === 0) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center text-slate-500">
        Bu hisse senedi hakkında analiz edilecek güncel bir haber bulunamadı.
      </div>
    );
  }

  // Framer Motion ile sıralı (stagger) animasyon için liste varyantları
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-base font-bold text-white tracking-wide">Son Haber Akışı</h3>
        <span className="text-xs text-slate-500">{haberler.length} Haber listelendi</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {haberler.map((news, index) => {
          const badge = getSentimentBadge(news.duygu);
          const BadgeIcon = badge.icon;
          const güvenSkoru = news.skor || 50;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="glass-panel p-5 rounded-2xl flex flex-col justify-between border border-slate-800 hover:border-slate-700/80 transition-all duration-200"
            >
              {/* Haber Üst Bilgisi: Duygu Etiketi */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border flex items-center gap-1 ${badge.styles}`}>
                  <BadgeIcon size={12} />
                  {badge.label}
                </span>
                
                {/* Güven Skoru Metni */}
                <div className="text-[10px] text-slate-400 font-semibold">
                  Güven Skoru: <span className="text-white font-extrabold">{güvenSkoru}%</span>
                </div>
              </div>

              {/* Haber Başlığı */}
              <div className="flex-1 mb-4">
                <h4 className="text-sm font-semibold text-slate-100 hover:text-fintech-accent transition-colors line-clamp-3 leading-snug">
                  {news.baslik}
                </h4>
              </div>

              {/* Güven Skoru İlerleme Çubuğu */}
              <div className="w-full space-y-1 mb-4">
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${güvenSkoru}%` }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      news.duygu.toLowerCase() === 'positive'
                        ? 'bg-fintech-positive'
                        : news.duygu.toLowerCase() === 'negative'
                        ? 'bg-fintech-negative'
                        : 'bg-fintech-accent'
                    }`}
                  />
                </div>
              </div>

              {/* Buton: Orijinal Habere Git */}
              <div className="flex justify-end pt-2 border-t border-slate-900/50">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-fintech-accent transition-colors py-1 px-2 rounded-lg hover:bg-slate-900/40 border border-transparent hover:border-slate-800"
                >
                  <span>Habere Git</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
