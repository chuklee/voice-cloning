# 🎙️ Youtuber Voice Cloner - AI-Powered Voice Replication

## 🌟 Overview
Welcome to the Youtuber Voice Cloner, a cutting-edge AI application that brings voice cloning technology to your fingertips! This innovative platform allows you to clone voices from any YouTube video and generate new speech in the same voice. Perfect for content creators, developers, and AI enthusiasts.

## ✨ Features
- 🎯 One-Click Voice Cloning: Simply paste a YouTube URL
- 🌍 Multi-Language Support: Automatically detects and supports multiple languages
- 🔊 Real-Time Processing: Watch the cloning process happen live
- 📝 Custom Text Generation: Input any text to be spoken in the cloned voice
- 🎨 Beautiful UI: Modern, responsive interface with smooth animations
- 🚀 Microservices Architecture: Built with scalability in mind

## 🛠️ Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python microservices with Flask
- **AI/ML**: State-of-the-art TTS (Text-to-Speech) models
- **Infrastructure**: Docker containerization for easy deployment
- **APIs**: RESTful architecture with cross-service communication

## 🔧 Getting Started

Create a .env file in the root folder of the project with the following variables: 
```bash
GROQ_API_KEY='<groq api key>'
GROQ_MODEL_NAME='<model name>' #ex: llama-3.1-8b-instant
```

## Running the project

```
docker compose up --build
```

See frontend at http://localhost:3000/
