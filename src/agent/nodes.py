import os
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from config import settings
from agent.state import AgentState
from rag.vectorstore import RAGStore

if settings.gemini_api_key:
    os.environ["GOOGLE_API_KEY"] = settings.gemini_api_key

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
rag_store = RAGStore()

def route_query(state: AgentState) -> AgentState:
    """Decides whether the query is for drafting a new contract or analyzing an existing concept/clause."""
    query = state["query"]
    prompt = f"""
    You are an intelligent legal assistant router.
    Analyze the user query: "{query}"
    Decide if the user wants to:
    1. "draft" a new contract/clause
    2. "retrieve_and_analyze" an existing concept, clause, or perform risk assessment.
    
    Output ONLY "draft" or "retrieve_and_analyze". Do not output anything else.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    action = response.content.strip().lower()
    if "draft" in action:
        return {"action": "draft"}
    else:
        return {"action": "retrieve_and_analyze"}

def retrieve(state: AgentState) -> AgentState:
    """Fetches relevant context from the vector store."""
    query = state["query"]
    docs = rag_store.retrieve(query, n_results=3)
    return {"context": docs}

def analyze(state: AgentState) -> AgentState:
    """Analyzes the retrieved context based on the query."""
    query = state["query"]
    context = "\n\n".join([doc.page_content for doc in state.get("context", [])])
    
    prompt = f"""
    You are an expert contract analyst.
    User Query: {query}
    Retrieved Context:
    {context}
    
    Provide a detailed analysis based on the context to answer the user's query. Assess risks if applicable.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"analysis": response.content}

def draft(state: AgentState) -> AgentState:
    """Generates new contract content."""
    query = state["query"]
    context = "\n\n".join([doc.page_content for doc in state.get("context", [])])
    
    prompt = f"""
    You are an expert legal drafter.
    Draft a contract or clause based on the following user request: {query}
    
    Use the following standard clauses or context as inspiration if relevant:
    {context}
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"draft": response.content}

def validate(state: AgentState) -> AgentState:
    """Validates the drafted or analyzed content against standard legal compliance."""
    content_to_validate = state.get("draft", "") or state.get("analysis", "")
    query = state["query"]
    
    prompt = f"""
    You are a legal compliance officer. 
    Review the following content generated for the user request: "{query}"
    
    Content:
    {content_to_validate}
    
    Validate if it is legally sound, professional, and meets basic compliance standards.
    Output a short validation status report, noting any errors or missing standard elements.
    """
    response = llm.invoke([HumanMessage(content=prompt)])
    return {"validation_status": response.content}
