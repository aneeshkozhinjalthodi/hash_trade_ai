from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.ai_agent.schemas import DerivativePosition, DerivativesRiskScanResult

class DerivativesRiskService:
    def scan_portfolio(self, positions: List[DerivativePosition]) -> DerivativesRiskScanResult:
        warnings = []
        critical_alerts = []
        is_safe = True
        
        # Helper to group positions by symbol
        positions_by_symbol = {}
        for pos in positions:
            if pos.symbol not in positions_by_symbol:
                positions_by_symbol[pos.symbol] = []
            positions_by_symbol[pos.symbol].append(pos)

        for symbol, symbol_positions in positions_by_symbol.items():
            # 1. Naked Position Scanner
            # Check for short options without underlying or protective legs
            short_calls = [p for p in symbol_positions if p.instrument_type == 'CALL' and p.quantity < 0]
            short_puts = [p for p in symbol_positions if p.instrument_type == 'PUT' and p.quantity < 0]
            long_calls = [p for p in symbol_positions if p.instrument_type == 'CALL' and p.quantity > 0]
            long_puts = [p for p in symbol_positions if p.instrument_type == 'PUT' and p.quantity > 0]
            futures = [p for p in symbol_positions if p.instrument_type == 'FUTURE']
            
            # Simple logic: Short Call needs Long Call (higher strike?) or Long Future
            for sc in short_calls:
                covered = False
                # Check for Long Future
                if any(f.quantity > 0 for f in futures):
                    covered = True
                # Check for Long Call (Spread)
                elif any(lc.quantity > 0 for lc in long_calls):
                    covered = True # Simplified check
                
                if not covered:
                    critical_alerts.append(f"CRITICAL: Naked Short Call detected on {symbol}. Unlimited risk!")
                    is_safe = False

            for sp in short_puts:
                covered = False
                # Check for Short Future (rare) or Long Put (Spread)
                if any(lp.quantity > 0 for lp in long_puts):
                    covered = True
                
                if not covered:
                    # Naked puts are risky but defined risk (strike price), so maybe just a warning or high alert
                    warnings.append(f"WARNING: Naked Short Put on {symbol}. Ensure cash secured.")

            # 2. Gamma Risk (0DTE)
            # Check for short options expiring today/tomorrow with high gamma
            today = datetime.now().date()
            for pos in symbol_positions:
                if pos.quantity < 0 and (pos.instrument_type in ['CALL', 'PUT']):
                    try:
                        expiry = datetime.strptime(pos.expiry_date, "%Y-%m-%d").date()
                        days_to_expiry = (expiry - today).days
                        
                        if days_to_expiry <= 1:
                            if abs(pos.gamma) > 0.05: # Threshold for high gamma
                                critical_alerts.append(f"GAMMA ALERT: High gamma risk on 0DTE/1DTE short position {symbol} {pos.instrument_type}. Price swings can be rapid.")
                                is_safe = False
                    except ValueError:
                        pass # Invalid date format

            # 3. IV Trap
            # Buying options when IV is extremely high
            for pos in symbol_positions:
                if pos.quantity > 0 and (pos.instrument_type in ['CALL', 'PUT']):
                    if pos.iv > 80: # High IV threshold
                        warnings.append(f"IV TRAP: Buying {symbol} options with IV {pos.iv}%. High probability of IV crush.")

        # 4. Weekend Carry Risk
        # Check if today is Friday and time is post 3 PM (Mock check)
        # In real app, check datetime.now()
        is_friday_afternoon = datetime.now().weekday() == 4 and datetime.now().hour >= 15
        if is_friday_afternoon:
            for pos in positions:
                if pos.quantity < 0 and pos.theta > 50: # High theta decay risk if gap opening
                     warnings.append(f"WEEKEND RISK: Carrying high risk short position on {pos.symbol} over weekend.")

        action = "Review Critical Alerts immediately." if not is_safe else None

        return DerivativesRiskScanResult(
            is_safe=is_safe,
            warnings=warnings,
            critical_alerts=critical_alerts,
            action_required=action
        )

derivatives_risk_service = DerivativesRiskService()
