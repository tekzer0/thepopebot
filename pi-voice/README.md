# pi-voice — Megatron Voice Assistant

Local voice interface for Oracle1 (Raspberry Pi 5). Listens for the wake word **"megatron"**, transcribes commands on-device, queries an LLM, and responds with synthesized speech — with Home Assistant control built in.

## How it works

1. **Wake word**: `faster-whisper` (tiny model) continuously transcribes 2-second audio chunks — no Porcupine, no `.ppn` renewals
2. **STT**: `faster-whisper` (base model) transcribes the command after wake word
3. **LLM**: Groq `moonshotai/kimi-k2-instruct` — fast, low-latency
4. **TTS**: ElevenLabs `eleven_flash_v2_5` → played via `mpg123`
5. **HA control**: LLM emits `<HA_COMMAND>{...}</HA_COMMAND>` tags, stripped before speech

## Hardware

- ReSpeaker XVF3800 4-mic array (ALSA card 0, `plughw:0,0`)
- External speakers on same card

## Dependencies

```bash
pip install faster-whisper requests numpy pyalsaaudio
sudo apt install mpg123
```

## Config

All secrets loaded from `~/mybot/.env`:

```
GROQ_API_KEY=...
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
HA_URL=http://192.168.1.210:8123
HA_ACCESS_TOKEN=...
```

## Run

```bash
python3 voice.py
```

Or as a systemd service — see the pi-voice.service example in this directory.
