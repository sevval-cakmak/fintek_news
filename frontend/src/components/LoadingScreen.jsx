import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const MESSAGES = [
  "Haberler toplanıyor...",
  "FinBERT modeli analiz yapıyor...",
  "Piyasa duyarlılığı hesaplanıyor..."
];

// Yükleme (loading) durumunda gösterilecek bekleme ekranı bileşeni
export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  // Mesajları belirli aralıklarla döngüsel olarak değiştiren etki kancası
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Animasyonlu spinner kapsayıcısı */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex items-center justify-center w-24 h-24 rounded-full border border-slate-800 bg-fintech-card/30 shadow-glow-accent mb-6"
      >
        <Loader2 className="w-10 h-10 text-fintech-accent animate-spin" />
      </motion.div>

      {/* Mesaj geçişleri için AnimatePresence */}
      <div className="h-8 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-base text-slate-300 font-medium tracking-wide"
          >
            {MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <p className="text-xs text-slate-500 mt-2">
        Bu işlem ortalama birkaç saniye sürmektedir.
      </p>
    </div>
  );
}
