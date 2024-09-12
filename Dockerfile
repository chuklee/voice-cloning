# install TTS pip package expose on 8000 port so that we can use a jupyter notebook to test it
FROM python:3.9-slim

RUN pip install TTS

RUN pip install jupyter

EXPOSE 8000

CMD ["jupyter", "notebook", "--port", "8000", "--no-browser", "--ip", "0.0.0.0", "--allow-root"]
