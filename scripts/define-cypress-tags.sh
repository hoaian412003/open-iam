#!/bin/bash

read -a labels <<<$(./scripts/find-trello-card.sh $1 $2 $3 | jq -r '.labels[].name')
# Labels is array of string with prefix is @

tags=$(
  IFS='+'
  echo "${labels[*]}"
)

echo "$tags"
