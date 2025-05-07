curl -X POST http://localhost:5001/api/add-points \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer xxxxxxxxxxxxx" \
     -d '{"username": "chameleon_yogai", "points": 100, "from_action": "completed_task"}'


curl -X POST https://api.midnightapes.com/api/add-points \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer xxxxxxxxxxxxxxx" \
     -d '{"username": "chameleon_kabukiactor30", "points": 100, "from_action": "completed_task"}'


curl -X POST http://localhost:5001/api/add-points \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer xxxxxxxxxxxx" \
     -d '{"username": "chameleon_tactician83", "points": 22, "from_action": "whitelist-1"}'


curl -X POST https://api.midnightapes.com/api/add-points \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer xxxxxxxxxxxxxxx" \
     -d '{"username": "chameleon_trader76", "points": 100, "from_action": "twitter-status-update", "isUnique": "true"}'

