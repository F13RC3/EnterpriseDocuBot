from typing import TypedDict, Annotated, List
from langchain_core.documents import Document

class AgentState(TypedDict):
    query: str
    action: str  # "retrieve_and_analyze" or "draft"
    context: List[Document]
    draft: str
    analysis: str
    validation_status: str
    errors: List[str]
