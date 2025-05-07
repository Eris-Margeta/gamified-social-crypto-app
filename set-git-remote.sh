#!/bin/sh

echo "What's the current remote-git repository? (tcp:// format expected)"
read REMOTE_URL

# Replace 'tcp://' with 'git://' and ensure the URL ends with a '/'
MODIFIED_URL=$(echo $REMOTE_URL | sed 's/tcp:\/\//git:\/\//')"/"

# Assuming the remote name is 'origin' and you want to replace it
git remote remove origin
git remote add origin $MODIFIED_URL

echo "Remote URL set to $MODIFIED_URL"

git fetch

git branch --set-upstream-to=origin/master master
