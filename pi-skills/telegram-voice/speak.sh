#!/bin/bash
set -euo pipefail

# Check if curl is installed
if ! command -v curl &> /dev/null; then
    echo "Error: curl is not installed. Please install it to continue." >&2
    exit 1
fi

echo "--- Environment Variables Check ---"
echo "ELEVENLABS_API_KEY is ${ELEVENLABS_API_KEY:+Present}${ELEVENLABS_API_KEY:-Not set}"
echo "ELEVENLABS_VOICE_ID is ${ELEVENLABS_VOICE_ID:+Present}${ELEVENLABS_VOICE_ID:-Not set}"
echo "TELEGRAM_BOT_TOKEN is ${TELEGRAM_BOT_TOKEN:+Present}${TELEGRAM_BOT_TOKEN:-Not set}"
echo "TELEGRAM_CHAT_ID is ${TELEGRAM_CHAT_ID:+Present}${TELEGRAM_CHAT_ID:-Not set}"
echo "-----------------------------------"

if [ $# -lt 1 ]; then
  echo "Usage: $0 \"text to speak\"" >&2
  exit 1
fi

TEXT="$1"

if [ -z "${ELEVENLABS_API_KEY:-}" ]; then
  echo "Error: ELEVENLABS_API_KEY is required"
  exit 1
fi

if [ -z "${ELEVENLABS_VOICE_ID:-}" ]; then
  echo "Error: ELEVENLABS_VOICE_ID is required"
  exit 1
fi

if [ -z "${TELEGRAM_BOT_TOKEN:-}" ]; then
  echo "Error: TELEGRAM_BOT_TOKEN is required"
  exit 1
fi

if [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
  echo "Error: TELEGRAM_CHAT_ID is required"
  exit 1
fi

TMP_DIR=$(mktemp -d)
trap 'rm -rf "$TMP_DIR"' EXIT

MP3_FILE="$TMP_DIR/voice.mp3"

echo "--- Calling ElevenLabs API ---"
curl -v -X POST \
  "https://api.elevenlabs.io/v1/text-to-speech/$ELEVENLABS_VOICE_ID" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$TEXT\",\"model_id\":\"eleven_monolingual_v1\"}" \
  --output "$MP3_FILE" || { echo "ElevenLabs curl command failed." >&2; exit 1; }
echo "--- ElevenLabs API Call Complete ---"
echo ""

echo "--- Calling Telegram API ---"
curl -v -X POST \
  "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendVoice" \
  -F "chat_id=$TELEGRAM_CHAT_ID" \
  -F "voice=@$MP3_FILE" || { echo "Telegram curl command failed." >&2; exit 1; }
echo "--- Telegram API Call Complete ---"
echo ""

echo "Voice message sent to Telegram"
