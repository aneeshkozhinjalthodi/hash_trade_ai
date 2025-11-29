from typing import Dict, Any
from app.ai_agent.schemas import AgentAction

import google.generativeai as genai
from app.core.config import settings

class AgentPlanner:
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        else:
            self.model = None

    def plan(self, goal: str, context: Dict[str, Any]) -> AgentAction:
        if not self.model:
            return AgentAction(action_type="NO_ACTION", payload={"message": "Gemini Key Missing or Invalid."})

        # Construct Prompt
        prompt = f"""
        You are a financial trading assistant.
        Goal: {goal}
        Context: {context}
        
        Decide the next best action.
        
        If the goal is to "generate bulk ideas" or "find trades":
        1. Analyze the provided news in the Context.
        2. Identify 5-10 potential stocks to trade based on the news.
        3. For each stock, determine Direction (BUY/SELL) and Reason.
        4. Output strictly in JSON format with action_type="SUGGEST_BULK_TRADES".
        
        Output Format:
        {{
            "action_type": "SUGGEST_BULK_TRADES" | "GENERATE_EXPLANATION" | "NO_ACTION",
            "payload": {{
                "ideas": [
                    {{ "symbol": "STOCK_A", "company_name": "Company A Ltd", "direction": "BUY", "reason": "..." }},
                    {{ "symbol": "STOCK_B", "company_name": "Company B Ltd", "direction": "SELL", "reason": "..." }}
                ]
            }}
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Simple parsing (in production, use robust JSON parser)
            import json
            text = response.text.strip()
            if text.startswith("```json"):
                text = text[7:-3]
            data = json.loads(text)
            return AgentAction(**data)
        except Exception as e:
            return AgentAction(
                action_type="NO_ACTION",
                payload={"message": f"Error generating plan: {str(e)}"}
            )

planner = AgentPlanner()
