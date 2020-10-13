---
title: 'Gotchas'
excerpt: ''
---

# Gotchas

## Gitea

**I'm trying to setup a repo but I keep getting an error**

Gitea doesn't allow two deploy keys with the same name, so, if you're trying to setup a repo and keep getting errors, check if a deploy key isn't already setup by Pmbot. If so, remove it, and try again. Also, you'll want to remove webhooks that may have been added multiple times when this happens.

**My Gitea pipelines are being triggered multiple times for every commit**

Make sure there your repo webhooks do not contain duplicate entries pointing to your Pmbot server.

## Gitlab

**My pmbot server is not receiving webhooks from Gitlab**

Make sure you have checked "Allow requests to the local network from web hooks and services" in **Admin / Settings / Network / Outbound requests**.
