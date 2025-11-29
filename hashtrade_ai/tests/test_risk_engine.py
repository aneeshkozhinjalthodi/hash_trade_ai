from app.ai_agent.risk_engine import RiskEngine
from app.ai_agent.schemas import UserProfile, RiskSettings

def test_risk_engine():
    engine = RiskEngine()
    
    # Scenario 1: Safe Trade
    print("\n--- Scenario 1: Safe Trade ---")
    profile_safe = UserProfile(
        user_id="user1",
        risk_settings=RiskSettings(daily_loss_limit=1000, max_drawdown_limit=5000),
        current_daily_pnl=-100, # Small loss
        current_drawdown=500
    )
    trade_safe = {"symbol": "AAPL", "entry_price": 150, "stop_loss": 145}
    result = engine.validate_trade(profile_safe, trade_safe)
    print(f"Allowed: {result.allowed}")
    print(f"Checks: {result.checks}")
    print(f"Max Qty: {result.max_qty_allowed}")
    assert result.allowed == True

    # Scenario 2: Daily Loss Limit Exceeded
    print("\n--- Scenario 2: Daily Loss Limit Exceeded ---")
    profile_loss = UserProfile(
        user_id="user2",
        risk_settings=RiskSettings(daily_loss_limit=1000),
        current_daily_pnl=-1100 # Exceeds limit
    )
    result = engine.validate_trade(profile_loss, trade_safe)
    print(f"Allowed: {result.allowed}")
    print(f"Reason: {result.reason}")
    assert result.allowed == False

    # Scenario 3: Danger Zone Alert
    print("\n--- Scenario 3: Danger Zone Alert ---")
    profile_danger = UserProfile(
        user_id="user3",
        risk_settings=RiskSettings(daily_loss_limit=1000),
        current_daily_pnl=-850 # 85% of limit
    )
    result = engine.validate_trade(profile_danger, trade_safe)
    print(f"Allowed: {result.allowed}")
    print(f"Checks: {result.checks}")
    assert result.allowed == True
    assert "Danger Zone Alert: TRIGGERED" in result.checks

    # Scenario 4: Max Risk Per Trade (Qty Calculation)
    print("\n--- Scenario 4: Max Risk Per Trade ---")
    profile_qty = UserProfile(
        user_id="user4",
        risk_settings=RiskSettings(max_risk_per_trade=50) # Max $50 loss per trade
    )
    # Risk per share = $5 (150 - 145). Max qty should be 10.
    result = engine.validate_trade(profile_qty, trade_safe)
    print(f"Max Qty: {result.max_qty_allowed}")
    assert result.max_qty_allowed == 10

if __name__ == "__main__":
    test_risk_engine()
