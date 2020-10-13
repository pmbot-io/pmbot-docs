---
title: 'Upgrade and downgrade'
excerpt: ''
---

# Upgrade and downgrade

## Upgrade

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
docker stop pmbot/server
docker pull pmbot/server
docker start pmbot/server
```

</div>

## Downgrading

Downgrading must be done **one version by one version**. For example, say you are using v1.1.0, and you want to downgrade to v1.0.0, you will have to:
- downgrade from 1.1.0 to 1.0.1
- downgrade from 1.0.1 to 1.0.0

For example, downgrading from 1.1.0 to 1.0.0:

<div class="blockquote" data-props='{ "mod": "info" }'>

`.env` should contain the same variables used for `pmbot-server` in your `docker-compose.yml`. You may use a `.env` file alongside a `docker-compose.yml` (see [here](https://docs.docker.com/compose/environment-variables/)). 

</div>

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell
# stop server
docker stop pmbot_server
# backup volumes
cp -r /data/pmbot /data/pmbot.bak

# downgrade to 1.0.1

# rollback migrations of 1.1.0
docker run --env-file .env --env PMBOT_MIGRATION_ROLLBACK=1 pmbot/server:1.1.0
# pull previous version (1.0.1)
docker pull pmbot/server:1.0.1

# downgrade to 1.0.0

# rollback migrations of 1.0.1
docker run --env-file .env --env PMBOT_MIGRATION_ROLLBACK=1 pmbot/server:1.0.1
# pull previous version (1.0.0)
docker pull pmbot/server:1.0.0

# start normally
docker run --env-file .env pmbot/server:1.0.0
```

</div>
