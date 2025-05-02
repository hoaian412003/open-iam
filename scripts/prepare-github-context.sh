#!/bin/bash

branch="${GITHUB_REF_NAME#ft/}"

echo "CYPRESS_grepTags=$(./scripts/define-cypress-tags.sh $branch $TRELLO_KEY $TRELLO_TOKEN)" >>$GITHUB_ENV
