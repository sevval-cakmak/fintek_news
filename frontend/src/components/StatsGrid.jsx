import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Smile, Frown, Sparkles } from 'lucide-react';

// İstatistikleri listeleyen ızgara bileşeni
export default function StatsGrid({ toplam, pozitif, negatif, notr }) {
  // Kart verilerinin yapısı
  const stats = [
    {
      id: 'toplam',
      title: 'Toplam Haber',
      value: toplam,
      icon: Newspaper,
      color: 'text-fintech-accent',
      bgColor: 'bg-fintech-accent/5',
      borderColor: 'border-fintech-accent/10',
      desc: 'Analiz edilen toplam makale',
    },
    {
      id: 'pozitif',
      title: 'Pozitif Haber',
      value: pozitif,
      icon: Smile,
      color: 'text-fintech-positive',
      bgColor: 'bg-fintech-positive/5',
      borderColor: 'border-fintech-positive/10',
      desc: 'Olumlu piyasa algısı',
    },
    {
      id: 'negatif',
      title: 'Negatif Haber',
      value: negatif,
      icon: Frown,
      color: 'text-fintech-negative',
      bgColor: 'bg-fintech-negative/5',
      borderColor: 'border-fintech-negative/10',
      desc: 'Olumsuz risk faktörleri',
    },
    {
      id: 'notr',
      title: 'Nötr Haber',
      value: notr,
      icon: Sparkles,
      color: 'text-fintech-neutral',
      bgColor: 'bg-fintech-neutral/5',
      borderColor: 'border-fintech-neutral/10',
      desc: 'Piyasa duyarlılığı bulunmayan',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <motion.div
            key={item.id}
            whileHover={{ y: -4 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`glass-panel p-5 rounded-2xl border ${item.borderColor} ${item.bgColor} shadow-sm flex flex-col justify-between`}
          >
            {/* Üst Kısım: Başlık ve İkon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400 tracking-wide">
                {item.title}
              </span>
              <div className={`p-1.5 rounded-lg ${item.color} bg-slate-900/40`}>
                <IconComponent size={15} />
              </div>
            </div>

            {/* Orta Kısım: Büyük Değer */}
            <div className="my-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {item.value}
              </span>
            </div>

            {/* Alt Kısım: Açıklama */}
            <div>
              <p className="text-[10px] text-slate-500">
                {item.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
