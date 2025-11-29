from app.ai_agent.fraud_scanner import MarketIntegrityScanner
from app.ai_agent.schemas import MarketData

def test_fraud_scanner():
    scanner = MarketIntegrityScanner()
    
    # Scenario 1: Fake Volume (Churning)
    print("\n--- Scenario 1: Fake Volume ---")
    data_churn = MarketData(
        symbol="CHURN", current_price=100, price_change_pct=0.5, # Flat price
        volume=500000, avg_volume=50000 # 10x volume
    )
    alerts = scanner.scan_stock(data_churn)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.details}")
    assert any(a.alert_type == "FAKE_VOLUME" for a in alerts)

    # Scenario 2: Pump & Dump
    print("\n--- Scenario 2: Pump & Dump ---")
    data_pump = MarketData(
        symbol="HYPE", current_price=50, price_change_pct=25.0, # Up 25%
        volume=100000, avg_volume=10000,
        social_buzz_score=90 # High hype
    )
    alerts = scanner.scan_stock(data_pump)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.details}")
    assert any(a.alert_type == "PUMP_DUMP" for a in alerts)

    # Scenario 3: Promoter Exit
    print("\n--- Scenario 3: Promoter Exit ---")
    data_exit = MarketData(
        symbol="EXIT", current_price=200, price_change_pct=-5.0,
        volume=5000, avg_volume=5000,
        promoter_holding_change=-10.0 # Sold 10%
    )
    alerts = scanner.scan_stock(data_exit)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.details}")
    assert any(a.alert_type == "PROMOTER_EXIT" for a in alerts)

    # Scenario 4: Telegram Trap
    print("\n--- Scenario 4: Telegram Trap ---")
    data_trap = MarketData(
        symbol="SCAMCO", current_price=10, price_change_pct=5.0,
        volume=1000, avg_volume=1000
    )
    alerts = scanner.scan_stock(data_trap)
    for a in alerts:
        print(f"Alert: {a.alert_type} - {a.details}")
    assert any(a.alert_type == "TELEGRAM_PUMP" for a in alerts)

if __name__ == "__main__":
    test_fraud_scanner()
