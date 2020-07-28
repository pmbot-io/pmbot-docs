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

You'll need to update your `.drone.yml`.

The variables marked with `{{...}}` are prefilled in the code snippets provided in your [project setup](/core/projects#setup).

| Variable | Description |
| --- | --- |
| `{{PMBOT_URL}}` | The URL of the Pmbot backend. |
| `{{PMBOT_PROJECT_ID}}` | The ID of your Pmbot project. You can find this ID in the URL of your UI when you are on the project details page. |
| `{{PROJECT_TOKEN}}` | Your [`PMBOT_TOKEN`](#pmbot_token) |

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": [".drone.yml"] }'>

```yaml
kind: pipeline
type: docker
name: default

environment:
  PMBOT_URL: {{PMBOT_URL}}
  PMBOT_PROJECT_ID: {{PMBOT_PROJECT_ID}}
  # !!!!! place this in a project secret variable !!!!!
  # https://docs.drone.io/secret/repository/
  PMBOT_TOKEN: {{PROJECT_TOKEN}}

steps:
  - name: update
    image: pmbot/bot
    environment:
      PMBOT_TOKEN:
        from_secret: PMBOT_TOKEN
    commands:
      # skip this job for standard pipelines
      - if [ -z $PMBOT ]; then exit 0; fi
      # make node_modules available to pmbot CLI
      - npm ci
      # run the pmbot CLI
      - pmbot update

  # your existing build/test jobs
  - name: test
    image: node:12
    commands:
      # skip this job when an update is triggered
      - if [ ! -z $PMBOT ]; then exit 0; fi
      - npm ci
      - npm test

  # notify pmbot of build status (must be the last step)
  - name: notify
    image: registry.dev.pmbot/bot:npm-geoffroy
    pull: always
    environment:
      PMBOT_TOKEN:
        from_secret: PMBOT_TOKEN
    commands:
      - pmbot notify --debug
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

We know that the `if [ ! -z $PMBOT ]; then exit 0; fi` trick isn't really pretty. Drone currently does not support [job conditions](https://docs.drone.io/pipeline/docker/syntax/conditions/) using environment variables, but as soon as it does, we'll update our docs.

For now, you'll also have to repeat the environment definition in the `update` and `notify` steps as it is [currently not possible](https://discourse.drone.io/t/using-from-secrets-in-pipeline-environment-definition/7676/3) to use `from_secret` in the pipeline level environment definition.

</div>

## Self signed certificates

See [`here`](/core/cli#self-signed-certificates).

Define a secret named `NODE_EXTRA_CA_CERTS` which contains the path to your CA certificate file.
