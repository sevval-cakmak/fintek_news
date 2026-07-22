import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2 } from 'lucide-react';

// Özel Grafik Araç İpucu (Custom Tooltip) Bileşeni
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-slate-800 p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-xs font-semibold text-slate-400 mb-1">{data.name}</p>
        <p className="text-sm font-black text-white">
          Haber Adedi: <span style={{ color: data.color }}>{data.count}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Recharts çubuk grafiği ile duygu dağılımını gösteren bileşen
export default function SentimentChart({ pozitif, negatif, notr }) {
  // Grafik için veri kümesi
  const data = [
    { name: 'Pozitif', count: pozitif, color: '#10b981' },
    { name: 'Nötr', count: notr, color: '#64748b' },
    { name: 'Negatif', count: negatif, color: '#ef4444' }
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-panel p-6 rounded-2xl h-full flex flex-col justify-between shadow-lg"
    >
      {/* Üst Bilgi Başlığı */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Duygu Dağılım Grafiği
        </span>
        <BarChart2 size={16} className="text-fintech-accent" />
      </div>

      {/* Grafik Çizim Alanı */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#334155', opacity: 0.1 }} />
            
            {/* Yuvarlak kenarlı modern sütun grafik barları */}
            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-4 border-t border-slate-800/50 pt-4">
        <p className="text-[10px] text-slate-500">
          Grafik verileri FinBERT sentiment çıkarımlarına dayanmaktadır.
        </p>
      </div>
    </motion.div>
  );
}
