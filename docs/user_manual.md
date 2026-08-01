# User Manual

## 1. Introduction
Welcome to the EnterpriseDocuBot API! This manual provides instructions on how to set up the system and interact with the endpoints.

## 2. Installation & Setup
1. **Prerequisites**: Ensure you have `docker` and `docker compose` installed (or `uv` and `npm` for manual setup), and a valid Google Gemini API Key.
2. **Environment Variable**: Open the `.env` file in the project root and add your key:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```
3. **Start the Stack (Docker Compose - Recommended)**: 
   ```bash
   docker compose up -d --build
   ```
   This will start both the React frontend and the FastAPI backend.

4. **Manual Start (Alternative)**:
   - *Seed DB*: `PYTHONPATH=src uv run python mock_data/seed.py`
   - *Backend*: `PYTHONPATH=src uv run python src/main.py`
   - *Frontend*: `cd frontend && npm install && npm run dev`

## 3. Using the Application
The system provides a beautiful **React Chat UI** accessible at `http://localhost:5173`. You can type your legal questions directly into the chat interface to either draft or analyze clauses.

For developers, you can interact directly with the API via the automatic Swagger documentation at `http://localhost:8000/docs`, or via cURL.

### Endpoint: POST `/process`
This is the primary endpoint for both drafting and analyzing.

**Example Request:**
```bash
curl -X POST "http://localhost:8000/process" \
-H "Content-Type: application/json" \
-d '{"query": "Draft a strong confidentiality clause for a software engineer"}'
```

**Example Response:**
```json
{
  "query": "Draft a strong confidentiality clause for a software engineer",
  "action": "draft",
  "draft": "This Confidentiality Agreement...",
  "analysis": null,
  "validation_status": "The draft is legally sound and meets standard criteria."
}
```
