---
title: 'Pmbot CLI notify command'
sidebarTitle: 'notify'
excerpt: ''
---

# notify

The notify allows you to notify Pmbot of the ouput of your CI.

## Options

### token

**CLI Option:** `--token <token>`, `-t <token>`

**Environment variable:** `PMBOT_TOKEN`

**Default:** none, **required**

Token used to authenticate with the [API](#url).

### project-id

**CLI Option:** `--project-id <project-id>`, `-p <project-id>`

**Environment variable:** `PMBOT_PROJECT_ID`

**Default:** none

Your Pmbot project ID. This value is given to you in the **Setup** section of the UI.

### url

**CLI Option:** `--url <url>`, `-u <url>`

**Environment variable:** `PMBOT_URL`

**Default:** `https://app.pmbot.io`

The URL to the instance of Pmbot used for the update (e.g. `https://pmbot.company.com` or `https://company.com/pmbot`)

### success

**CLI Option:** `--success <url>`, `-s <url>`

**Environment variable:** `PMBOT_SUCCESS`

**Default:** false

Tells whether CI passed or failed. Use `--success` or `--success true` for indicating a successful pipeline and `--success false` to indicate a failure.
