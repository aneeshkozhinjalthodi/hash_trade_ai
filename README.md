# HashTrade AI

Full-stack FinTech AI trading platform.

## Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL

## Backend Setup

1. Navigate to `hashtrade_ai`:
   ```bash
   cd hashtrade_ai
   ```

2. Create virtual environment:
   - **Mac/Linux**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```
   - **Windows**:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Environment:
   - Copy `.env.template` to `.env`:
     ```bash
     cp .env.template .env  # Mac/Linux
     # copy .env.template .env  # Windows
     ```
   - Update `DATABASE_URL` with your PostgreSQL credentials.
   - **Required API Keys**:
     - `GEMINI_API_KEY`: Google Gemini API key for AI generation.
     - `MARKETAUX_API_KEY`: For financial news.
     - `NEWSDATA_API_KEY`: Additional news source.
   - **Optional Config**:
     - `GEMINI_MODEL`: Defaults to `gemini-1.5-flash`.

5. Run Migrations:
   ```bash
   alembic upgrade head
   ```
   *Note: This will also seed the database with initial roles and admin user.*

6. Run Server:
   ```bash
   uvicorn app.main:app --reload
   ```
   API will be available at `http://localhost:8000`.
   Docs at `http://localhost:8000/docs`.

## Frontend Setup

1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run Development Server:
   ```bash
   npm run dev
   ```
   App will be available at `http://localhost:5173`.

## Testing

1. **Backend**: Use the Swagger UI at `/docs` to test endpoints.
   - Login with `admin@hashtrade.ai` / `Admin@123`.
   - Use the `access_token` to authorize.
   - Try the `/agent/run` endpoint to generate trade ideas.

2. **Frontend**:
   - Login with the admin credentials.
   - Navigate to "Trade Ideas" and click "Generate New Idea".

## Features

### 🤖 AI Agents
- **Trade Idea Generator**: Analyzes market data to suggest swing trading opportunities.
- **Fundamental Analysis Agent**: Performs deep-dive analysis on company fundamentals using filings, transcripts, and news.

### 🎨 Modern UI/UX
- **Premium Design**: Dark-themed, glassmorphism-inspired interface.
- **Interactive Dashboards**: Real-time stats, dynamic charts, and smooth animations.

## Docker Setup (Backend)

1. Navigate to `hashtrade_ai`:
   ```bash
   cd hashtrade_ai
   ```

2. Build and Run:
   ```bash
   docker-compose up --build
   ```
   The backend will be available at `http://localhost:8000`.

## System Architecture

A detailed architecture diagram is available in [architecture.md](./architecture.md). It visualizes the data flow between the React frontend, FastAPI backend, AI Agent, and external services.
