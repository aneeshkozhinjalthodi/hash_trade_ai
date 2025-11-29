from typing import Dict, Any
from app.ai_agent.schemas import RiskCheckResult

class RiskEngine:
    def validate_trade(self, user_profile: Dict[str, Any], trade_details: Dict[str, Any]) -> RiskCheckResult:
        # Simple rule-based risk engine
        checks = []
        allowed = True
        reason = None
        max_qty = 25 # Default limit

        # Check 1: Daily Loss Limit
        if user_profile.get("daily_loss_limit", 0) < 1000:
            checks.append("Daily Loss Limit Check: FAILED")
            allowed = False
            reason = "Daily loss limit too low for this trade."
        else:
            checks.append("Daily Loss Limit Check: PASSED")

        # Check 2: Instrument Restrictions (Mock)
        symbol = trade_details.get("symbol", "")
        if symbol == "RISKY_ASSET":
            checks.append("Restricted Instrument Check: FAILED")
            allowed = False
            reason = "Trading this asset is restricted for your profile."
        else:
            checks.append("Restricted Instrument Check: PASSED")

        return RiskCheckResult(
            allowed=allowed,
            checks=checks,
            reason=reason,
            max_qty_allowed=max_qty
        )

risk_engine = RiskEngine()
