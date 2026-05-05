# Master Test Plan

## 1. Test Strategy
Testing will be performed at three levels: Unit, Integration, and System testing. Due to the non-deterministic nature of LLMs, fuzzy matching and structural validation will be prioritized over exact string matching.

## 2. Test Environments
- **Local Dev:** SQLite backend for ChromaDB, Python 3.12, `.env` configured with test Gemini key.

## 3. Test Cases

### 3.1 Unit Testing (Agent Nodes)
- **TC-01: Router Node - Draft Intent**
  - Input: "Create a new NDA."
  - Expected Output: `action == "draft"`
- **TC-02: Router Node - Analyze Intent**
  - Input: "What are the liabilities in this clause?"
  - Expected Output: `action == "retrieve_and_analyze"`

### 3.2 Integration Testing (RAG Pipeline)
- **TC-03: Vector Store Retrieval**
  - Input: Seed 4 mock documents. Query "Confidentiality".
  - Expected Output: Retrieve `clause_1` with highest similarity score.

### 3.3 System / API Testing
- **TC-04: End-to-End POST /process (Draft)**
  - Request: `POST /process {"query": "Draft a termination clause"}`
  - Expected Output: HTTP 200. JSON payload includes `action: "draft"`, non-null `draft`, non-null `validation_status`.
- **TC-05: Missing Payload**
  - Request: `POST /process {}`
  - Expected Output: HTTP 422 Unprocessable Entity.
