from typing import Any, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import dependencies, models
from app.ai_agent import service, schemas
from app.ai_agent.fundamental_agent import fundamental_agent
from app.trades.models import TradeIdea

router = APIRouter()

@router.post("/run")
def run_agent(
    request: schemas.AgentRunRequest,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user),
) -> Any:
    return service.agent_service.run_agent(db, request, current_user.id)

@router.get("/ideas", response_model=List[schemas.TradeIdeaResponse])
def get_trade_ideas(
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user),
) -> Any:
    return db.query(TradeIdea).filter(TradeIdea.status == "ACTIVE").all()

@router.delete("/ideas")
def clear_trade_ideas(
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user),
) -> Any:
    # Delete all trade ideas
    db.query(TradeIdea).delete()
    db.commit()
    return {"message": "All trade ideas cleared"}

@router.get("/analyze/{symbol}")
def analyze_stock(
    symbol: str,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(dependencies.get_current_active_user),
) -> Any:
    return fundamental_agent.analyze(symbol)
