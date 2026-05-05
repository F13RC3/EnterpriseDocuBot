# User Manual

## 1. Introduction
Welcome to the EnterpriseDocuBot API! This manual provides instructions on how to set up the system and interact with the endpoints.

## 2. Installation & Setup
1. **Prerequisites**: Ensure you have `uv` installed and a valid Google Gemini API Key.
2. **Environment Variable**: Open the `.env` file in the project root and add your key:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```
3. **Seeding the Database**: Run the provided seed script to ingest mock legal clauses into the Chroma vector database.
   ```bash
   PYTHONPATH=. uv run python mock_data/seed.py
   ```
4. **Start the Server**: 
   ```bash
   PYTHONPATH=. uv run python src/main.py
   ```
   The server will start at `http://0.0.0.0:8000`.

## 3. Using the API
You can interact with the API via the automatic Swagger documentation at `http://localhost:8000/docs`, or via cURL.

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
