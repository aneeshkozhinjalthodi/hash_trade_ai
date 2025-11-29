import requests
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.core.config import settings
from app.news import models, schemas
from datetime import datetime

def fetch_marketaux_news() -> List[Dict[str, Any]]:
    api_token = settings.MARKETAUX_API_KEY
    if not api_token:
        print("Marketaux API key not found.")
        return []

    url = "https://api.marketaux.com/v1/news/all"
    params = {
        "filter_entities": "true",
        "language": "en",
        "api_token": api_token,
        "industries": "Financial,Technology",
        "limit": 5
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        articles = data.get("data", [])
        
        news_items = []
        for article in articles:
            # Marketaux often provides sentiment in entities, but for simplicity we'll check if there's a top-level sentiment or default
            # Actually Marketaux 'data' items have 'entities' list which have 'sentiment_score'.
            # We'll just take a simple approach or random/neutral if not clear.
            # Let's check if there is a 'sentiment' field in the article itself (some endpoints do).
            # If not, we'll default to "Neutral".
            
            sentiment = "Neutral"
            if article.get("entities"):
                # Average sentiment of entities?
                scores = [e.get("sentiment_score", 0) for e in article["entities"]]
                if scores:
                    avg_score = sum(scores) / len(scores)
                    if avg_score > 0.1: sentiment = "Positive"
                    elif avg_score < -0.1: sentiment = "Negative"

            news_items.append({
                "title": article.get("title"),
                "content": article.get("description") or article.get("snippet") or "",
                "source": article.get("source"),
                "published_at": article.get("published_at"), # String, might need parsing if not ISO
                "sentiment_score": sentiment,
                "url": article.get("url")
            })
        return news_items
    except Exception as e:
        print(f"Error fetching Marketaux news: {e}")
        return []

def fetch_newsdata_news() -> List[Dict[str, Any]]:
    api_key = settings.NEWSDATA_API_KEY
    if not api_key:
        print("NewsData API key not found.")
        return []

    url = "https://newsdata.io/api/1/news"
    params = {
        "apikey": api_key,
        "q": "stock market",
        "language": "en",
        "country": "in" 
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        results = data.get("results", [])
        
        news_items = []
        for article in results:
            news_items.append({
                "title": article.get("title"),
                "content": article.get("description") or "",
                "source": article.get("source_id"),
                "published_at": article.get("pubDate"),
                "sentiment_score": "Neutral", # NewsData free tier might not give sentiment
                "url": article.get("link")
            })
        return news_items
    except Exception as e:
        print(f"Error fetching NewsData news: {e}")
        return []

def update_news_db(db: Session):
    """
    Fetches news from external APIs and updates the database.
    """
    # Fetch from both sources
    marketaux_news = fetch_marketaux_news()
    newsdata_news = fetch_newsdata_news()
    
    all_news = marketaux_news + newsdata_news
    
    count = 0
    for item in all_news:
        # Check for duplicates based on title
        exists = db.query(models.News).filter(models.News.title == item["title"]).first()
        if not exists:
            # Parse date if necessary, or let SQLAlch handle ISO strings usually
            # Marketaux: "2023-10-27T10:00:00.000000Z"
            # NewsData: "2023-10-27 10:00:00"
            
            # Simple date parsing/handling could be added here if needed, 
            # but for now we'll trust the string or let it fail/warn.
            # Actually, let's try to be safe.
            
            # Create model
            db_news = models.News(
                title=item["title"],
                content=item["content"],
                source=item["source"],
                sentiment_score=item["sentiment_score"],
                url=item.get("url")
            )
            # We skip published_at for now to let it default to now() or we need to parse it correctly.
            # If we want to use the API date, we need to parse it to datetime object.
            
            db.add(db_news)
            count += 1
    
    db.commit()
    return count
