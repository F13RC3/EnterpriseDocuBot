from src.rag.vectorstore import RAGStore

def seed_database():
    store = RAGStore()
    docs = [
        {
            "id": "clause_1",
            "text": "Confidentiality: The Receiving Party shall keep confidential all Information provided by the Disclosing Party and shall not disclose it to any third party without prior written consent.",
            "metadata": {"type": "confidentiality", "risk_level": "high"}
        },
        {
            "id": "clause_2",
            "text": "Term and Termination: This Agreement shall commence on the Effective Date and remain in effect for a period of one (1) year. Either party may terminate this Agreement upon 30 days written notice.",
            "metadata": {"type": "termination", "risk_level": "medium"}
        },
        {
            "id": "clause_3",
            "text": "Indemnification: Provider agrees to indemnify and hold harmless Client from any claims arising out of Provider's negligence or willful misconduct.",
            "metadata": {"type": "indemnification", "risk_level": "high"}
        },
        {
            "id": "clause_4",
            "text": "Governing Law: This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware.",
            "metadata": {"type": "governing_law", "risk_level": "low"}
        }
    ]
    store.add_documents(docs)
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_database()
