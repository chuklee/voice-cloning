from flask import Flask, request, jsonify, send_file
import yt_dlp
from moviepy.editor import AudioFileClip
import os
import shutil
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Flask is running!"

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

def convert_to_wav(input_file):
    output_file = os.path.splitext(input_file)[0] + '.wav'
    audio_clip = AudioFileClip(input_file)
    audio_clip.write_audiofile(output_file, codec='pcm_s16le')
    audio_clip.close()
    return output_file

@app.route('/convert', methods=['POST'])
def convert_youtube_to_wav():
    print("Received request with parameters : ", request.get_json())
    data = request.get_json()
    youtube_url = data.get('youtube_url')

    if not youtube_url:
        return jsonify({'error': 'No YouTube URL provided'}), 400

    try:
        audio_file = download_audio_from_youtube(youtube_url)
        wav_file = convert_to_wav(audio_file)

        # Save the WAV file in the "common" folder
        common_folder_path = '/app/common'  # Use the mounted volume path
        os.makedirs(common_folder_path, exist_ok=True)
        
        # Use shutil.move instead of os.rename
        shutil.move(wav_file, os.path.join(common_folder_path, 'audio.wav'))

        return jsonify({'message': 'File converted and saved successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app") 
    app.run(debug=True, host='0.0.0.0', port=3333)