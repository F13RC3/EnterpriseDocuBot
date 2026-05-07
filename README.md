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
- **Orchestration:** `LangGraph`, `LangChain`
- **LLM & Embeddings:** `Google Gemini` (`langchain-google-genai`)
- **Vector Database:** `ChromaDB`
- **API Framework:** `FastAPI`, `Uvicorn`
- **Environment Management:** `uv`

## 🚀 Quickstart

1. Ensure [`uv`](https://docs.astral.sh/uv/) is installed.
2. Clone and enter the directory:
   ```bash
   git clone <repository_url>
   cd EnterpriseDocuBot
   ```
3. Install dependencies:
   ```bash
   uv sync
   ```
4. Set up your `.env` file:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
5. Seed the vector database:
   ```bash
   PYTHONPATH=. uv run python mock_data/seed.py
   ```
6. Start the server:
   ```bash
   PYTHONPATH=. uv run python src/main.py
   ```
7. Test the API at `http://localhost:8000/docs`

## 📊 Codebase Visualization
Explore the architecture through our generated knowledge graph:
- **Interactive Graph:** Open [`graphify-out/graph.html`](graphify-out/graph.html) to see the 3D node architecture.
- **Graph Report:** Review [Graph Report](graphify-out/GRAPH_REPORT.md) for a summary of core abstractions and LangGraph connections.

## 📂 Project Structure
- `src/`: Source code (FastAPI app, LangGraph agent logic, RAG utilities).
- `mock_data/`: Seed scripts and sample legal clauses.
- `docs/`: Detailed SRS, Architecture, and User manuals.
- `graphify-out/`: Knowledge graph outputs.

## 📚 Documentation
Detailed specifications are available in the `docs/` folder:
- [Project Charter](docs/project_charter.md) | [SRS](docs/srs.md) | [System Architecture](docs/system_architecture.md) | [User Manual](docs/user_manual.md)
