# 📈 FinTech News Sentiment Analysis

Financial news sentiment analysis application powered by FinBERT, FastAPI and React.

---

## 🇹🇷 Türkçe

### Proje Hakkında

Bu proje, kullanıcı tarafından girilen hisse senedi adına ait güncel finans haberlerini **NewsAPI** üzerinden alarak **FinBERT** modeli ile duygu analizi gerçekleştirir. Analiz sonuçları; duygu dağılımı, özet istatistikler ve görselleştirmeler ile kullanıcıya sunulur.

> **Not:** Bu uygulama yatırım tavsiyesi sunmaz. Sonuçlar yalnızca haber içeriklerinin duygu analizine dayanmaktadır.

### Özellikler

- NewsAPI üzerinden finans haberlerini getirme
- FinBERT modeli ile haber duygu analizi
- Pozitif, negatif ve nötr duygu sınıflandırması
- Duygu dağılımının grafiklerle görselleştirilmesi
- Hisse bazlı genel piyasa duyarlılığı özeti
- Modern ve responsive kullanıcı arayüzü

### Kullanılan Teknolojiler

#### Backend

- Python
- FastAPI
- Hugging Face Transformers
- FinBERT (ProsusAI)
- NewsAPI
- Requests

#### Frontend

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Axios
- Lucide React

### Kurulum

#### Gereksinimler

- Python 3.9+
- Node.js 18+
- NewsAPI API Key

#### Backend

```bash
cd backend

pip install fastapi uvicorn transformers torch requests

uvicorn main:app --reload
```

`main.py` dosyasındaki `NEWS_API_KEY` değişkenine kendi API anahtarınızı ekleyin.

> İlk çalıştırmada FinBERT modeli Hugging Face üzerinden indirilecektir.

#### Frontend

```bash
cd frontend

npm install
npm run dev
```

### Kullanım

1. Backend sunucusunu çalıştırın.
2. Frontend uygulamasını başlatın.
3. Bir hisse senedi adı girin (örn. Apple, Tesla).
4. Analizi başlatın.
5. Haber duygu analizi sonuçlarını grafikler ve özet bilgiler ile inceleyin.

---

## 🇬🇧 English

### Project Overview

This project retrieves the latest financial news for a given stock using **NewsAPI** and performs sentiment analysis with the **FinBERT** model. The results are presented through charts, summary statistics, and an interactive web interface.

> **Disclaimer:** This application does not provide investment advice. Results are based solely on sentiment analysis of news articles.

### Features

- Retrieve financial news via NewsAPI
- Sentiment analysis using FinBERT
- Positive, negative and neutral classification
- Interactive sentiment visualization
- Overall market sentiment summary
- Modern and responsive user interface

### Technologies

#### Backend

- Python
- FastAPI
- Hugging Face Transformers
- FinBERT (ProsusAI)
- NewsAPI
- Requests

#### Frontend

- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Axios
- Lucide React

### Installation

#### Requirements

- Python 3.9+
- Node.js 18+
- NewsAPI API Key

#### Backend

```bash
cd backend

pip install fastapi uvicorn transformers torch requests

uvicorn main:app --reload
```

Add your NewsAPI key to the `NEWS_API_KEY` variable in `main.py`.

> The FinBERT model will be downloaded from Hugging Face during the first run.

#### Frontend

```bash
cd frontend

npm install
npm run dev
```

### Usage

1. Start the backend server.
2. Launch the frontend application.
3. Enter a stock name (e.g. Apple or Tesla).
4. Run the analysis.
5. Review the sentiment results through charts and summary statistics.
