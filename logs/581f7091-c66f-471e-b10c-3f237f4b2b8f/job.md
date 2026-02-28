List every LLM-exposed credential so we know whether the ElevenLabs key is already available:

1. Run the skill `list-credentials` (or `env | grep AGENT_LLM_`) and capture the output
2. Print the key names only (no values) so we can confirm if `ELEVENLABS_API_KEY` or similar exists
3. Exit 0

This tells us whether we can reuse the existing key or need to add a new one for voice replies via Telegram.