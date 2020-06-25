---
slug: '/plugins/npm'
title: 'Npm'
excerpt: ''
---

# Npm

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
  - packageManager:
      name: npm
````

</div>

The Npm package manager does not have additional configuration.

## Private Npm registries

Since this plugin uses the native `npm` CLI, make sure to add a `.npmrc` with the proper authentication tokens so that the plugin can work properly. More details [here](/recipes/private-npm-registry).

If your private registry uses a self signed certificate, make sure to pass `--trustedCa` with a string containing your private certificate authority. For example:

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
