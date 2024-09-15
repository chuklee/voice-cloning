FROM python:3.9-slim

ENV GROQ_API_KEY=${GROQ_API_KEY}
ENV PATH_TO_AUDIO_FILE=${PATH_TO_AUDIO_FILE}
ENV GROQ_MODEL_NAME=${GROQ_MODEL_NAME}

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 4444

CMD ["python", "get_language_from_audio.py"]