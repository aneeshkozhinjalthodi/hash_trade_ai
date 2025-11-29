from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel

class AgentRunRequest(BaseModel):
    goal: str
    context: Optional[Dict[str, Any]] = {}

class AgentAction(BaseModel):
    action_type: str # NO_ACTION, SUGGEST_TRADE, GENERATE_EXPLANATION
    payload: Dict[str, Any]

class RiskCheckResult(BaseModel):
    allowed: bool
    checks: List[str]
    reason: Optional[str] = None
    max_qty_allowed: int

class TradeIdeaResponse(BaseModel):
    symbol: str
    company_name: Optional[str] = None
    direction: str
    time_horizon: str
    risk_notes: str
    educational_tip: str
    explanation: str
    created_at: datetime
    id: int

    class Config:
        from_attributes = True

class AgentTrace(BaseModel):
    id: str
    steps: List[Dict[str, Any]]
