from groq import Groq
import os
from groq.types.audio.translation import Translation
import librosa
import soundfile as sf
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
from config.settings import settings
from flask import Flask, request, jsonify  # Added Flask imports
from flask_cors import CORS

client = Groq(api_key=settings.GROQ_API_KEY)

app = Flask(__name__)
CORS(app)

@app.route('/get-audio-language', methods=['GET'])
def get_audio_language():
    audio_path = request.args.get('audio_path')
    if not audio_path:
        return jsonify({"error": "audio_path parameter is required"}), 400

    try:
        transcript: str = audio_to_text(filepath=audio_path)
        language_code: str = detect_language(transcript=transcript)
        return jsonify({"language_code": language_code})  # Return the detected language code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def audio_to_text(filepath) -> str:
    try:
        # Get the absolute path of the file
        abs_filepath = os.path.abspath(path=filepath)
        print("Attempting to load audio file with librosa...")
        audio, sr = librosa.load(
            path=abs_filepath, sr=None, duration=180
        )  # Load up to 3 minutes
        print("Successfully loaded audio file")

        # Export to a temporary file
        temp_file = "temp_audio.wav"
        sf.write(file=temp_file, data=audio, samplerate=sr)

        # Transcribe the audio
        with open(file=temp_file, mode="rb") as file:
            translation: Translation = client.audio.translations.create(
                file=(temp_file, file.read()),
                model="whisper-large-v3",
            )

        # Clean up the temporary file
        os.remove(path=temp_file)

        return translation.text
    except FileNotFoundError:
        print(f"Error: The file '{abs_filepath}' was not found.")
        raise FileNotFoundError
    except PermissionError:
        print(f"Error: Permission denied when trying to access '{abs_filepath}'.")
        raise PermissionError
    except Exception as e:
        print(f"An error occurred while processing the audio: {str(e)}")
        raise Exception


def detect_language(transcript: str) -> str:
    # Set up Groq chat model using LangChain
    chat = ChatGroq(model_name=settings.GROQ_MODEL_NAME)

    # Create prompt template
    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a language detection expert. Analyze the given text and determine the language it's written in. Respond with the ISO 639-1 two-letter language code.",
            ),
            (
                "human",
                "Detect the language of the following text and respond with only the two-letter language code (e.g., 'en' for English, 'fr' for French): {text}",
            ),
        ]
    )

    # Generate response
    response = chat(prompt.format_messages(text=transcript))

    return response.content.strip()  # type: ignore


def main(audio_path):
    transcript: str = audio_to_text(filepath=audio_path)
    if transcript:
        language_code: str = detect_language(transcript=transcript)
        print(f"Detected language code: {language_code}")
    else:
        print("Could not process the audio file.")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4444, debug=True)
