---
title: 'Drone CI'
excerpt: ''
---

# Drone CI

Drone CI is natively supported in Pmbot.

<div class="blockquote" data-props='{ "mod": "warning" }'>

Done CI does not support repos with names containing more than one `/`. Github projects are always formatted as `<workspace>/<project-name>`, but Gitlab projects can have sub-groups such as `group1/group2.project1`. Hence, Pmbot will not work with those. More info [here](https://github.com/drone/drone/issues/2009).
 
</div> 

## Repo setup

1. Activate the repo in Pmbot UI
1. Update your `.drone.yml`. Here is an example for updating Npm dependencies:

<div class="code-group" data-props='{ "lineNumbers": ["true"], "labels": [".drone.yml"] }'>

```yaml
kind: pipeline
type: docker
name: default

steps:
  - name: update
    image: registry.dev.pmbot/bot:npm-geoffroy
    environment:
      PMBOT_URL:
        from_secret: PMBOT_URL
      PMBOT_TOKEN:
        from_secret: PMBOT_TOKEN
    commands:
      # skip this job for standard pipelines
      - if [ -z $PMBOT ]; then exit 0; fi
      # make node_modules available to pmbot CLI
      - npm ci
      # run the pmbot CLI
      - pmbot update --disable-host-key-verification

  # your existing build/test jobs
  - name: test
    image: node:12
    commands:
      # skip this job when an update is triggered
      - if [ ! -z $PMBOT ]; then exit 0; fi
      - echo "All tests passed"

  # notify pmbot of build status (must be the last step)
  - name: notify
    image: registry.dev.pmbot/bot:npm-geoffroy
    when:
      status:
        - success
        - failure
    environment:
      PMBOT_TOKEN:
        from_secret: PMBOT_TOKEN
      PMBOT_URL:
        from_secret: PMBOT_URL
      PMBOT_REPO_ID:
        from_secret: PMBOT_REPO_ID
    commands:
      - pmbot notify
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

We know that the `if [ ! -z $PMBOT ]; then exit 0; fi` trick isn't really pretty. Drone currently does not support [job conditions](https://docs.drone.io/pipeline/docker/syntax/conditions/) using environment variables, but as soon as it does, we'll update our docs.

For now, you'll also have to repeat the environment definition in the `update` and `notify` steps as it is [currently not possible](https://discourse.drone.io/t/using-from-secrets-in-pipeline-environment-definition/7676/3) to use `from_secret` in the pipeline level environment definition.

</div>

## Self signed certificates

Background information on this topic can be found [`here`](/core/cli#self-signed-certificates).

Define a secret named `PMBOT_TRUSTED_CA` which contains **the content** of your CA certificate file. Then, update your `.drone.yml` as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
...

steps:
  - name: update
    ...
    environment:
      PMBOT_TRUSTED_CA:
        from_secret: PMBOT_TRUSTED_CA
    commands:
      ...
      # output your trusted CA content to a file
      - echo $PMBOT_TRUSTED_CA > .ca-cert.pem
      # pass the trusted CA path via the --trusted-ca option
      - pmbot update --trusted-ca .ca-cert.pem --disable-host-key-verification

  ...

  - name: notify
    ...
    environment:
      PMBOT_TRUSTED_CA:
        from_secret: PMBOT_TRUSTED_CA
    commands:
      # output your trusted CA content to a file
      - echo $PMBOT_TRUSTED_CA > .ca-cert.pem
      # pass the trusted CA path via the --trusted-ca option
      - pmbot notify --trusted-ca .ca-cert.pem
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

If any of you out there would like to suggest a shorter or more simple way to do the above, [let us know](https://discourse.pmbot.io) !

</div>
