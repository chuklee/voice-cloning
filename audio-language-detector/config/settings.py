from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """
    Config values for the service. Values are set automatically if a .env file is found
    in the directory root.
    """

    GROQ_API_KEY: str
    PATH_TO_AUDIO_FILE: str
    GROQ_MODEL_NAME: str
    
    class Config:
        env_file = ".env"

settings = Settings()  # type: ignore