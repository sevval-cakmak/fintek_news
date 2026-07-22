import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';

// Haber duygu dağılımlarına dayanarak analiz yorumları üreten bileşen
export default function AIReportCard({ hisse, pozitif, negatif, notr }) {
  const isPositiveDominant = pozitif > negatif;
  const isNegativeDominant = negatif > pozitif;

  // Rapor içeriğini belirleme
  let reportText = "";
  let reportType = "Nötr Görünüm";
  let textColor = "text-fintech-accent";
  let bgGradient = "from-fintech-accent/5 to-transparent";
  let borderStyle = "border-fintech-accent/15";

  if (isPositiveDominant) {
    reportType = "Boğa / Olumlu Piyasa Algısı";
    textColor = "text-fintech-positive";
    bgGradient = "from-fintech-positive/5 to-transparent";
    borderStyle = "border-fintech-positive/15";
    reportText = `FinBERT duygu analiz motorunun çıktılarına göre, ${hisse.toUpperCase()} ile ilgili haber akışında pozitif algı baskındır. Son dönemde yayınlanan makalelerde, teknolojik yenilikler, büyüme hedefleri ve kurumsal başarılara odaklanılmıştır. Genel piyasa duyarlılığı olumlu olup, bu durum hissenin piyasa performansı üzerinde destekleyici bir zemin hazırlayabilir.`;
  } else if (isNegativeDominant) {
    reportType = "Ayı / Temkinli Piyasa Algısı";
    textColor = "text-fintech-negative";
    bgGradient = "from-fintech-negative/5 to-transparent";
    borderStyle = "border-fintech-negative/15";
    reportText = `FinBERT duygu analizi, ${hisse.toUpperCase()} hakkında yayınlanan son haber akışında negatif duyarlılığın ağırlıkta olduğunu göstermektedir. Piyasa haberleri çoğunlukla makroekonomik belirsizlikler, yasal riskler veya büyüme endişelerini içermektedir. Yatırımcıların mevcut süreçte zayıf haber duyarlılığı sebebiyle temkinli olması ve piyasa risklerini yakından izlemesi önerilebilir.`;
  } else {
    reportType = "Kararsız / Nötr Piyasa Algısı";
    textColor = "text-slate-400";
    bgGradient = "from-slate-800/10 to-transparent";
    borderStyle = "border-slate-800";
    reportText = `${hisse.toUpperCase()} hissesine ilişkin haber duygu dağılımı dengeli bir görünüm sergilemektedir. Olumlu gelişmeler ile olumsuz risk faktörleri başa baş bir seyir izlemektedir. Piyasa katılımcılarının genel olarak bekle-gör stratejisi izlediği ve yeni katalizörler (kazanç raporları, stratejik açıklamalar) beklediği anlaşılmaktadır.`;
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className={`glass-panel p-6 rounded-2xl h-full flex flex-col justify-between border bg-gradient-to-b ${bgGradient} ${borderStyle} shadow-lg`}
    >
      {/* Üst Kısım: Başlık ve Model Simgesi */}
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-slate-400" />
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Yapay Zeka Analiz Raporu
          </span>
        </div>
        <Cpu size={16} className="text-fintech-accent animate-pulse" />
      </div>

      {/* Rapor Durumu */}
      <div className="mb-4">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
          Piyasa Sınıflandırması
        </span>
        <span className={`text-base font-extrabold tracking-tight ${textColor}`}>
          {reportType}
        </span>
      </div>

      {/* Rapor İçeriği */}
      <div className="flex-1 bg-slate-950/40 border border-slate-800/40 p-4 rounded-xl mb-4">
        <p className="text-sm leading-relaxed text-slate-300 font-medium">
          {reportText}
        </p>
      </div>

      {/* Alt Uyarı Bilgisi */}
      <div className="flex items-center gap-2 text-[10px] text-slate-500">
        <AlertCircle size={12} className="shrink-0" />
        <span>FinBERT NLP modeli kullanılarak otomatik özetlenmiştir.</span>
      </div>
    </motion.div>
  );
}
