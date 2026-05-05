# System Architecture

## 1. Architectural Overview
EnterpriseDocuBot employs a modular, microservice-ready architecture. It consists of a REST interface, an agentic state machine, a RAG vector store, and external LLM integrations.

## 2. Component Diagram

```text
[ Client (cURL/Swagger) ] 
       | (HTTP POST /process)
       v
[ FastAPI Server (main.py) ]
       | (Initializes State)
       v
[ LangGraph Workflow Engine ]
       |
       +--> [ Router Node ] (Decides Path)
       |
       +--> [ Retriever Node ] <---> [ ChromaDB (vectorstore.py) ]
       |
       +--> [ Drafter / Analyzer Node ] <---> [ Google Gemini API ]
       |
       +--> [ Validator Node ] <---> [ Google Gemini API ]
       |
       v
[ JSON Response ]
```

## 3. Core Components
1. **API Layer (`src/main.py`)**: Uses FastAPI to provide HTTP endpoints. Pydantic models define the schema for `QueryRequest` and `QueryResponse`.
2. **State Machine (`src/agent/graph.py`, `src/agent/state.py`)**: Defines the typed dictionary `AgentState` and the conditional edges mapping the flow of execution.
3. **Reasoning Nodes (`src/agent/nodes.py`)**: Individual Python functions wrapped as LangGraph nodes. Each node invokes the `ChatGoogleGenerativeAI` model using `HumanMessage`.
4. **Vector Store (`src/rag/vectorstore.py`)**: Uses a persistent ChromaDB local instance (`./chroma_db`). It embeds documents using `GoogleGenerativeAIEmbeddings` (`models/gemini-embedding-2`).
5. **Configuration (`src/config.py`)**: Loads environment variables utilizing `pydantic-settings`.
