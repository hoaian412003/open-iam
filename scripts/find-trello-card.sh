#!/bin/bash
set -e

CARD_ID=$1
TRELLO_KEY=$2
TRELLO_TOKEN=$3

curl --request GET \
  --url "https://api.trello.com/1/cards/$CARD_ID?key=$TRELLO_KEY&token=$TRELLO_TOKEN&includes=labels" \
  --header 'Accept: application/json'
