git daemon --reuseaddr --base-path=. --export-all --verbose --enable=receive-pack &
GIT_DAEMON_PID=$!

ngrok tcp 9418

kill $GIT_DAEMON_PID
