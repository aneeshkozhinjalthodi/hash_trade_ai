import random
from typing import Dict, Any

import requests
from app.core.config import settings

import requests
import yfinance as yf
from app.core.config import settings

def fetch_news_marketaux(symbol: str = None) -> str:
    """
    Fetches financial news using Marketaux API. If symbol is None, fetches top general news.
    """
    api_token = settings.MARKETAUX_API_KEY
    if not api_token:
        return ""

    url = "https://api.marketaux.com/v1/news/all"
    params = {
        "filter_entities": "true",
        "language": "en",
        "api_token": api_token,
    }
    if symbol:
        params["symbols"] = symbol
    else:
        params["industries"] = "Financial,Technology" # Broaden search if no symbol

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        articles = data.get("data", [])
        if not articles:
            return ""
            
        headlines = [f"- {article['title']} (Source: {article['source']})" for article in articles[:5]]
        return "\n".join(headlines)
    except Exception as e:
        return f"Error fetching Marketaux news: {str(e)}"

def fetch_news_newsdata(query: str = "stock market india") -> str:
    """
    Fetches news using NewsData.io API.
    """
    api_key = settings.NEWSDATA_API_KEY
    if not api_key:
        return ""
        
    url = "https://newsdata.io/api/1/news"
    params = {
        "apikey": api_key,
        "q": query,
        "language": "en",
        "country": "in" 
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        
        results = data.get("results", [])
        if not results:
            return ""
            
        headlines = [f"- {article['title']} (Source: {article.get('source_id', 'Unknown')})" for article in results[:5]]
        return "\n".join(headlines)
    except Exception as e:
        return f"Error fetching NewsData news: {str(e)}"

def fetch_technicals_yfinance(symbol: str) -> str:
    """
    Fetches technical indicators using yfinance.
    """
    try:
        ticker = yf.Ticker(symbol + ".NS") # Assuming NSE
        hist = ticker.history(period="1mo")
        
        if hist.empty:
            return f"No data for {symbol}"
            
        current_price = hist['Close'].iloc[-1]
        prev_price = hist['Close'].iloc[-2]
        change = ((current_price - prev_price) / prev_price) * 100
        
        # Simple SMA
        sma_20 = hist['Close'].tail(20).mean()
        trend = "Bullish" if current_price > sma_20 else "Bearish"
        
        return f"Price: {current_price:.2f}, Change: {change:.2f}%, Trend: {trend} (vs 20-SMA)"
    except Exception as e:
        return f"Error fetching technicals: {str(e)}"

def fetch_aggregated_news() -> str:
    """
    Combines news from multiple sources for bulk analysis.
    """
    marketaux = fetch_news_marketaux()
    newsdata = fetch_news_newsdata()
    
    combined = "Marketaux News:\n" + (marketaux or "None") + "\n\nNewsData.io News:\n" + (newsdata or "None")
    return combined

def fetch_market_snapshot() -> Dict[str, Any]:
    # Mocked market snapshot
    return {
        "NIFTY50": {"price": 24500.0, "change": "+0.5%"},
        "BANKNIFTY": {"price": 52000.0, "change": "-0.2%"},
        "VIX": 12.5
    }

def get_user_risk_profile(user_id: int) -> Dict[str, Any]:
    # Mocked risk profile
    return {
        "risk_tolerance": "MODERATE",
        "max_per_trade_loss": 5000,
        "daily_loss_limit": 20000
    }

def get_latest_positions(user_id: int) -> list:
    # Mocked positions
    return [
        {"symbol": "RELIANCE", "qty": 10, "avg_price": 2400, "ltp": 2450}
    ]
