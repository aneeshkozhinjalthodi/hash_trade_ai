from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class NewsBase(BaseModel):
    title: str
    content: str
    source: str
    url: Optional[str] = None
    sentiment_score: Optional[str] = None

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    published_at: datetime
    class Config:
        from_attributes = True
