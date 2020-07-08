---
title: 'Drone CI'
excerpt: ''
---

# Drone CI

Drone CI is natively supported in Pmbot.

<div class="blockquote" data-props='{ "mod": "warning" }'>

Done CI does not support projects with names containing more than one `/`. Github projects are always formatted as `<workspace>/<project-name>`, but Gitlab projects can have sub-groups such as `group1/group2.project1`. Hence, Pmbot will not work with those. More info [here](https://github.com/drone/drone/issues/2009).
 
</div> 

## Provider settings

| Field | Description |
| --- | --- |
| Name | The name of your CI provider |
| Gitlab URL | The URL of your Gitlab instance. You must turn on the **self hosted** toggle for this parameter to be visible. |
| Personal token | A drone API personal token, available in your Drone CI user settings. This token will be global, may be overridden at the project level. |

## Project settings

| Field | Description |
| --- | --- |
| Project path | The path of your project in the form `<workspace>/<project-name>`. |
| Personal token | A drone API personal token, available in your Drone CI user settings. | 

## Project Setup

### CI config file

You'll need to update your `.drone.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": [".drone.yml"] }'>

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: update
    image: pmbot-io/bot
    environment:
      PMBOT_URL: https://pmbot.company.com
      PMBOT_TOKEN:
        from_secret: PMBOT_TOKEN
    commands:
      # don't execute this job for standard builds triggered by a commit
      - if [ -z $PMBOT ]; then exit 0; fi
      # provider the pmbot CLI with your node_modules
      - npm ci
      - pmbot update --token "$PMBOT_TOKEN" --url "$PMBOT_URL" --debug --disable-host-key-verification

  - name: build
    image: node:12
    commands:
      # don't execute this job for builds created by Pmbot
      - if [ ! -z $PMBOT ]; then exit 0; fi
      - node --version

  # webhook config (see below)
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

We know that the `if [ ! -z $PMBOT ]; then exit 0; fi` trick isn't really pretty. Drone currently does not support [job conditions](https://docs.drone.io/pipeline/docker/syntax/conditions/) using environment variables, but as soon as it does, we'll update our docs. 

</div>

### Webhook

First, you'll have to add a project secret named `PMBOT_WEBHOOK_TOKEN_HEADER` with your project token as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
Authorization=<your-project-token>
```

</div>

Then, in your `.drone.yml`, define a [webhook](http://plugins.drone.io/drone-plugins/drone-webhook/) as **the last step**:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
steps:
  # ...

  - name: webhook
    image: plugins/webhook
    when:
      status:
        - success
        - failure
    settings:
      urls: https://pmbot.company.com
      headers:
        from_secret: PMBOT_WEBHOOK_TOKEN_HEADER
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

[We would love](https://discourse.drone.io/t/using-environment-variables-in-plugin-settings/7598) to reuse the existing project secret `PMBOT_TOKEN` you defined to provide the `pmbot` CLI with the `--token` option. When Drone supports this feature, we'll update our docs. 

</div>

## Self signed certificates

See [`--trustedCa`](/core/cli#trusted-ca).

Define a secret named `PMBOT_TRUSTED_CA_CONTENT` which contains the content of your certificate file. Then, update your `.drone.yml` as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
steps:
  - name: update
    # ...
    environment:
      # ...
      PMBOT_TRUSTED_CA_CONTENT:
        from_secret: PMBOT_TRUSTED_CA
    commands:
      - if [ -z $PMBOT ]; then exit 0; fi
      - # ... install node_modules
      - echo $PMBOT_TRUSTED_CA_CONTENT > .ca-cert.pem
      - pmbot update --trustedCa=".ca-cert.pem" # ... other options 
```

</div>
