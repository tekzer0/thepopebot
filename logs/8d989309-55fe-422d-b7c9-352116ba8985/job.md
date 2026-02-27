Create a new Pi skill at `pi-skills/ha-instant/` that provides instant Home Assistant commands by calling the HA API directly instead of going through the queue system.

1. Create `SKILL.md` with frontmatter (name: ha-instant, description: "Instant Home Assistant commands via direct API calls") and usage docs referencing `{baseDir}/control.sh <entity_id> <service> [params]`
2. Create `control.sh` - bash script that takes entity_id, service, and optional parameters, then calls the HA API directly using the existing HA_BASE_URL and HA_TOKEN environment variables. Make it executable.
3. Activate: `ln -s ../../pi-skills/ha-instant .pi/skills/ha-instant`
4. Test: run `control.sh light.hallway light.turn_off` and verify instant response. Fix any issues before committing.