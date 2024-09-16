from flask import Flask, request, jsonify
from TTS.api import TTS
import torch
import os
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app)


@app.route('/clone-voice', methods=['POST'])
def clone_voice():
    data = request.json
    text = data.get("text")
    language = data.get("language")
    
    audio_input_path = '/app/common/audio.wav'
    audio_output_path = '/app/common/output.wav'

    device = "cuda" if torch.cuda.is_available() else "cpu"
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

    tts.tts_to_file(text=text, speaker_wav=audio_input_path, language=language, file_path=audio_output_path)
    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
