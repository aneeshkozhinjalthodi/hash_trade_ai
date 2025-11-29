# HashTrade AI - Project Documentation

## Project Overview
**HashTrade AI** is a next-generation FinTech trading platform that leverages Artificial Intelligence to generate high-quality swing trading ideas and perform deep fundamental analysis. The platform is built with a modern, dark-themed UI and a robust, scalable backend.

## Key Features

### 1. AI Trade Idea Generator
- **Functionality**: Analyzes market data, news sentiment, and technical indicators to suggest actionable swing trading opportunities.
- **Inputs**: User goals (e.g., "High growth tech stocks").
- **Outputs**: Structured trade cards with entry, target, stop-loss, and confidence scores.
- **Tech**: Powered by **Google Gemini LLM**.

### 2. Fundamental Analysis Agent
- **Functionality**: Performs a deep-dive analysis of a specific company.
- **Data Sources**:
    - Company Filings & Results
    - Earnings Call Transcripts
    - Shareholding Patterns
    - Bulk/Block Deals
    - Sector Fundamentals
- **Output**: A comprehensive report covering financial performance, business strengths/risks, and valuation.

### 3. Market Intelligence
- **News Integration**: Real-time news from **Marketaux** and **NewsData.io**.
- **Sentiment Analysis**: AI-driven sentiment scoring (Positive/Negative/Neutral) for news articles.

### 4. Modern User Interface
- **Theme**: Premium dark mode (`#0B0F19`) with glassmorphism effects.
- **Interactivity**: Smooth animations, hover effects, and dynamic charts.
- **Responsiveness**: Fully responsive design for desktop and tablet.

## System Architecture

The system follows a microservices-ready architecture, currently containerized with Docker.

- **Frontend**: React (Vite) + Tailwind CSS.
- **Backend**: FastAPI (Python) serving REST endpoints.
- **Database**: PostgreSQL for persistent storage.
- **AI Engine**: Orchestrates data fetching and LLM interaction.

*For a detailed diagram, see [architecture.md](./architecture.md).*

## Design System

We have established a consistent design language to ensure a premium look and feel.

- **Primary Color**: Electric Blue (`#3B82F6`)
- **Background**: Deep Dark (`#0B0F19`)
- **Typography**: Inter (Google Fonts)
- **Components**: Glassmorphic cards, gradient text, and rounded inputs.

*For full design guidelines, see [design_system.md](./design_system.md).*

## Setup & Installation

### Docker Setup (Recommended for Backend)
1.  Navigate to `hashtrade_ai`.
2.  Run `docker-compose up --build`.
3.  Backend API: `http://localhost:8000`.

### Local Development
- **Frontend**: `cd frontend && npm run dev` (Port 5173).
- **Backend**: `cd hashtrade_ai && uvicorn app.main:app --reload` (Port 8000).

## Testing
- **API Docs**: Access Swagger UI at `http://localhost:8000/docs`.
- **Frontend**: Navigate to `/trade-ideas` or `/analysis` to test agents.
