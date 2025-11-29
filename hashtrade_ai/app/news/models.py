from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.db.session import Base

class News(Base):
    __tablename__ = "news"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    source = Column(String)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
    sentiment_score = Column(String) # e.g., "Positive", "Negative"
    url = Column(String)
