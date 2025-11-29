from datetime import datetime, timedelta
from app.ai_agent.derivatives_risk import DerivativesRiskService
from app.ai_agent.schemas import DerivativePosition

def test_derivatives_risk():
    service = DerivativesRiskService()
    today = datetime.now().date()
    tomorrow = today + timedelta(days=1)
    
    # Scenario 1: Naked Short Call (Critical)
    print("\n--- Scenario 1: Naked Short Call ---")
    pos1 = DerivativePosition(
        symbol="NIFTY", instrument_type="CALL", expiry_date=str(tomorrow),
        strike_price=22000, quantity=-50, entry_price=100, current_price=120
    )
    result = service.scan_portfolio([pos1])
    print(f"Safe: {result.is_safe}")
    print(f"Alerts: {result.critical_alerts}")
    assert result.is_safe == False
    assert "Naked Short Call" in result.critical_alerts[0]

    # Scenario 2: Covered Call (Safe)
    print("\n--- Scenario 2: Covered Call ---")
    pos2 = DerivativePosition(
        symbol="RELIANCE", instrument_type="CALL", expiry_date=str(tomorrow),
        strike_price=2500, quantity=-250, entry_price=50, current_price=40
    )
    pos3 = DerivativePosition(
        symbol="RELIANCE", instrument_type="FUTURE", expiry_date=str(tomorrow),
        strike_price=0, quantity=250, entry_price=2400, current_price=2450
    )
    result = service.scan_portfolio([pos2, pos3])
    print(f"Safe: {result.is_safe}")
    print(f"Alerts: {result.critical_alerts}")
    assert result.is_safe == True

    # Scenario 3: High Gamma 0DTE (Critical)
    print("\n--- Scenario 3: High Gamma 0DTE ---")
    pos4 = DerivativePosition(
        symbol="BANKNIFTY", instrument_type="PUT", expiry_date=str(today),
        strike_price=46000, quantity=-15, entry_price=200, current_price=150,
        gamma=0.08 # High gamma
    )
    result = service.scan_portfolio([pos4])
    print(f"Safe: {result.is_safe}")
    print(f"Alerts: {result.critical_alerts}")
    assert result.is_safe == False
    assert "GAMMA ALERT" in result.critical_alerts[0]

    # Scenario 4: IV Trap (Warning)
    print("\n--- Scenario 4: IV Trap ---")
    pos5 = DerivativePosition(
        symbol="ADANIENT", instrument_type="CALL", expiry_date=str(tomorrow),
        strike_price=3000, quantity=100, entry_price=50, current_price=45,
        iv=95 # High IV
    )
    result = service.scan_portfolio([pos5])
    print(f"Safe: {result.is_safe}")
    print(f"Warnings: {result.warnings}")
    assert "IV TRAP" in result.warnings[0]

if __name__ == "__main__":
    test_derivatives_risk()
