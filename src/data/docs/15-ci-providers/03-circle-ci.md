---
title: 'Circle CI'
excerpt: ''
---

# Circle CI

## Provider settings

| Field | Description |
| --- | --- |
| Name | The name of your CI provider |
| URL | The URL of your Circle CI instance. You must turn on the **Custom URL** toggle for this parameter to be visible. |

## Project settings

| Field | Config version | Description |
| --- | --- | --- |
| Circle Project Path | all | The path of your Circle CI project. It should have the form `<vcs-type>/<org>/<repo>`, for example `github/jsmith/foo`. |
| Config version | all | The version of your `.circle/config.yml`. |
| Api token | all | The API token will **have** to be a [**Personal API Token**](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token). We are aware that [project access tokens](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-project-api-token) are safer since they grant read-only access to your Circle CI account, but unfortunately, their new API has dropped usage of those tokens. More info [here](https://discuss.circleci.com/t/feedback-wanted-moving-from-v1-1-job-triggering-to-v2-pipeline-triggering/33494). |
| Update job name | 2.0 | The name of the update job in your `.circle/config.yml`. |

<div class="blockquote" data-props='{ "mod": "warning" }'>

Support for `2.0` configuration should end some time in 2020 as Circle CI will drop some API endpoints that we use for v2 configurations. More info [here](https://discuss.circleci.com/t/feedback-wanted-moving-from-v1-1-job-triggering-to-v2-pipeline-triggering/33494).
 
</div> 

## Project Setup

### CI config file

You'll need to update your `.circle/config.yml`.

If you are using version `2`, you need to add an `update` job as shown in the example file below.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: 2 # or 2.0

jobs:
  # this is the important part
  update:
    docker:
      - image: pmbot/bot:latest
    steps:
      - checkout
      - run: pmbot update --url $PMBOT_URL --token $PMBOT_TOKEN

  build:
    docker:
      - image: node:12-alpine
    steps:
      - checkout
      - run: node --version

workflows:
  version: 2
  main:
    jobs:
      - build
```

</div>

Now, in the [project CI settings](#ci-provider-project-configuration), make sure you have selected **Config Version** **2.0** and that you have set the **job name** to `update`.

If you are using config version `2.1`, you will need to [enable pipelines](https://circleci.com/docs/2.0/build-processing/) in your Circle CI account, which allows you to use conditional workflows. You can then define an `update` workflow as shown below:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: 2.1

# parameters sent when we trigger an update
parameters:
  PMBOT:
    type: boolean
    default: false
  PMBOT_UPDATE_ID:
    type: string
    default: ''

jobs:
  # update job
  update:
    docker:
      - image: pmbot/bot:latest
    steps:
      - checkout
      - run: pmbot update --url $PMBOT_URL --token $PMBOT_TOKEN

  build:
    docker:
      - image: node:12-alpine
    steps:
      - checkout
      - run: node --version

workflows:

  update:
    # this is the update workflow
    when: << pipeline.parameters.PMBOT >>
    jobs:
      - update

  main:
    # skip this workflow during an update
    unless: << pipeline.parameters.PMBOT >>
    jobs:
      - build
```

</div>

Now, in the [project CI settings](#ci-provider-project-configuration), make sure you have selected **Config Version** **2.1**.

### Webhook

In your `.circle/config.yml`, add a webhook as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
notify:
  webhooks:
    - url: $PMBOT_URL/v1/ci/<pmbot-project-id>/circle?token=$PMBOT_TOKEN
```

</div>

The above code sample is given to you in the `PMBOT_TOKEN` section of the project **Setup** with preformatted URLs containing proper values for all variables mentioned above. However, here is a description of each of those variables in case it is needed: 

| Variable | Description |
| --- | --- |
| `PMBOT_URL` | The URL of the Pmbot backend. |
| `<pmbot-project-id>` | The ID of your Pmbot project. You can find this ID in the URL of your UI when you are on the project details page. In the [setup](/core/projects#setup) section of your project, this value will be filled in for you in the code snippet displayed. |
| `PMBOT_TOKEN` | Your [`PMBOT_TOKEN`](#pmbot_token) |
