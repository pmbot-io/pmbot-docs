---
title: 'Self signed certificates'
excerpt: ''
---

# Self signed certificates

If your Pmbot backend uses a self signed certificate, you will need to set an environment variable named `NODE_EXTRA_CA_CERTS` with the private certificates. For example:

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

With Gitlab, we recommend setting a [CI/CD variable](https://docs.gitlab.com/ee/ci/variables/) of type [**file**](https://docs.gitlab.com/ee/ci/variables/#custom-environment-variables-of-type-file) at [the group level](https://docs.gitlab.com/ee/ci/variables/#group-level-environment-variables) with your certificate authority. You can then pass it to the `pmbot` CLI as follows: 

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...

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
    - export NODE_EXTRA_CA_CERTS="${PMBOT_TRUSTED_CA}"
    - pmbot update --url "$PMBOT_URL" --token "$PMBOT_TOKEN"

# ...
```

</div>

<div class="blockquote" data-props='{ "mod": "info" }'>

We are aware that this is redundant as you may already be passing `--trustedCa` for a [private Npm registry](/recipes/private-npm-registry) and are working on removing the need for setting `NODE_EXTRA_CA_CERTS`, so stay tuned.

</div>
