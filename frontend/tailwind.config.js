/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind'in kullanılmayan sınıfları temizlemesi için taranacak dosya yolları
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // FinTech Dashboard için özel premium renk paleti
      colors: {
        'fintech-bg': '#0f172a',      // Koyu mavi-siyah arka plan
        'fintech-card': '#1e293b',    // Koyu mavi-gri kart rengi
        'fintech-accent': '#38bdf8',  // Bloomberg stili açık mavi vurgu rengi
        'fintech-accent-hover': '#7dd3fc',
        'fintech-positive': '#10b981', // Yatırım paneli için yeşil
        'fintech-negative': '#ef4444', // Yatırım paneli için kırmızı
        'fintech-neutral': '#64748b',  // Nötr durumlar için gri
      },
      // Kurumsal yatırım platformları stilinde yumuşak parlama (glow) efektleri
      boxShadow: {
        'glow-positive': '0 0 16px -3px rgba(16, 185, 129, 0.25)',
        'glow-negative': '0 0 16px -3px rgba(239, 68, 68, 0.25)',
        'glow-accent': '0 0 16px -3px rgba(56, 189, 248, 0.2)',
      },
    },
  },
  plugins: [],
}
