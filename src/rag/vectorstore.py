import os
import chromadb
from typing import List, Dict, Any
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from config import settings

class RAGStore:
    def __init__(self):
        self.chroma_client = chromadb.PersistentClient(path=settings.chroma_db_dir)
        self.collection = self.chroma_client.get_or_create_collection(name="contracts")
        # Initialize Gemini embeddings
        if settings.gemini_api_key:
            os.environ["GOOGLE_API_KEY"] = settings.gemini_api_key
        
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/gemini-embedding-2")

    def add_documents(self, documents: List[Dict[str, str]]):
        """
        documents: list of dicts with 'id', 'text', 'metadata'
        """
        ids = [doc['id'] for doc in documents]
        texts = [doc['text'] for doc in documents]
        metadatas = [doc.get('metadata', {}) for doc in documents]
        
        # Get embeddings from langchain
        embedded_texts = [self.embeddings.embed_query(text) for text in texts]
        
        self.collection.add(
            embeddings=embedded_texts,
            documents=texts,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Added {len(documents)} documents to vector store.")

    def retrieve(self, query: str, n_results: int = 3) -> List[Document]:
        query_embedding = self.embeddings.embed_query(query)
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        docs = []
        if results['documents']:
            for i in range(len(results['documents'][0])):
                doc = Document(
                    page_content=results['documents'][0][i],
                    metadata=results['metadatas'][0][i] if results['metadatas'] else {}
                )
                docs.append(doc)
        return docs
