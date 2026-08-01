FROM python:3.12-slim

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-cache

# Copy application source code
COPY . .

# Set python path
ENV PYTHONPATH=/app/src

# Expose port
EXPOSE 8000

# Start server
CMD ["uv", "run", "python", "src/main.py"]
