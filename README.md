# voice-cloning

INSTALL Python 3.9

## youtube-converter

INSTALL FFMPEG : https://www.gyan.dev/ffmpeg/builds/
Put the path of the /bin in your system environment variable. 
On envoie une requête comme ceci (pour Pierre Louis) 

curl -X POST http://127.0.0.1:5000/convert -H "Content-Type: application/json" -d '{"youtube_url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'

## audio-language-detector
Create a .env file with the following variables : 

GROQ_API_KEY=<your groq api key>
PATH_TO_AUDIO_FILE=<path to the audio file>
GROQ_MODEL_NAME=<model name>

## client

```
cd client/
npm i
npm run dev
```