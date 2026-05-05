from langgraph.graph import StateGraph, END
from src.agent.state import AgentState
from src.agent.nodes import route_query, retrieve, analyze, draft, validate

def build_graph():
    workflow = StateGraph(AgentState)
    
    # Add nodes
    workflow.add_node("router", route_query)
    workflow.add_node("retriever", retrieve)
    workflow.add_node("analyzer", analyze)
    workflow.add_node("drafter", draft)
    workflow.add_node("validator", validate)
    
    # Set entry point
    workflow.set_entry_point("router")
    
    # Conditional edges from router
    def route_condition(state: AgentState):
        return state.get("action", "retrieve_and_analyze")
        
    workflow.add_conditional_edges(
        "router",
        route_condition,
        {
            "retrieve_and_analyze": "retriever",
            "draft": "retriever" # retrieve context before drafting
        }
    )
    
    # After retrieval, go to draft or analyze based on action
    def post_retrieval_route(state: AgentState):
        return state.get("action", "retrieve_and_analyze")
        
    workflow.add_conditional_edges(
        "retriever",
        post_retrieval_route,
        {
            "retrieve_and_analyze": "analyzer",
            "draft": "drafter"
        }
    )
    
    # Both analyze and draft go to validator
    workflow.add_edge("analyzer", "validator")
    workflow.add_edge("drafter", "validator")
    
    # End
    workflow.add_edge("validator", END)
    
    return workflow.compile()
