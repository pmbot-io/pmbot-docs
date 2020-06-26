---
title: 'Self signed certificates'
excerpt: ''
---

# Self signed certificates

If your Pmbot backend uses a self signed certificate, you will need to set an environment variable named `PMBOT_TRUSTED_CA` with the private certificates or pass it to the `pmbot` CLI as [`--trusted-ca`](/core/pmbot-cli#trusted-ca). An example file would look like this:

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

With Gitlab, we recommend setting a [CI/CD variable](https://docs.gitlab.com/ee/ci/variables/) of type [**file**](https://docs.gitlab.com/ee/ci/variables/#custom-environment-variables-of-type-file) at [the group level](https://docs.gitlab.com/ee/ci/variables/#group-level-environment-variables) with your certificate authority. Our CLI will pick the variable up automatically. 
