# Graph Report - /home/kei0s/Documents/EnterpriseDocuBot  (2026-05-05)

## Corpus Check
- Corpus is ~2,703 words - fits in a single context window. You may not need a graph.

## Summary
- 59 nodes · 66 edges · 16 communities detected
- Extraction: 80% EXTRACTED · 20% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.57)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_RAG Store & Seeding|RAG Store & Seeding]]
- [[_COMMUNITY_Query Processing|Query Processing]]
- [[_COMMUNITY_Query Routing & Retrieval|Query Routing & Retrieval]]
- [[_COMMUNITY_Configuration|Configuration]]
- [[_COMMUNITY_Agent State|Agent State]]
- [[_COMMUNITY_Main Entry Point|Main Entry Point]]
- [[_COMMUNITY_Analyze Node|Analyze Node]]
- [[_COMMUNITY_Validate Node|Validate Node]]
- [[_COMMUNITY_Graph Builder|Graph Builder]]
- [[_COMMUNITY_Draft & Risk Analysis|Draft & Risk Analysis]]
- [[_COMMUNITY_Draft Node|Draft Node]]
- [[_COMMUNITY_Route Query Node|Route Query Node]]
- [[_COMMUNITY_Retrieve Node|Retrieve Node]]
- [[_COMMUNITY_API Performance|API Performance]]
- [[_COMMUNITY_LangGraph Scalability|LangGraph Scalability]]
- [[_COMMUNITY_Legal Validation|Legal Validation]]

## God Nodes (most connected - your core abstractions)
1. `RAGStore` - 11 edges
2. `AgentState` - 8 edges
3. `QueryResponse` - 4 edges
4. `seed_database()` - 4 edges
5. `Settings` - 3 edges
6. `QueryRequest` - 3 edges
7. `process_query()` - 3 edges
8. `route_query()` - 3 edges
9. `retrieve()` - 3 edges
10. `analyze()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `seed_database()` --calls--> `RAGStore`  [INFERRED]
  mock_data/seed.py → src/rag/vectorstore.py
- `Decides whether the query is for drafting a new contract or analyzing an existin` --uses--> `AgentState`  [INFERRED]
  src/agent/nodes.py → src/agent/state.py
- `Fetches relevant context from the vector store.` --uses--> `AgentState`  [INFERRED]
  src/agent/nodes.py → src/agent/state.py
- `Analyzes the retrieved context based on the query.` --uses--> `AgentState`  [INFERRED]
  src/agent/nodes.py → src/agent/state.py
- `Generates new contract content.` --uses--> `AgentState`  [INFERRED]
  src/agent/nodes.py → src/agent/state.py

## Communities

### Community 0 - "RAG Store & Seeding"
Cohesion: 0.22
Nodes (3): seed_database(), RAGStore, documents: list of dicts with 'id', 'text', 'metadata'

### Community 1 - "Query Processing"
Cohesion: 0.6
Nodes (4): BaseModel, process_query(), QueryRequest, QueryResponse

### Community 2 - "Query Routing & Retrieval"
Cohesion: 0.4
Nodes (6): POST /process Endpoint, ChromaDB Collection, Contract Drafting, Contract Analysis, Natural Language Query, Query Routing

### Community 3 - "Configuration"
Cohesion: 0.5
Nodes (3): BaseSettings, Config, Settings

### Community 4 - "Agent State"
Cohesion: 0.5
Nodes (2): AgentState, TypedDict

### Community 5 - "Main Entry Point"
Cohesion: 0.67
Nodes (1): main()

### Community 6 - "Analyze Node"
Cohesion: 0.67
Nodes (2): analyze(), Analyzes the retrieved context based on the query.

### Community 7 - "Validate Node"
Cohesion: 0.67
Nodes (2): Validates the drafted or analyzed content against standard legal compliance., validate()

### Community 8 - "Graph Builder"
Cohesion: 0.67
Nodes (1): build_graph()

### Community 9 - "Draft & Risk Analysis"
Cohesion: 0.67
Nodes (3): Legal Draft, Risk Analysis, Validation Node

### Community 10 - "Draft Node"
Cohesion: 1.0
Nodes (2): draft(), Generates new contract content.

### Community 11 - "Route Query Node"
Cohesion: 1.0
Nodes (2): Decides whether the query is for drafting a new contract or analyzing an existin, route_query()

### Community 12 - "Retrieve Node"
Cohesion: 1.0
Nodes (2): Fetches relevant context from the vector store., retrieve()

### Community 13 - "API Performance"
Cohesion: 1.0
Nodes (2): FastAPI, Performance (15s response)

### Community 14 - "LangGraph Scalability"
Cohesion: 1.0
Nodes (2): LangGraph, Horizontal Scalability

### Community 17 - "Legal Validation"
Cohesion: 1.0
Nodes (1): Legal Soundness Check

## Knowledge Gaps
- **10 isolated node(s):** `documents: list of dicts with 'id', 'text', 'metadata'`, `POST /process Endpoint`, `Natural Language Query`, `Legal Draft`, `Risk Analysis` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Agent State`** (4 nodes): `AgentState`, `state.py`, `state.py`, `TypedDict`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Main Entry Point`** (3 nodes): `main()`, `main.py`, `main.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Analyze Node`** (3 nodes): `analyze()`, `Analyzes the retrieved context based on the query.`, `nodes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Validate Node`** (3 nodes): `Validates the drafted or analyzed content against standard legal compliance.`, `validate()`, `nodes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graph Builder`** (3 nodes): `build_graph()`, `graph.py`, `graph.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Draft Node`** (2 nodes): `draft()`, `Generates new contract content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Route Query Node`** (2 nodes): `Decides whether the query is for drafting a new contract or analyzing an existin`, `route_query()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Retrieve Node`** (2 nodes): `Fetches relevant context from the vector store.`, `retrieve()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Performance`** (2 nodes): `FastAPI`, `Performance (15s response)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `LangGraph Scalability`** (2 nodes): `LangGraph`, `Horizontal Scalability`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Legal Validation`** (1 nodes): `Legal Soundness Check`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RAGStore` connect `RAG Store & Seeding` to `Analyze Node`, `Validate Node`, `Draft Node`, `Route Query Node`, `Retrieve Node`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Why does `AgentState` connect `Agent State` to `Analyze Node`, `Validate Node`, `Draft Node`, `Route Query Node`, `Retrieve Node`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RAGStore` (e.g. with `Decides whether the query is for drafting a new contract or analyzing an existin` and `Fetches relevant context from the vector store.`) actually correct?**
  _`RAGStore` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `AgentState` (e.g. with `Decides whether the query is for drafting a new contract or analyzing an existin` and `Fetches relevant context from the vector store.`) actually correct?**
  _`AgentState` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `seed_database()` (e.g. with `RAGStore` and `.add_documents()`) actually correct?**
  _`seed_database()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `documents: list of dicts with 'id', 'text', 'metadata'`, `POST /process Endpoint`, `Natural Language Query` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._