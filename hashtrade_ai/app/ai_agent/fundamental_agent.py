from typing import Dict, Any
import google.generativeai as genai
from app.core.config import settings
from app.ai_agent.tools import fetch_news_newsdata, fetch_news_marketaux

class FundamentalAnalysisAgent:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        else:
            self.model = None

    def _fetch_data(self, symbol: str) -> Dict[str, str]:
        """
        Fetches news/data related to specific fundamental topics.
        """
        topics = {
            "filings": f"{symbol} company filings quarterly results annual report",
            "transcripts": f"{symbol} earnings call transcript conference call",
            "shareholding": f"{symbol} shareholding pattern insider trading",
            "deals": f"{symbol} bulk deal block deal",
            "sector": f"{symbol} sector outlook industry analysis"
        }
        
        data = {}
        for key, query in topics.items():
            # We use NewsData.io as it allows flexible text search
            news = fetch_news_newsdata(query=query)
            data[key] = news if news else "No recent news found."
            
        return data

    def analyze(self, symbol: str) -> Dict[str, Any]:
        if not self.model:
            return {"error": "AI configuration missing."}

        # 1. Fetch Data
        raw_data = self._fetch_data(symbol)
        
        # 2. Construct Prompt
        prompt = f"""
        Perform a comprehensive Fundamental Analysis for the stock: {symbol}.
        
        Use the following gathered information:
        
        --- COMPANY FILINGS & RESULTS ---
        {raw_data['filings']}
        
        --- CONCALL TRANSCRIPTS / KEY TAKEAWAYS ---
        {raw_data['transcripts']}
        
        --- SHAREHOLDING PATTERNS & INSIDER ACTIVITY ---
        {raw_data['shareholding']}
        
        --- BULK / BLOCK DEALS ---
        {raw_data['deals']}
        
        --- SECTOR FUNDAMENTALS ---
        {raw_data['sector']}
        
        ---
        
        Based on the above, provide a detailed report covering:
        1. **Financial Health**: Key highlights from recent results.
        2. **Management Commentary**: Sentiment from earnings calls (if available).
        3. **Institutional Activity**: What do shareholding changes and bulk deals suggest?
        4. **Sector Outlook**: Headwinds and tailwinds.
        5. **Final Verdict**: Bullish, Bearish, or Neutral with reasoning.
        
        Format the output in Markdown.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return {
                "symbol": symbol,
                "analysis": response.text,
                "sources": raw_data
            }
        except Exception as e:
            return {"error": f"Analysis failed: {str(e)}"}

fundamental_agent = FundamentalAnalysisAgent()
