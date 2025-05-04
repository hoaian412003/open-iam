#!/bin/bash

branch="${GITHUB_REF_NAME#ft/}"

echo "TRELLO_CARD_ID=$branch" >>$GITHUB_ENV
echo $(./scripts/define-cypress-tags.sh $branch $TRELLO_KEY $TRELLO_TOKEN)
echo "TRELLO_TAGS=$(./scripts/define-cypress-tags.sh $branch $TRELLO_KEY $TRELLO_TOKEN)" >>$GITHUB_ENV
