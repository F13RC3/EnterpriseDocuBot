# EnterpriseDocuBot — High-Level Design (HLD)

> **Document ID:** HLD-EDB-001  
> **Version:** 1.0  
> **Date:** 2026-06-08  
> **Status:** Draft  
> **Author:** Engineering Team  

---

## 1. Executive Summary

EnterpriseDocuBot is an **Intelligent Contract Analysis & Generation Engine** that solves the critical problem of **LLM hallucination** in legal workflows. Instead of relying on a model's internal parametric memory, it uses a **Retrieval-Augmented Generation (RAG)** pipeline combined with an **agentic state machine** (LangGraph) to ensure every drafted or analyzed clause is grounded in pre-approved, real-world legal templates stored in a vector database.

This HLD describes the system architecture, component interactions, data flows, and design decisions at a level sufficient for implementation planning and stakeholder review.

---

## 2. Design Goals & Principles

| # | Principle | Rationale |
|---|-----------|-----------|
| 1 | **Grounded Generation** | All AI outputs must be anchored to retrieved, approved clauses to eliminate hallucination risk. |
| 2 | **Observability** | The agentic workflow is explicit (graph-based) so every decision point is inspectable. |
| 3 | **Minimal State** | The `AgentState` carries only what is necessary; no hidden context between nodes. |
| 4 | **Pluggability** | LLM, embedding model, and vector store are wrapped behind thin abstraction layers for easy substitution. |
| 5 | **Production API First** | The primary interface is a REST API (FastAPI), not a CLI or notebook. |

---

## 3. System Context

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              EnterpriseDocuBot                               │
│  ┌─────────────┐    ┌──────────────────┐    ┌──────────────────────────┐   │
│  │   Client    │───→│  FastAPI Server  │───→│   LangGraph Agent Core   │   │
│  │ (Swagger/   │    │   (src/main.py)  │    │ (graph.py / nodes.py)    │   │
│  │  cURL/FE)   │←───│                  │←───│                          │   │
│  └─────────────┘    └──────────────────┘    └──────────────────────────┘   │
│                              │                                               │
│                              ↓                                               │
│                    ┌──────────────────┐                                      │
│                    │   ChromaDB       │                                      │
│                    │  (vectorstore)   │                                      │
│                    └──────────────────┘                                      │
│                              ↑                                               │
│                    ┌──────────────────┐                                      │
│                    │ Google Gemini    │                                      │
│                    │ (LLM + Embeddings)                                     │
│                    └──────────────────┘                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### External Actors
- **Client/Frontend**: Any HTTP consumer — Swagger UI, Postman, React frontend, or CI pipeline.
- **Google Gemini API**: Provides both generative (`gemini-2.5-flash`) and embedding (`gemini-embedding-2`) capabilities.

---

## 4. Component Architecture

### 4.1 Component Inventory

| Component | File(s) | Responsibility |
|-----------|---------|----------------|
| **API Gateway** | `src/main.py` | Exposes REST endpoints, validates request/response schemas, handles exceptions. |
| **State Definition** | `src/agent/state.py` | Typed dictionary (`AgentState`) that is the single source of truth for workflow state. |
| **Graph Orchestrator** | `src/agent/graph.py` | Constructs the LangGraph `StateGraph`, wires nodes, defines conditional edges. |
| **Reasoning Nodes** | `src/agent/nodes.py` | Implements the business logic of each node (route, retrieve, analyze, draft, validate). |
| **Vector Store** | `src/rag/vectorstore.py` | Wraps ChromaDB persistence, embedding generation, and semantic retrieval. |
| **Configuration** | `src/config.py` | Loads environment variables via Pydantic Settings. |
| **Seeder** | `mock_data/seed.py` | Bootstraps the vector DB with sample legal clauses. |

### 4.2 Component Diagram (Detailed)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API Gateway Layer                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  FastAPI App (src/main.py)                                          │   │
│  │   • POST /process                                                   │   │
│  │   • QueryRequest  → Pydantic validation                             │   │
│  │   • QueryResponse ← filtered state fields                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                                      ▼                                      │
│                            AgentState (TypedDict)                            │
│  {query, action, context[], draft, analysis, validation_status, errors[]}   │
│                                      │                                      │
│                              ┌───────┴───────┐                              │
│                              ▼               ▼                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      LangGraph Workflow Engine                       │   │
│  │                         (src/agent/graph.py)                         │   │
│  │                                                                      │   │
│  │   ┌────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐   │
│  │   │ Router │────→│ Retriever│────→│ Analyzer │────→│Validator │   │
│  │   │  Node  │     │   Node   │     │   Node   │     │   Node   │   │
│  │   └────────┘     └──────────┘     └──────────┘     └──────────┘   │
│  │        │                │                                 ↑        │   │
│  │        │                └────────→┌──────────┐             │        │   │
│  │        │                          │ Drafter  │─────────────┘        │   │
│  │        │                          │   Node   │                      │   │
│  │        │                          └──────────┘                      │   │
│  │        │                                                              │   │
│  │   [action = "draft"]              [action = "retrieve_and_analyze"]   │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                      │                                      │
│                    ┌─────────────────┼─────────────────┐                    │
│                    ▼                 ▼                 ▼                    │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────┐  │
│  │ Google Gemini Flash  │  │ Google Gemini Embed  │  │   ChromaDB       │  │
│  │ (Generation)         │  │ (Sentence Embeddings)│  │  (Persistent)    │  │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Agent State Machine (LangGraph)

### 5.1 State Schema

```python
class AgentState(TypedDict):
    query: str               # Original user input
    action: str              # "draft" | "retrieve_and_analyze"
    context: List[Document]  # Retrieved clauses from ChromaDB
    draft: str               # Generated contract text
    analysis: str            # Generated analysis text
    validation_status: str   # Compliance review output
    errors: List[str]        # Accumulated error messages
```

**Design Rationale**: A single flat `TypedDict` is used instead of nested models because LangGraph requires the state object to be transparently mergeable across node boundaries. Every node returns a *partial dictionary* that LangGraph merges into the global state.

### 5.2 Node Descriptions

| Node | Function | Purpose |
|------|----------|---------|
| **router** | `route_query` | Uses the LLM to classify intent as either drafting new text or analyzing existing concepts. |
| **retriever** | `retrieve` | Calls `RAGStore.retrieve()` to fetch top-k semantically similar clauses from ChromaDB. |
| **analyzer** | `analyze` | Generates a risk assessment or explanation based on the retrieved context. |
| **drafter** | `draft` | Generates new legal text conditioned on the user query and retrieved examples. |
| **validator** | `validate` | Performs a compliance and quality review on either the `draft` or `analysis` field. |

### 5.3 Edge Logic (Conditional Routing)

```text
Entry ──→ router

router ──[action == "draft"]──────────────→ retriever
router ──[action == "retrieve_and_analyze"]→ retriever

retriever ──[action == "draft"]───────────→ drafter
retriever ──[action == "retrieve_and_analyze"]→ analyzer

drafter ──→ validator
analyzer ──→ validator

validator ──→ END
```

> **Note on Convergence**: Both `drafter` and `analyzer` unconditionally route to `validator`. This ensures a single quality gate regardless of which path was taken.

---

## 6. Data Flow (Request Lifecycle)

### 6.1 Happy Path — Draft Request

```text
1. Client POST /process { "query": "Draft a confidentiality clause for a SaaS vendor" }
   └── FastAPI validates → creates initial AgentState

2. graph.invoke(state)
   └── router node classifies → action = "draft"

3. retriever node ──→ RAGStore.retrieve(query, n=3)
   └── embed_query → ChromaDB.query → returns [Doc1, Doc2, Doc3]
   └── state.context = [Doc1, Doc2, Doc3]

4. drafter node ──→ LLM prompt(query + context)
   └── generates new clause text
   └── state.draft = "<generated text>"

5. validator node ──→ LLM prompt(draft + query)
   └── generates compliance review
   └── state.validation_status = "Compliant: ..."

6. FastAPI formats → QueryResponse
   └── returns { query, action, draft, validation_status }
```

### 6.2 Happy Path — Analysis Request

Same as above, but steps 4–5 execute `analyzer` instead of `drafter`, producing `state.analysis`.

### 6.3 Error Handling Flow

```text
• Any unhandled exception inside a node → propagated up through LangGraph
• graph.invoke() raises → caught in FastAPI → HTTP 500 with exception detail
• Future enhancement: per-node try/except → append to state.errors[] → continue to END
```

---

## 7. RAG & Vector Store Design

### 7.1 Embedding Strategy

| Attribute | Decision |
|-----------|----------|
| **Provider** | Google Gemini (`models/gemini-embedding-2`) |
| **Dimensionality** | Managed by provider (no explicit configuration) |
| **Query Embedding** | `embeddings.embed_query(text)` — synchronous, single-vector |
| **Document Embedding** | `embeddings.embed_query(text)` — same method for consistency |

### 7.2 Retrieval Parameters

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `n_results` | 3 | Enough context for grounding; avoids noise from low-similarity hits. |
| **Distance Metric** | Default (cosine via ChromaDB) | Standard for semantic search. |
| **Persistence** | `./chroma_db` directory | Simple file-based storage; no external DB server required. |

### 7.3 Document Schema (ChromaDB)

```json
{
  "id": "clause_1",
  "text": "Confidentiality: The Receiving Party shall keep confidential...",
  "metadata": {
    "type": "confidentiality",
    "risk_level": "high"
  }
}
```

> **Metadata Strategy**: Lightweight tagging (`type`, `risk_level`) enables future filtering without adding schema complexity now.

---

## 8. API Contract

### 8.1 Endpoint

```http
POST /process
Content-Type: application/json
```

### 8.2 Request Body — `QueryRequest`

```json
{
  "query": "Analyze the risk in a clause that lacks indemnification"
}
```

### 8.3 Response Body — `QueryResponse`

```json
{
  "query": "Analyze the risk in a clause that lacks indemnification",
  "action": "retrieve_and_analyze",
  "draft": null,
  "analysis": "The absence of an indemnification clause exposes...",
  "validation_status": "Compliant: analysis identifies key exposures..."
}
```

**Nullability Rules**:
- `draft` is populated only when `action == "draft"`
- `analysis` is populated only when `action == "retrieve_and_analyze"`
- `validation_status` is always present on success

---

## 9. Security & Compliance Design

| Concern | Mitigation |
|---------|------------|
| **API Key Exposure** | Keys loaded via `.env` → Pydantic Settings; never hardcoded. |
| **Key Propagation** | `config.py` sets `GOOGLE_API_KEY` env var once; LLM/embedding clients read from environment. |
| **Input Injection** | Pydantic models enforce type and structure on `/process`. |
| **Data Persistence** | ChromaDB runs locally on disk; no cloud vector DB — data stays on-prem by default. |
| **PII in Logs** | FastAPI default logging may capture request bodies — recommend disabling in production or enabling log redaction. |

---

## 10. Deployment & Runtime View

### 10.1 Startup Sequence

```text
1. uvicorn starts → loads src/main.py
2. main.py imports graph.py → build_graph() compiles the StateGraph
3. graph.py imports nodes.py → ChatGoogleGenerativeAI instantiated
4. nodes.py imports vectorstore.py → RAGStore connects to ./chroma_db
5. RAGStore initializes embeddings → requires GOOGLE_API_KEY env var
6. Server ready on 0.0.0.0:8000
```

### 10.2 Runtime Dependency Graph

```text
main.py
├── graph.py
│   ├── state.py
│   └── nodes.py
│       ├── state.py
│       ├── config.py
│       └── vectorstore.py
│           └── config.py
└── vectorstore.py (indirect via nodes)
```

---

## 11. Scalability & Extensibility

| Extension | Approach | Effort |
|-----------|----------|--------|
| **More seed data** | Extend `mock_data/seed.py` with additional clauses. | Low |
| **Metadata filtering** | Add `where` clause to `collection.query()` using ChromaDB metadata filters. | Low |
| **Async embeddings** | Replace `embed_query` with `aembed_query` to unblock the event loop under load. | Medium |
| **Streaming responses** | Use `graph.stream()` + FastAPI `StreamingResponse` for real-time token delivery. | Medium |
| **Multi-model routing** | Route to different Gemini models (Flash vs. Pro) based on query complexity. | Medium |
| **Multi-tenant DB** | Add `tenant_id` to collection names or metadata for isolation. | Medium |
| **Auth layer** | Add OAuth2/JWT middleware in `main.py`. | Low |
| **Logging & Metrics** | Integrate structlog + Prometheus instrumentation. | Low |

---

## 12. Technology Stack Summary

| Layer | Technology | Version Spec |
|-------|-----------|--------------|
| **Language** | Python | >= 3.12 |
| **Package Manager** | `uv` | latest |
| **Web Framework** | FastAPI | >= 0.136.1 |
| **Server** | Uvicorn | >= 0.46.0 |
| **Agent Framework** | LangGraph | >= 1.1.10 |
| **LLM SDK** | LangChain + `langchain-google-genai` | >= 1.2.17, >= 4.2.2 |
| **LLM Model** | Google Gemini Flash | `gemini-2.5-flash` |
| **Embeddings** | Google Gemini Embedding | `models/gemini-embedding-2` |
| **Vector DB** | ChromaDB | >= 1.5.9 |
| **Validation** | Pydantic | >= 2.13.3 |
| **Settings** | `pydantic-settings` | latest |

---

## 13. Appendix: File Tree

```
EnterpriseDocuBot/
├── src/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Pydantic Settings (env vars)
│   ├── agent/
│   │   ├── graph.py         # LangGraph construction
│   │   ├── state.py         # AgentState TypedDict
│   │   └── nodes.py         # Business logic nodes
│   └── rag/
│       └── vectorstore.py   # ChromaDB + Gemini embeddings wrapper
├── mock_data/
│   └── seed.py              # Bootstrap sample clauses
├── docs/                    # SRS, Architecture, User Manual
├── chroma_db/               # Persistent vector store (created at runtime)
├── pyproject.toml           # UV project definition
├── .env                     # API keys (gitignored)
└── README.md
```

---

## 14. Decision Log

| ID | Decision | Alternatives Considered | Rationale |
|----|----------|------------------------|-----------|
| D1 | ChromaDB (local) | Pinecone, Weaviate, Qdrant | Zero-infrastructure setup; ChromaDB's simple persistent client matches current scale. |
| D2 | Google Gemini | OpenAI GPT-4, Anthropic Claude | Unified provider for both LLM and embeddings; cost-effective for Flash tier. |
| D3 | LangGraph vs. Chain | LangChain `SequentialChain`, CrewAI | LangGraph provides explicit conditional routing and state inspection. |
| D4 | Synchronous `invoke` | `ainvoke` / streaming | Simpler to reason about for MVP; async upgrade is non-breaking. |
| D5 | Flat `AgentState` | Nested Pydantic models | LangGraph's merge semantics work cleanly with flat `TypedDict` partial updates. |

---

> *End of Document*
