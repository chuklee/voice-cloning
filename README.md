# voice-cloning

INSTALL Python 3.9
INSTALL FFMPEG : https://www.gyan.dev/ffmpeg/builds/
Put the path of the /bin in your system environment variable. 
On envoie une requête comme ceci (pour Pierre Louis) 

curl -X POST http://127.0.0.1:5000/convert -H "Content-Type: application/json" -d '{"youtube_url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'