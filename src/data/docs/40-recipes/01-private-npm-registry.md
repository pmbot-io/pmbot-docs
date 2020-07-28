---
title: 'Private Npm registry'
excerpt: ''
---

# Private Npm registry

Our [npm](/plugins/npm) plugin uses the native Npm CLI, make sure to set a `.npmrc` so that it can access your private registry.

If your private registry uses a self signed certificate, make sure to set the `NODE_EXTRA_CA_CERTS` environment variable with a path to your certificate in the **PEM** format:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```shell script
-----BEGIN CERTIFICATE-----
MIIFtDCCA5ygAwIBAgIJAKh8+CrWL5MeMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNV
...
nDFc85qf23ctw8OnZULq6H9VT/m02vgIqCD21hrCt8krY5n8JgOoRWsn9PVIsIVu
fQ+WljzA1PldDsGyspFWPpwqw3qSo9Uj
-----END CERTIFICATE-----
```

</div>

## Gitlab 

Here is an example `.gitlab-ci.yml` configuration file that leverages job templates:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# generic script that your jobs can be extended when they need a .npmrc 
.npmrc:
  before_script:
    - echo "//npm.domain.com/:_authToken=${NPM_TOKEN}" >> ~/.npmrc

setup:
  extends: .npmrc # creates an .npmrc
  stage: setup
  script:
    - npm ci

update:
  extends: .npmrc # creates an .npmrc
  stage: update
  image: registry.dev.pmbot/bot:geoffroy
  dependencies:
    - setup
  only:
    variables:
      - $PMBOT == "true"
  script:
    - npm ci
    - pmbot update --url "$PMBOT_URL" --token "$PMBOT_TOKEN" --disable-host-key-verification

# ... your other jobs
```

</div>

Here is another example `.gitlab-ci.yml` configuration file that leverages the global `before_script`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# global before script
before_script:
- echo "//npm.domain.com/:_authToken=${NPM_TOKEN}" >> ~/.npmrc

setup:
  stage: setup
  script:
    - npm ci

update:
  stage: update
  image: registry.dev.pmbot/bot:geoffroy
  dependencies:
    - setup
  only:
    variables:
      - $PMBOT == "true"
  script:
    - npm ci
    - pmbot update --url "$PMBOT_URL" --token "$PMBOT_TOKEN" --disable-host-key-verification

# ... your other jobs
```

</div>
