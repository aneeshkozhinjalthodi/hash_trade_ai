from typing import List, Dict, Any
from datetime import datetime, timedelta
from app.ai_agent.schemas import TradeHistory, BehaviorAlert, UserProfile

class BehavioralAnalysisService:
    def analyze_behavior(self, user_profile: UserProfile, trade_history: List[TradeHistory], current_trade_context: Dict[str, Any] = None) -> List[BehaviorAlert]:
        alerts = []
        now = datetime.now()

        # 1. Revenge Trading Detection
        # Logic: >3 trades in last 15 mins AND last trade was a loss
        recent_trades = [t for t in trade_history if t.entry_time > now - timedelta(minutes=15)]
        if len(recent_trades) >= 3:
            last_trade = trade_history[-1] if trade_history else None
            if last_trade and last_trade.pnl < 0:
                alerts.append(BehaviorAlert(
                    alert_type="REVENGE_TRADING",
                    severity="BLOCK",
                    message="You are trading aggressively after a loss. High risk of revenge trading.",
                    suggested_action="TAKE_BREAK"
                ))

        # 2. Overtrading Detection
        # Logic: >10 trades today
        today_trades = [t for t in trade_history if t.entry_time.date() == now.date()]
        if len(today_trades) > 10:
             alerts.append(BehaviorAlert(
                alert_type="OVERTRADING",
                severity="WARNING",
                message=f"You have executed {len(today_trades)} trades today. Fatigue may set in.",
                suggested_action="TAKE_BREAK"
            ))

        # 3. FOMO Detection (Requires current trade context)
        if current_trade_context:
            rsi = current_trade_context.get("rsi", 50)
            price_vs_bb = current_trade_context.get("price_vs_upper_bb", 0) # % above upper BB
            
            if rsi > 80 or price_vs_bb > 2.0:
                 alerts.append(BehaviorAlert(
                    alert_type="FOMO",
                    severity="WARNING",
                    message="Entering trade at extreme technical levels (RSI > 80). Potential FOMO.",
                    suggested_action="WAIT_FOR_PULLBACK"
                ))

        # 4. Loser Holding (Disposition Effect)
        # Logic: Holding a losing position > 2x average winning holding time
        # Simplified: Check open positions (mocked as passed in history with no exit time)
        open_positions = [t for t in trade_history if t.exit_time is None]
        
        # Calculate avg holding time of winners
        winning_trades = [t for t in trade_history if t.exit_time and t.pnl > 0]
        if winning_trades:
            avg_win_duration = sum([(t.exit_time - t.entry_time).total_seconds() for t in winning_trades]) / len(winning_trades)
            
            for pos in open_positions:
                current_duration = (now - pos.entry_time).total_seconds()
                current_pnl = pos.pnl # Assumed real-time PnL updated in object
                
                if current_pnl < 0 and current_duration > (avg_win_duration * 2):
                     alerts.append(BehaviorAlert(
                        alert_type="LOSER_HOLDING",
                        severity="WARNING",
                        message=f"Holding losing position {pos.symbol} for too long ({int(current_duration/60)} mins).",
                        suggested_action="CLOSE_POSITION"
                    ))

        return alerts

behavior_service = BehavioralAnalysisService()
