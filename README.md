# EnterpriseDocuBot 🤖⚖️

EnterpriseDocuBot is an **Intelligent Contract Analysis & Generation Engine** designed to solve a critical problem in legal AI: **Hallucinations.** 

Standard AI models often "guess" legal language, which is dangerous in a professional setting. EnterpriseDocuBot solves this by implementing a **Retrieval-Augmented Generation (RAG)** pipeline and an agentic workflow to ensure every response is grounded in approved, real-world legal templates.

## 📖 Project Overview

### The Problem
When using general-purpose LLMs for legal drafting, the AI may create clauses that look professional but are legally unsound or inconsistent with company policy.

### The Solution
EnterpriseDocuBot doesn't rely solely on the AI's memory. Instead, it acts like a junior lawyer with a company handbook:
1. **Private Library:** It uses a vector database (ChromaDB) to store approved legal clauses.
2. **Semantic Retrieval:** When a user asks a question, the system finds the most mathematically similar "real" clauses from the library.
3. **Grounded Generation:** The AI uses these real clauses as a reference to draft or analyze the document.
4. **Quality Gate:** Every output is passed through a dedicated **Validation Node** to ensure legal soundness before it reaches the user.

## ⚙️ How it Works

The system uses a stateful graph orchestrated by **LangGraph**:

`User Query` $\rightarrow$ `Router Node` (Draft vs Analyze) $\rightarrow$ `Retrieval Node` (RAG Search) $\rightarrow$ `Worker Node` (Generation) $\rightarrow$ `Validation Node` $\rightarrow$ `Final Response`

- **Routing:** Dynamically determines if the user wants to create a new clause or analyze an existing one.
- **RAG:** Uses **Google Gemini Embeddings** to find contextually relevant clauses from **ChromaDB**.
- **Validation:** A final check step to mitigate risks and ensure compliance.

## 🌟 Key Features
- **Dynamic Routing:** Automatically detects user intent to streamline the workflow.
- **Semantic RAG:** Moves beyond keyword search to find clauses based on *meaning*.
- **Agentic State Management:** Tracks the context of a request across multiple specialized nodes.
- **FastAPI Backend:** A production-ready REST API with automatic Swagger documentation.

## 🛠️ Tech Stack
- **Frontend:** `React`, `Vite`, `Vanilla CSS`
- **Orchestration:** `LangGraph`, `LangChain`
- **LLM & Embeddings:** `Google Gemini` (`langchain-google-genai`)
- **Vector Database:** `ChromaDB`
- **API Framework:** `FastAPI`, `Uvicorn`
- **Environment Management & Deployment:** `uv`, `Docker Compose`, `GitHub Actions`

## 🚀 Quickstart (Docker Compose Recommended)

1. Clone and enter the directory:
   ```bash
   git clone <repository_url>
   cd EnterpriseDocuBot
   ```
2. Set up your `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Run the complete stack using Docker Compose:
   ```bash
   docker compose up -d --build
   ```
4. Access the applications:
   - **React Frontend (Chat UI):** `http://localhost:5173`
   - **FastAPI Backend (Swagger UI):** `http://localhost:8000/docs`

> Note: To manually run locally without Docker, ensure `uv` and `npm` are installed. Seed the vector database with `PYTHONPATH=src uv run python mock_data/seed.py`, start the backend with `PYTHONPATH=src uv run python src/main.py`, and start the frontend with `cd frontend && npm run dev`.

## 🌍 Live Demo & GitHub Pages Deployment

The React frontend is automatically deployed to GitHub Pages via GitHub Actions.
You can access the live user interface at: `https://<your-username>.github.io/EnterpriseDocuBot/`

**IMPORTANT**: Because GitHub Pages only hosts static files, the frontend still needs the FastAPI backend to function. To use the live GitHub Pages UI:
1. Clone the repository and run the backend locally: `docker compose up -d backend` (or manually run `src/main.py`).
2. Navigate to the GitHub Pages URL. The live frontend is configured to communicate with your local backend at `http://localhost:8000`.

## 📊 Codebase Visualization
Explore the architecture through our generated knowledge graph:
- **Interactive Graph:** Open [`graphify-out/graph.html`](graphify-out/graph.html) to see the 3D node architecture.
- **Graph Report:** Review [Graph Report](graphify-out/GRAPH_REPORT.md) for a summary of core abstractions and LangGraph connections.

## 📂 Project Structure
- `frontend/`: React frontend powered by Vite with a modern Chat UI.
- `src/`: Source code (FastAPI app, LangGraph agent logic, RAG utilities).
- `mock_data/`: Seed scripts and sample legal clauses.
- `docs/`: Detailed SRS, Architecture, and User manuals.
- `docker-compose.yml`: Local deployment configuration.

## 📚 Documentation
All detailed specifications and documentation (System Architecture, User Manual, Interview Q&A) are now built directly into the React Frontend as an interactive Markdown viewer. 

To read them, simply run the frontend (or visit the GitHub Pages link) and use the top navigation bar! The raw markdown files are also available in the `docs/` folder.
