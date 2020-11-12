---
title: 'Github Actions'
excerpt: ''
---

# Github Actions

<div class="blockquote" data-props='{ "mod": "info" }'>

Requires:
- Pmbot UI v2.0.0-beta.9
- Pmbot Server v2.0.0-beta.8
- Pmbot CLI v2.1.0-beta.2
 
</div>

## Repo setup

1. Activate the repo in Pmbot UI
1. Add a new workflow `.github/workflows/pmbot.yml`. Here is an example for updating Npm dependencies: 

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": [".drone.yml"] }'>

```yaml
name: Node.js CI

on: [workflow_dispatch]

# these variables are sent by Pmbot server when triggering updates
inputs:
  PMBOT:
    required: true
  PMBOT_UPDATE_ID:
    required: true
  PMBOT_SSH_PRIVATE_KEY:
    required: false
  PMBOT_PIPELINE_ID:
    required: true

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      # The pmbot CLI requires Node
      - uses: actions/setup-node@v1
        with:
          node-version: 12.x
      # You must install your dependencies before running the pmbot CLI
      # if you are using ruby, composer, maven, etc, install your dependencies
      # manually as well
      - run: npm ci
      # run the update using pmbot CLI and bind inputs/secrets to env vars
      - run: npx @pmbot/cli update
        env:
          PMBOT_URL: ${{ secrets.PMBOT_URL }}
          PMBOT_TOKEN: ${{ secrets.PMBOT_TOKEN }}
          PMBOT_PROJECT_ID: ${{ secrets.PMBOT_PROJECT_ID }}
          PMBOT_SSH_PRIVATE_KEY: ${{ github.event.inputs.PMBOT_SSH_PRIVATE_KEY }}
          PMBOT_UPDATE_ID: ${{ github.event.inputs.PMBOT_UPDATE_ID }}
```

</div>
