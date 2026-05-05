# Project Scope Statement

## 1. Project Overview
EnterpriseDocuBot is a backend API service engineered to intelligently draft new contract clauses or analyze existing legal concepts using Agentic AI orchestration.

## 2. In-Scope Items
- **Agent Orchestration (LangGraph):** A multi-step workflow with a dynamic router, retriever, drafter, analyzer, and validator.
- **Vector Database (ChromaDB):** Local vector store to ingest, embed, and retrieve standard contractual clauses.
- **REST API (FastAPI):** A `/process` endpoint to accept JSON payloads containing natural language legal queries.
- **AI Integration (Google Gemini):** Using `gemini-2.5-flash` for reasoning and `gemini-embedding-2` for text embedding.
- **Mock Data Engine:** A seeding script to populate initial mock clauses (Confidentiality, Term, Indemnification, Governing Law).

## 3. Out-of-Scope Items
- Web-based Graphical User Interface (GUI).
- Authentication and Authorization (OAuth, JWT).
- Parsing physical PDF or Word documents (OCR).
- Production cloud deployment (AWS/GCP infrastructure setup).

## 4. Deliverables
- Fully functional Python project managed via `uv`.
- REST API codebase (`src/main.py`).
- Agentic logic (`src/agent/`).
- Vectorstore implementation (`src/rag/`).
- Project documentation.

## 5. Acceptance Criteria
- The system must successfully route "drafting" and "analysis" queries to their respective paths.
- The system must retrieve at least one relevant context document from ChromaDB for a matching query.
- The system must return a valid JSON response containing the AI's output.
