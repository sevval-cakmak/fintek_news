from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import requests
import os
from dotenv import load_dotenv

# .env dosyasındaki değişkenleri ortam değişkenlerine yükle
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

sentiment = pipeline("text-classification", model="ProsusAI/finbert")

# API anahtarı .env dosyasından okunur, asla koda yazılmaz
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

@app.get("/analyze/{hisse}")
def analyze(hisse: str):
    url = f"https://newsapi.org/v2/everything?q={hisse}&language=en&pageSize=10&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    articles = response.json().get("articles", [])

    results = []
    for a in articles:
        text = a.get("title", "") + " " + (a.get("description") or "")
        label = sentiment(text[:512])[0]
        results.append({
            "baslik": a.get("title"),
            "url": a.get("url"),
            "duygu": label["label"],
            "skor": round(label["score"] * 100, 2)
        })

    pozitif = sum(1 for r in results if r["duygu"] == "positive")
    negatif = sum(1 for r in results if r["duygu"] == "negative")
    tavsiye = "AL 🟢" if pozitif > negatif else "SATMA / BEKLE 🔴"

    return {
        "hisse": hisse,
        "tavsiye": tavsiye,
        "haberler": results
    }