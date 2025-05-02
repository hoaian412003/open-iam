#!/bin/bash

find './cypress/videos' | while read -r video; do
  if [ -f "$video" ]; then
    echo "Uploading $video to Trello card $TRELLO_CARD_ID..."
    curl -s -X POST "https://api.trello.com/1/cards/$TRELLO_CARD_ID/attachments?token=$TRELLO_TOKEN&key=$TRELLO_KEY" \
      -F "file=@$video"
    echo "Uploaded: $video"
  fi
done
