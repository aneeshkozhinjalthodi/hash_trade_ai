from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float
from sqlalchemy.sql import func
from app.db.session import Base

class TradeIdea(Base):
    __tablename__ = "trade_ideas"
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, index=True)
    company_name = Column(String)
    direction = Column(String) # BUY / SELL
    time_horizon = Column(String) # Intraday, Swing
    explanation = Column(Text)
    risk_notes = Column(Text)
    educational_tip = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String, default="ACTIVE") # ACTIVE, EXPIRED
