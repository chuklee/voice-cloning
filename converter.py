import yt_dlp
from moviepy.editor import AudioFileClip
import os

# Étape 1: Télécharger l'audio depuis YouTube avec yt-dlp
def download_audio_from_youtube(url):
    ydl_opts = {
        'format': 'bestaudio/best',
        'outtmpl': 'audio.%(ext)s',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',  # Téléchargement en mp3
            'preferredquality': '192',
        }],
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
    return 'audio.mp3'

# Étape 2: Convertir en .wav
def convert_to_wav(input_file):
    output_file = os.path.splitext(input_file)[0] + '.wav'
    audio_clip = AudioFileClip(input_file)
    audio_clip.write_audiofile(output_file, codec='pcm_s16le')  # Codec pour format .wav
    audio_clip.close()
    return output_file

# Exemple d'utilisation
youtube_url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'  # Remplace par l'URL de ta vidéo
audio_file = download_audio_from_youtube(youtube_url)
wav_file = convert_to_wav(audio_file)

print(f"Audio .wav enregistré sous : {wav_file}")
