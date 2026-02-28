#!/usr/bin/env node

// List all LLM-exposed credential key names (AGENT_LLM_*) without values
const prefix = 'AGENT_LLM_';

// Collect matching environment variable keys
const keys = Object.keys(process.env)
  .filter(key => key.startsWith(prefix))
  .map(key => key.slice(prefix.length));

// Also check for ELEVENLABS_API_KEY explicitly
if (process.env.ELEVENLABS_API_KEY !== undefined) {
  keys.push('ELEVENLABS_API_KEY');
}

// Output unique, sorted key names only
console.log([...new Set(keys)].sort().join('\n'));
process.exit(0);
