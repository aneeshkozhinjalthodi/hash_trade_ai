from typing import List, Dict, Any
from app.ai_agent.schemas import UserProfile, DerivativePosition, HedgeSuggestion

class HedgeManager:
    def suggest_hedges(self, user_profile: UserProfile, positions: List[DerivativePosition], market_trend: str = "NEUTRAL") -> List[HedgeSuggestion]:
        suggestions = []
        
        # Helper: Calculate Portfolio Delta
        portfolio_delta = sum(p.delta * p.quantity for p in positions)
        
        # 1. Delta Neutralizer
        # If portfolio delta is significantly non-zero, suggest hedge
        DELTA_THRESHOLD = 50 # Example threshold
        if abs(portfolio_delta) > DELTA_THRESHOLD:
            action = "SELL_FUTURE" if portfolio_delta > 0 else "BUY_FUTURE"
            qty = int(abs(portfolio_delta)) # Simplified: Assuming Future Delta = 1
            suggestions.append(HedgeSuggestion(
                trigger_reason=f"High Portfolio Delta ({portfolio_delta:.2f})",
                suggested_action=action,
                symbol="NIFTY", # Default index hedge
                quantity=qty,
                rationale="Neutralize directional risk to bring delta closer to 0.",
                priority="MEDIUM"
            ))

        # 2. Protective Puts (Bearish Market)
        # If market is bearish and user has net long exposure
        net_long_exposure = sum(p.current_price * p.quantity for p in positions if p.quantity > 0)
        if market_trend == "BEARISH" and net_long_exposure > 500000: # > 5 Lakhs
            suggestions.append(HedgeSuggestion(
                trigger_reason="Bearish Market Trend + High Long Exposure",
                suggested_action="BUY_PUT",
                symbol="NIFTY",
                quantity=50, # 1 Lot
                rationale="Protect long portfolio from market downturn.",
                priority="HIGH"
            ))

        # 3. Emergency Hedge (Panic Button)
        # If drawdown > 10% in short time (simulated by current_drawdown check)
        # Assuming max_drawdown_limit is the "blowup" point, let's say 10% of that is alarming? 
        # Or better, if current_drawdown > 10% of account size (not available in schema yet, using fixed value)
        if user_profile.current_drawdown > 10000: # Example fixed threshold
             suggestions.append(HedgeSuggestion(
                trigger_reason="Significant Drawdown Detected (>10k)",
                suggested_action="BUY_DEEP_OTM_PUT",
                symbol="NIFTY",
                quantity=100,
                rationale="Emergency protection against further crash.",
                priority="CRITICAL"
            ))

        return suggestions

hedge_manager = HedgeManager()
