from typing import List, Dict, Any
from app.ai_agent.schemas import MarketData, FraudAlert

class MarketIntegrityScanner:
    def scan_stock(self, market_data: MarketData) -> List[FraudAlert]:
        alerts = []
        
        # 1. Fake Volume (Churning) Detection
        # Logic: Volume is huge (e.g., > 5x average) but price movement is minimal (< 2%)
        # This suggests operators exchanging shares to create fake liquidity.
        if market_data.avg_volume > 0:
            vol_ratio = market_data.volume / market_data.avg_volume
            if vol_ratio > 5.0 and abs(market_data.price_change_pct) < 2.0:
                alerts.append(FraudAlert(
                    alert_type="FAKE_VOLUME",
                    risk_level="HIGH",
                    details=f"Abnormal volume ({vol_ratio:.1f}x avg) with flat price action. Possible churning.",
                    evidence={"volume": market_data.volume, "avg_volume": market_data.avg_volume, "price_change": market_data.price_change_pct}
                ))

        # 2. Pump and Dump Detection
        # Logic: Price up significantly (> 20%) AND High Social Buzz (> 80)
        # Suggests retail is being lured in by hype.
        if market_data.price_change_pct > 20.0 and market_data.social_buzz_score > 80:
             alerts.append(FraudAlert(
                alert_type="PUMP_DUMP",
                risk_level="CRITICAL",
                details="Price skyrocketing with extreme social media hype. Classic Pump & Dump signature.",
                evidence={"price_change": market_data.price_change_pct, "social_score": market_data.social_buzz_score}
            ))

        # 3. Promoter Exit Warning
        # Logic: Promoter holding decreased by > 5% in last quarter
        if market_data.promoter_holding_change < -5.0:
             alerts.append(FraudAlert(
                alert_type="PROMOTER_EXIT",
                risk_level="HIGH",
                details=f"Promoters sold {abs(market_data.promoter_holding_change)}% stake recently. Lack of confidence.",
                evidence={"holding_change": market_data.promoter_holding_change}
            ))

        # 4. Telegram/Operator Trap (Mock List)
        # Logic: Check if symbol is in a "watchlist" of known manipulated stocks
        KNOWN_PUMP_STOCKS = ["SCAMCO", "TRAPLTD", "OPERATORZ"]
        if market_data.symbol in KNOWN_PUMP_STOCKS:
             alerts.append(FraudAlert(
                alert_type="TELEGRAM_PUMP",
                risk_level="CRITICAL",
                details=f"Stock {market_data.symbol} found in known Telegram pump channels.",
                evidence={"source": "Telegram Watchlist"}
            ))

        return alerts

fraud_scanner = MarketIntegrityScanner()
