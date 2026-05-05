from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.agent.graph import build_graph

app = FastAPI(
    title="EnterpriseDocuBot",
    description="Intelligent Contract Analysis & Generation Engine API",
    version="1.0.0"
)

# Initialize graph once at startup
graph = build_graph()

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    query: str
    action: str
    draft: str | None = None
    analysis: str | None = None
    validation_status: str | None = None

@app.post("/process", response_model=QueryResponse)
async def process_query(request: QueryRequest):
    initial_state = {
        "query": request.query,
        "action": "",
        "context": [],
        "draft": "",
        "analysis": "",
        "validation_status": "",
        "errors": []
    }
    
    try:
        # invoke is synchronous
        result = graph.invoke(initial_state)
        
        return QueryResponse(
            query=request.query,
            action=result.get("action", ""),
            draft=result.get("draft") if result.get("draft") else None,
            analysis=result.get("analysis") if result.get("analysis") else None,
            validation_status=result.get("validation_status") if result.get("validation_status") else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
