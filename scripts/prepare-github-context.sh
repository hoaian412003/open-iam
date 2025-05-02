#!/bin/bash

branch="${GITHUB_REF_NAME#ft/}"

echo "TRELLO_CARD_ID=$branch" >>$GITHUB_ENV
echo "CYPRESS_grepTags=$(./scripts/define-cypress-tags.sh $branch $TRELLO_KEY $TRELLO_TOKEN)" >>$GITHUB_ENV
