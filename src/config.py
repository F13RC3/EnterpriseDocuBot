from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    gemini_api_key: str = ""
    chroma_db_dir: str = "./chroma_db"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
