import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles, Newspaper, Search, BarChart3 } from 'lucide-react';

// Bileşenlerin içe aktarılması
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import LoadingScreen from './components/LoadingScreen';
import HeroSummary from './components/HeroSummary';
import RecommendationCard from './components/RecommendationCard';
import SentimentGauge from './components/SentimentGauge';
import StatsGrid from './components/StatsGrid';
import SentimentChart from './components/SentimentChart';
import AIReportCard from './components/AIReportCard';
import NewsList from './components/NewsList';
import ErrorCard from './components/ErrorCard';
import Footer from './components/Footer';

// Hızlı arama için popüler hisse senetleri listesi
const POPULAR_STOCKS = [
  { name: 'Apple', code: 'Apple' },
  { name: 'Tesla', code: 'Tesla' },
  { name: 'Nvidia', code: 'Nvidia' },
  { name: 'Microsoft', code: 'Microsoft' },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analizData, setAnalizData] = useState(null);
  const [arananHisse, setArananHisse] = useState('');

  // API'ye istek gönderen asenkron fonksiyon
  const handleSearch = async (hisse) => {
    setIsLoading(true);
    setError(null);
    setArananHisse(hisse);
    
    try {
      // API çağrısı gerçekleştirilir
      const response = await axios.get(`http://127.0.0.1:8000/analyze/${hisse}`);
      setAnalizData(response.data);
    } catch (err) {
      console.error("API Hatası:", err);
      setError("Hisse senedi verileri alınamadı. Lütfen yerel backend sunucusunun (http://127.0.0.1:8000) çalıştığından emin olun.");
      setAnalizData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // İstatistik hesaplamaları
  let pozitif = 0;
  let negatif = 0;
  let notr = 0;
  let toplam = 0;
  let pozitifOrani = 0;

  if (analizData && analizData.haberler) {
    toplam = analizData.haberler.length;
    analizData.haberler.forEach(h => {
      const duygu = h.duygu.toLowerCase();
      if (duygu === 'positive') pozitif++;
      else if (duygu === 'negative') negatif++;
      else notr++;
    });
    pozitifOrani = toplam > 0 ? Math.round((pozitif / toplam) * 100) : 0;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Üst Kısım */}
      <div className="w-full">
        {/* Üst Menü / Başlık */}
        <Header />

        {/* Arama Bölümü */}
        <div className="mb-8">
          <SearchPanel onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Ana İçerik Alanı */}
        <main className="w-full">
          <AnimatePresence mode="wait">
            {/* 1. Yükleniyor Durumu */}
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingScreen />
              </motion.div>
            )}

            {/* 2. Hata Durumu */}
            {!isLoading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ErrorCard message={error} onRetry={() => handleSearch(arananHisse)} />
              </motion.div>
            )}

            {/* 3. Boş Başlangıç Ekranı */}
            {!isLoading && !error && !analizData && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-2xl mx-auto my-6 border border-slate-800 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-fintech-accent/10 border border-fintech-accent/20 flex items-center justify-center mx-auto mb-6 text-fintech-accent">
                  <BarChart3 size={30} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">Analize Başlayın</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-8">
                  Finans haberlerinin duygu duyarlılığını analiz etmek için yukarıdaki arama kutusuna bir hisse senedi ismi (örn. Apple, Nvidia, Tesla) girin veya aşağıdaki popüler aramalardan birini seçin.
                </p>

                {/* Popüler Aramalar Kısayolu */}
                <div className="flex flex-col items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Popüler Aramalar</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {POPULAR_STOCKS.map((stock) => (
                      <button
                        key={stock.code}
                        onClick={() => handleSearch(stock.code)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800 hover:border-fintech-accent/40 hover:text-white transition-all duration-200"
                      >
                        {stock.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4. Analiz Sonuçları Paneli */}
            {!isLoading && !error && analizData && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                {/* En üstte büyük Hero Summary alanı */}
                <HeroSummary 
                  hisse={analizData.hisse} 
                  tavsiye={analizData.tavsiye} 
                  pozitifOrani={pozitifOrani} 
                />

                {/* Ana Analiz Panel Izgarası */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Sol/Orta Taraf (8 Kolon): İstatistik ve Grafikler */}
                  <div className="lg:col-span-8 flex flex-col gap-6">
                    {/* 4'lü Özet İstatistik Kartları */}
                    <StatsGrid 
                      toplam={toplam} 
                      pozitif={pozitif} 
                      negatif={negatif} 
                      notr={notr} 
                    />

                    {/* Sütun Grafik */}
                    <div className="flex-1">
                      <SentimentChart 
                        pozitif={pozitif} 
                        negatif={negatif} 
                        notr={notr} 
                      />
                    </div>
                  </div>

                  {/* Sağ Taraf (4 Kolon): Karar ve Detaylı Analiz */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    {/* Karar Tavsiye Kartı */}
                    <div>
                      <RecommendationCard tavsiye={analizData.tavsiye} />
                    </div>

                    {/* Piyasa Duyarlılık Yarım Dairesi */}
                    <div>
                      <SentimentGauge 
                        pozitif={pozitif} 
                        negatif={negatif} 
                        notr={notr} 
                      />
                    </div>

                    {/* Yapay Zeka Raporu */}
                    <div>
                      <AIReportCard 
                        hisse={analizData.hisse} 
                        pozitif={pozitif} 
                        negatif={negatif} 
                        notr={notr} 
                      />
                    </div>
                  </div>
                </div>

                {/* Alt Kısım: Haber Kartları Listesi */}
                <div className="pt-6 border-t border-slate-900">
                  <NewsList haberler={analizData.haberler} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Alt Bilgi */}
      <Footer />
    </div>
  );
}
