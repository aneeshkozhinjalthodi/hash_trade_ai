from datetime import datetime, timedelta
from app.ai_agent.behavior_analysis import BehavioralAnalysisService
from app.ai_agent.schemas import TradeHistory, UserProfile, RiskSettings

def test_behavior_ai():
    service = BehavioralAnalysisService()
    profile = UserProfile(user_id="user1", risk_settings=RiskSettings())
    now = datetime.now()

    # Scenario 1: Revenge Trading
    print("\n--- Scenario 1: Revenge Trading ---")
    history_revenge = [
        TradeHistory(trade_id="1", symbol="A", entry_time=now - timedelta(minutes=10), exit_time=now - timedelta(minutes=9), pnl=-100, entry_price=100, quantity=1),
        TradeHistory(trade_id="2", symbol="B", entry_time=now - timedelta(minutes=8), exit_time=now - timedelta(minutes=7), pnl=-50, entry_price=100, quantity=1),
        TradeHistory(trade_id="3", symbol="C", entry_time=now - timedelta(minutes=5), exit_time=now - timedelta(minutes=4), pnl=-200, entry_price=100, quantity=1),
    ]
    alerts = service.analyze_behavior(profile, history_revenge)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.message}")
    assert any(a.alert_type == "REVENGE_TRADING" for a in alerts)

    # Scenario 2: Overtrading
    print("\n--- Scenario 2: Overtrading ---")
    history_over = []
    for i in range(12):
        history_over.append(TradeHistory(
            trade_id=str(i), symbol="X", 
            entry_time=now - timedelta(hours=1), 
            exit_time=now - timedelta(minutes=50), 
            pnl=10, entry_price=100, quantity=1
        ))
    alerts = service.analyze_behavior(profile, history_over)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.message}")
    assert any(a.alert_type == "OVERTRADING" for a in alerts)

    # Scenario 3: FOMO
    print("\n--- Scenario 3: FOMO ---")
    context = {"rsi": 85, "price_vs_upper_bb": 3.0}
    alerts = service.analyze_behavior(profile, [], current_trade_context=context)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.message}")
    assert any(a.alert_type == "FOMO" for a in alerts)

    # Scenario 4: Loser Holding
    print("\n--- Scenario 4: Loser Holding ---")
    # Avg win time = 10 mins
    history_loser = [
        TradeHistory(trade_id="win1", symbol="W", entry_time=now - timedelta(minutes=60), exit_time=now - timedelta(minutes=50), pnl=100, entry_price=100, quantity=1),
        # Loser held for 30 mins (> 2x 10 mins)
        TradeHistory(trade_id="loss1", symbol="L", entry_time=now - timedelta(minutes=30), exit_time=None, pnl=-50, entry_price=100, quantity=1)
    ]
    alerts = service.analyze_behavior(profile, history_loser)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.message}")
    assert any(a.alert_type == "LOSER_HOLDING" for a in alerts)

if __name__ == "__main__":
    test_behavior_ai()
