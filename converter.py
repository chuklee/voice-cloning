from flask import Flask, request, jsonify
import yt_dlp
from moviepy.editor import AudioFileClip
import os

app = Flask(__name__)
@app.route('/')
def home():
    return "Flask is running!"
# Fonction pour télécharger l'audio avec yt-dlp
def download_audio_from_youtube(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': 'audio.%(ext)s',  
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return 'audio.mp3'

# Fonction pour convertir le fichier téléchargé en .wav
def convert_to_wav(input_file):
    output_file = os.path.splitext(input_file)[0] + '.wav'
    audio_clip = AudioFileClip(input_file)
    audio_clip.write_audiofile(output_file, codec='pcm_s16le')  # Codec pour .wav
    audio_clip.close()
    return output_file

# Route pour gérer la requête POST
@app.route('/convert', methods=['POST'])
def convert_youtube_to_wav():
    # Extraction de l'URL YouTube depuis le corps de la requête
    data = request.get_json()
    youtube_url = data.get('youtube_url')

    if not youtube_url:
        return jsonify({'error': 'No YouTube URL provided'}), 400

    try:
        # Télécharger l'audio depuis YouTube
        audio_file = download_audio_from_youtube(youtube_url)
        
        # Convertir l'audio téléchargé en .wav
        wav_file = convert_to_wav(audio_file)

        # Réponse avec le fichier .wav
        return jsonify({'message': f'Audio .wav enregistré sous : {wav_file}'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)