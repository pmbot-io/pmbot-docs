---
title: 'Gitlab CI'
excerpt: ''
---

# Gitlab CI

<div class="blockquote" data-props='{ "mod": "warning" }'>

If you're looking for the Gitlab **git** provider documentation, go to [Git Providers / Gitlab](../git-providers/gitlab).

</div>

## Provider settings

| Field | Description |
| --- | --- |
| Name | The name of your CI provider |
| Gitlab URL | The URL of your Gitlab instance. You must turn on the **self hosted** toggle for this parameter to be visible. |

## Project settings

| Field | Description |
| --- | --- |
| Gitlab project ID | The ID of your Gitlab project, available under **Settings / General** in your Gitlab project. |
| Pipeline trigger token | This token allows Pmbot to trigger a pipeline in Gitlab CI. You can created them in **Settings / CI/CD / Pipeline Triggers** in your Gitlab project. Checkout [the official Gitlab docs](https://docs.gitlab.com/ee/ci/triggers/#adding-a-new-trigger) for more info. |

## Project Setup

Running Pmbot on Gitlab CI is made easy thanks to Gitlab webhooks and a feature rich CI configuration file.

### CI config file

You will need to define an `update` job in your `.gitlab-ci.yml`. Here is an example for updating Npm dependencies.

<div class="code-group" data-props='{ "lineNumbers": [true] }'>

```yaml
# cache things pmbot needs to access during the update
cache:
  untracked: true
  key: "$CI_PROJECT_ID-$CI_COMMIT_REF_NAME"
  paths:
    - node_modules/

stages:
  - install
  - update
  - test

# pmbot will need these dependencies
install:
  stage: install
  image: node:12-alpine
  script:
    - npm ci

update:
  stage: update
  image: pmbot/bot:1
  # run the update job only when variable environment $PMBOT is "true"
  only:
    variables:
      - $PMBOT == "true"
  script:
    # run the update
    - pmbot update --url "$PMBOT_URL" --token "$PMBOT_TOKEN"

test:
  stage: test
  image: node:12-alpine
  # skip this job when running the update job
  except:
    variables:
      - $PMBOT == "true"
  script:
    - npm test
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

If you are using a self signed certificate on your private Npm registry, make sure to pass [`--trusted-ca`](/core/pmbot-cli#trusted-ca) to the `pmbot` CLI or define an environment variable named `PMBOT_TRUSTED_CA`.

</div>

### Webhook

In Gitlab CI, you'll have to create a [webhook](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html).

Go to your Gitlab project, then in **Settings / Webhooks**, add a webhook with the following parameters:

| Field | Value |
| --- | --- |
| URL | `<pmbot-backend-url>/v1/ci/<pmbot-project-id>/gitlab`. Your Pmbot project ID can be found in the URL of your project details page. |
| Token | Your [`PMBOT_TOKEN`](#pmbot_token) |
| Trigger | Pipeline events |

In the Pmbot UI, `<pmbot-backend-url>` should already be replaced with the proper URL. 

## Self signed certificates

See [`--trustedCa`](/core/pmbot-cli#trusted-ca).

We recommend setting a [CI/CD variable](https://docs.gitlab.com/ee/ci/variables/) of type [**file**](https://docs.gitlab.com/ee/ci/variables/#custom-environment-variables-of-type-file) at [the group level](https://docs.gitlab.com/ee/ci/variables/#group-level-environment-variables) or the [instance level]() with your certificate authority. Our CLI will pick the variable up automatically. More info about on this topic [in our recipes](/recipes/gitlab-ci).
