from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth import dependencies, models
from app.news import models as news_models, schemas

router = APIRouter()

@router.get("/latest", response_model=List[schemas.News])
def read_news(
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user),
    skip: int = 0,
    limit: int = 10,
) -> Any:
    # Check if we have news
    count = db.query(news_models.News).count()
    if count == 0:
        from app.news import services
        services.update_news_db(db)
        
    return db.query(news_models.News).order_by(news_models.News.published_at.desc()).offset(skip).limit(limit).all()
