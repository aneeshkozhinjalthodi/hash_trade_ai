from app.ai_agent.hedge_manager import HedgeManager
from app.ai_agent.schemas import UserProfile, RiskSettings, DerivativePosition

def test_hedge_manager():
    manager = HedgeManager()
    profile = UserProfile(
        user_id="user1",
        risk_settings=RiskSettings(),
        current_drawdown=0
    )
    
    # Scenario 1: High Positive Delta (Needs Short Hedge)
    print("\n--- Scenario 1: High Positive Delta ---")
    pos1 = DerivativePosition(
        symbol="RELIANCE", instrument_type="FUTURE", expiry_date="2025-12-31",
        strike_price=0, quantity=100, entry_price=2500, current_price=2550,
        delta=1.0 # Long Future
    )
    suggestions = manager.suggest_hedges(profile, [pos1], market_trend="NEUTRAL")
    for s in suggestions:
        print(f"Suggestion: {s.suggested_action} {s.quantity} {s.symbol} ({s.priority})")
        print(f"Reason: {s.trigger_reason}")
    assert len(suggestions) > 0
    assert suggestions[0].suggested_action == "SELL_FUTURE"

    # Scenario 2: Bearish Market Protection
    print("\n--- Scenario 2: Bearish Market Protection ---")
    # Large long exposure
    pos2 = DerivativePosition(
        symbol="INFY", instrument_type="FUTURE", expiry_date="2025-12-31",
        strike_price=0, quantity=500, entry_price=1500, current_price=1500,
        delta=1.0
    )
    suggestions = manager.suggest_hedges(profile, [pos2], market_trend="BEARISH")
    found_put = False
    for s in suggestions:
        print(f"Suggestion: {s.suggested_action} {s.quantity} {s.symbol} ({s.priority})")
        if s.suggested_action == "BUY_PUT":
            found_put = True
    assert found_put == True

    # Scenario 3: Emergency Hedge
    print("\n--- Scenario 3: Emergency Hedge ---")
    profile_panic = UserProfile(
        user_id="user1",
        risk_settings=RiskSettings(),
        current_drawdown=15000 # High drawdown
    )
    suggestions = manager.suggest_hedges(profile_panic, [], market_trend="BEARISH")
    found_emergency = False
    for s in suggestions:
        print(f"Suggestion: {s.suggested_action} {s.quantity} {s.symbol} ({s.priority})")
        if s.priority == "CRITICAL":
            found_emergency = True
    assert found_emergency == True

if __name__ == "__main__":
    test_hedge_manager()
