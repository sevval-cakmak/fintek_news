# Borsa Haber Duygu Analizi

FinBERT NLP modeli ile finans haberlerini analiz eden, piyasa duyarlılığını görselleştiren bir web uygulaması.

---

## 🇹🇷 Türkçe

### Proje Hakkında

Bu uygulama, kullanıcının girdiği hisse senedi adına ait İngilizce finans haberlerini NewsAPI üzerinden çeker. Her haber başlığı ve açıklaması, finansal metinler için ince ayar yapılmış bir BERT modeli olan [ProsusAI/FinBERT](https://huggingface.co/ProsusAI/finbert) ile analiz edilir. Analiz sonuçları (pozitif / negatif / nötr) React tabanlı bir arayüzde grafik ve kartlar şeklinde gösterilir.

> **Uyarı:** Uygulama yatırım tavsiyesi vermez. Çıktılar yalnızca haber duygu dağılımına dayanmaktadır.

### Özellikler

- Hisse senedi adına göre İngilizce haber arama (NewsAPI, max 10 haber)
- FinBERT ile her haber için duygu sınıflandırması (positive / negative / neutral) ve güven skoru
- Pozitif haber sayısı negatiften fazlaysa "AL", aksi halde "SATMA / BEKLE" tavsiyesi
- Toplam / pozitif / negatif / nötr haber sayısı özeti
- Recharts kütüphanesi ile duygu dağılım çubuğu grafiği
- SVG tabanlı yarım daire duyarlılık göstergesi (0-100 puan)
- Her haber için başlık, duygu etiketi, güven skoru çubuğu ve orijinal habere bağlantı
- Popüler hisse kısayolları (Apple, Tesla, Nvidia, Microsoft)
- Yükleme, hata ve boş durum ekranları
- Framer Motion animasyonları, glassmorphism arayüz tasarımı

### Kullanılan Teknolojiler

**Backend**
- Python 3
- FastAPI
- Hugging Face Transformers (`ProsusAI/finbert`)
- NewsAPI (harici haber kaynağı)
- `requests` kütüphanesi

**Frontend**
- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Recharts
- Axios
- Lucide React

### Kurulum

#### Gereksinimler

- Python 3.9+
- Node.js 18+
- [NewsAPI](https://newsapi.org) API anahtarı

#### Backend

```bash
cd backend
pip install fastapi uvicorn transformers requests torch
```

`main.py` dosyasındaki `NEWS_API_KEY` değişkenine kendi API anahtarınızı girin.

```bash
uvicorn main:app --reload
# Sunucu http://127.0.0.1:8000 adresinde başlar
```

> **Not:** FinBERT modeli ilk çalıştırmada Hugging Face'den indirilir (~400 MB).

#### Frontend

```bash
cd frontend
npm install
npm run dev
# Uygulama http://localhost:5173 adresinde açılır
```

### Kullanım

1. Backend sunucusunun çalıştığından emin olun (`http://127.0.0.1:8000`).
2. Frontend'i tarayıcıda açın.
3. Arama kutusuna bir hisse senedi adı girin (örn. `Apple`, `Tesla`).
4. "Analiz Et" düğmesine tıklayın.
5. Sonuçlar grafik ve kartlar şeklinde görüntülenir.

---

## 🇬🇧 English

### Project Overview

This application fetches English-language financial news articles for a given stock name via NewsAPI. Each article's title and description is analyzed using [ProsusAI/FinBERT](https://huggingface.co/ProsusAI/finbert), a BERT model fine-tuned for financial sentiment classification. Results (positive / negative / neutral) are displayed in a React-based dashboard with charts and cards.

> **Disclaimer:** This application does not provide investment advice. All outputs are based solely on news sentiment distribution.

### Features

- News search by stock name via NewsAPI (up to 10 articles per query)
- Per-article sentiment classification (positive / negative / neutral) and confidence score using FinBERT
- Buy ("AL") recommendation when positive count exceeds negative, otherwise Hold/Sell ("SATMA / BEKLE")
- Summary statistics: total / positive / negative / neutral article counts
- Bar chart of sentiment distribution using Recharts
- SVG-based semicircular sentiment gauge (0–100 score)
- News cards showing title, sentiment label, confidence progress bar, and source link
- Quick-search shortcuts for popular stocks (Apple, Tesla, Nvidia, Microsoft)
- Loading, error, and empty state screens
- Framer Motion animations, glassmorphism UI design

### Technologies

**Backend**
- Python 3
- FastAPI
- Hugging Face Transformers (`ProsusAI/finbert`)
- NewsAPI (external news source)
- `requests` library

**Frontend**
- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Recharts
- Axios
- Lucide React

### Installation

#### Requirements

- Python 3.9+
- Node.js 18+
- [NewsAPI](https://newsapi.org) API key

#### Backend

```bash
cd backend
pip install fastapi uvicorn transformers requests torch
```

Set your API key in the `NEWS_API_KEY` variable inside `main.py`.

```bash
uvicorn main:app --reload
# Server starts at http://127.0.0.1:8000
```

> **Note:** The FinBERT model is downloaded from Hugging Face on first run (~400 MB).

#### Frontend

```bash
cd frontend
npm install
npm run dev
# App opens at http://localhost:5173
```

### Usage

1. Make sure the backend server is running at `http://127.0.0.1:8000`.
2. Open the frontend in your browser.
3. Enter a stock name in the search box (e.g. `Apple`, `Tesla`).
4. Click "Analiz Et" (Analyze).
5. Results are displayed as charts and cards.
