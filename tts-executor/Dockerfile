FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5555

RUN printf "y\n" | python trigger_tts_conditions_prompt.py

CMD ["python", "tts_execute.py"]
