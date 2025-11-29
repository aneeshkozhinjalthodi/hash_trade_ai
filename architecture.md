# HashTrade AI - System Architecture & Workflow

This diagram illustrates the current architecture, including the **Trade Idea Generator** and **Fundamental Analysis Agent**, running within a Dockerized environment.

```mermaid
graph TD
    %% Nodes
    User([User])
    
    subgraph "Frontend (React + Vite)"
        UI["Dashboard / Trade Ideas / Analysis"]
        API_Client["Axios API Client"]
    end
    
    subgraph "Docker Environment"
        subgraph "Backend Container (FastAPI)"
            API_Gateway["API Routes / Endpoints"]
            Auth["Auth Service (JWT)"]
            
            subgraph "AI Agent Engine"
                Service["Agent Service"]
                Fund_Agent["Fundamental Analysis Agent"]
                Planner["Planner (Prompt Engine)"]
                Risk["Risk Engine"]
                Tools["Tools / Data Fetchers"]
            end
        end
        
        subgraph "Database Container"
            DB[("PostgreSQL Database")]
        end
    end
    
    subgraph "External Services"
        Gemini["Google Gemini LLM"]
        Marketaux["Marketaux News API"]
        NewsData["NewsData.io API"]
        YFinance["Yahoo Finance API"]
    end

    %% Workflow Connections
    User -- "Interacts" --> UI
    UI -- "HTTP Requests" --> API_Client
    API_Client -- "REST API" --> API_Gateway
    
    API_Gateway -- "Auth" --> Auth
    API_Gateway -- "Trade Ideas" --> Service
    API_Gateway -- "Fund. Analysis" --> Fund_Agent
    
    %% Trade Idea Flow
    Service -- "Fetch Data" --> Tools
    Tools --> Marketaux
    Tools --> NewsData
    Service --> Planner
    Planner --> Gemini
    Service --> Risk
    Service --> DB
    
    %% Fundamental Analysis Flow
    Fund_Agent -- "Fetch Company Data" --> Tools
    Tools --> NewsData
    Fund_Agent -- "Analyze Fundamentals" --> Gemini
    
    %% Data Persistence
    API_Gateway -- "Query/Save" --> DB
    
    %% Styling
    classDef frontend fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef backend fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef external fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
    classDef db fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef docker fill:#f5f5f5,stroke:#666,stroke-width:2px,stroke-dasharray: 5 5;
    
    class UI,API_Client frontend;
    class API_Gateway,Auth,Service,Fund_Agent,Planner,Risk,Tools backend;
    class Gemini,Marketaux,NewsData,YFinance external;
    class DB db;
    class Docker Environment docker;
```

## Component Breakdown

1.  **Frontend**: React application with a modern, dark-themed UI (Tailwind CSS). Handles user interaction for Trade Ideas and Fundamental Analysis.
2.  **Backend API**: Dockerized FastAPI server.
    *   **Agent Service**: Orchestrates the Trade Idea Generation workflow.
    *   **Fundamental Analysis Agent**: Specialized agent for deep-dive company analysis using filings and transcripts.
    *   **Tools**: Shared utilities to fetch data from NewsData.io, Marketaux, and Yahoo Finance.
3.  **Database**: Dockerized PostgreSQL instance for persisting user data and trade history.
4.  **External Services**:
    *   **Google Gemini**: The core intelligence for generating ideas and analyzing reports.
    *   **News & Market Data**: Real-time financial data sources.
