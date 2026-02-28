Audit everything that auto-merged since last night:

1. `git log --since="24 hours ago" --grep="^job/" --format="%h %s %an" > /tmp/recent_jobs.log`
2. For each commit hash, show the files changed (`git show --name-only <hash>`) and append to the log
3. Save the final audit as `docs/audit_recent_jobs.md`
4. Print a one-line summary back to stdout so the user can see how many mystery commits appeared

This gives a clean list of every job-branch that slipped into main while we weren’t watching.