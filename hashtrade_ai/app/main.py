from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.auth import routes as auth_routes
from app.ai_agent import routes as agent_routes
from app.news import routes as news_routes

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(agent_routes.router, prefix=f"{settings.API_V1_STR}/agent", tags=["agent"])
app.include_router(news_routes.router, prefix=f"{settings.API_V1_STR}/news", tags=["news"])

@app.get("/")
def root():
    return {"message": "Welcome to HashTrade AI API"}
