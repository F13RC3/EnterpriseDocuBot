# Graph Report - EnterpriseDocuBot  (2026-08-01)

## Corpus Check
- 13 files · ~11,227 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 42 nodes · 43 edges · 9 communities detected
- Extraction: 72% EXTRACTED · 28% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.55)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]

## God Nodes (most connected - your core abstractions)
1. `RAGStore` - 10 edges
2. `AgentState` - 7 edges
3. `QueryResponse` - 3 edges
4. `Decides whether the query is for drafting a new contract or analyzing an existin` - 3 edges
5. `Fetches relevant context from the vector store.` - 3 edges
6. `Analyzes the retrieved context based on the query.` - 3 edges
7. `Generates new contract content.` - 3 edges
8. `Validates the drafted or analyzed content against standard legal compliance.` - 3 edges
9. `seed_database()` - 3 edges
10. `Settings` - 2 edges

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

### Community 0 - "Community 0"
Cohesion: 0.29
Nodes (3): seed_database(), RAGStore, documents: list of dicts with 'id', 'text', 'metadata'

### Community 1 - "Community 1"
Cohesion: 0.6
Nodes (4): BaseModel, process_query(), QueryRequest, QueryResponse

### Community 2 - "Community 2"
Cohesion: 0.5
Nodes (3): BaseSettings, Config, Settings

### Community 3 - "Community 3"
Cohesion: 0.67
Nodes (2): AgentState, TypedDict

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (2): Validates the drafted or analyzed content against standard legal compliance., validate()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (2): Decides whether the query is for drafting a new contract or analyzing an existin, route_query()

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (2): draft(), Generates new contract content.

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (2): analyze(), Analyzes the retrieved context based on the query.

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (2): Fetches relevant context from the vector store., retrieve()

## Knowledge Gaps
- **2 isolated node(s):** `Config`, `documents: list of dicts with 'id', 'text', 'metadata'`
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 3`** (3 nodes): `AgentState`, `state.py`, `TypedDict`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (3 nodes): `Validates the drafted or analyzed content against standard legal compliance.`, `validate()`, `nodes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 6`** (2 nodes): `Decides whether the query is for drafting a new contract or analyzing an existin`, `route_query()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `draft()`, `Generates new contract content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `analyze()`, `Analyzes the retrieved context based on the query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (2 nodes): `Fetches relevant context from the vector store.`, `retrieve()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `RAGStore` connect `Community 0` to `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `AgentState` connect `Community 3` to `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 9`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `Decides whether the query is for drafting a new contract or analyzing an existin` connect `Community 6` to `Community 0`, `Community 3`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `RAGStore` (e.g. with `Decides whether the query is for drafting a new contract or analyzing an existin` and `Fetches relevant context from the vector store.`) actually correct?**
  _`RAGStore` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `AgentState` (e.g. with `Decides whether the query is for drafting a new contract or analyzing an existin` and `Fetches relevant context from the vector store.`) actually correct?**
  _`AgentState` has 5 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Decides whether the query is for drafting a new contract or analyzing an existin` (e.g. with `AgentState` and `RAGStore`) actually correct?**
  _`Decides whether the query is for drafting a new contract or analyzing an existin` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Fetches relevant context from the vector store.` (e.g. with `AgentState` and `RAGStore`) actually correct?**
  _`Fetches relevant context from the vector store.` has 2 INFERRED edges - model-reasoned connections that need verification._