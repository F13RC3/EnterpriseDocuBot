# EnterpriseDocuBot 🤖⚖️

EnterpriseDocuBot is an Intelligent Contract Analysis & Generation Engine powered by Agentic AI. It uses a LangGraph multi-step reasoning workflow to dynamically route legal queries, retrieve context from a ChromaDB vector store, and generate or analyze legal drafts using Google Gemini.

## 🌟 Key Features
- **Dynamic Routing:** Automatically detects whether the user wants to draft a new clause or analyze an existing topic.
- **RAG Integration:** Retrieves relevant standard clauses from a local ChromaDB instance to ensure contextual accuracy.
- **Validation Node:** Automatically validates generated drafts or analyses for legal soundness.
- **FastAPI Backend:** Exposes a clean REST API interface with automatic Swagger documentation.

## 📊 Codebase Visualization (Graphify)
We have generated a code network graph to make exploring this codebase easier!
- **Interactive Graph:** Open [`graphify-out/graph.html`](graphify-out/graph.html) in your web browser to explore the 3D node architecture and see how different parts of the workflow connect.
- **Graph Report:** Check out the [Graph Report](graphify-out/GRAPH_REPORT.md) for a summary of detected communities, core abstractions, and LangGraph connections.

## 🚀 Quickstart

1. Ensure [`uv`](https://docs.astral.sh/uv/) is installed on your system.
2. Clone this repository and navigate to the root directory:
   ```bash
   git clone <repository_url>
   cd EnterpriseDocuBot
   ```
3. Install project dependencies and set up the virtual environment:
   ```bash
   uv sync
   ```
4. Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```
5. Seed the vector database with mock legal data:
   ```bash
   PYTHONPATH=. uv run python mock_data/seed.py
   ```
6. Start the FastAPI server:
   ```bash
   PYTHONPATH=. uv run python src/main.py
   ```
7. Open your browser and navigate to `http://localhost:8000/docs` to test the API!

## 📂 Project Structure
- `src/`: Main source code, including the FastAPI app (`main.py`), LangGraph agent logic (`agent/`), and RAG utilities (`rag/`).
- `mock_data/`: Seed scripts and sample legal clauses to populate ChromaDB.
- `docs/`: Comprehensive project documentation.
- `graphify-out/`: Codebase visualization graphs and reports.

## 📚 Documentation
Please check the `docs/` folder for comprehensive project documentation:
- [Project Charter](docs/project_charter.md)
- [Scope Statement](docs/scope_statement.md)
- [Software Requirements Specification (SRS)](docs/srs.md)
- [System Architecture](docs/system_architecture.md)
- [Test Plan](docs/test_plan.md)
- [User Manual](docs/user_manual.md)
- [Status Report](docs/status_report.md)

## 🛠️ Tech Stack
- **Python Package Manager:** `uv`
- **API Framework:** `FastAPI`, `Uvicorn`
- **Agent Orchestration:** `LangChain`, `LangGraph`
- **Vector Database:** `ChromaDB`
- **LLM Provider:** `Google Gemini` (`langchain-google-genai`)
