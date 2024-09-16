from flask import Flask, request, jsonify
from TTS.api import TTS
import torch
import os

app = Flask(__name__)

@app.route('/clone-voice', methods=['POST'])
def clone_voice():
    data = request.json
    text = data.get("text")
    language = data.get("language")
    
    audio_input_path = '/app/common/audio.wav'
    audio_output_path = '/app/common/output.wav'

    # Get device
    device = "cuda" if torch.cuda.is_available() else "cpu"

    # List available 🐸TTS models
    print(TTS().list_models())

    # Init TTS
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

    # Run TTS
    # ❗ Since this model is multi-lingual voice cloning model, we must set the target speaker_wav and language
    # Text to speech list of amplitude values as output
    # wav = tts.tts(text="Bonjour j'aime les nazis!", speaker_wav="test.wav", language="fr")
    # Text to speech to a file
    tts.tts_to_file(text=text, speaker_wav=audio_input_path, language=language, file_path=audio_output_path)
    
    return '', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
