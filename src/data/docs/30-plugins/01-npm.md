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

Since this plugin uses the native `npm` CLI, make sure to add a `.npmrc` with the proper authentication tokens so that the plugin can work properly. 

More details [here](/recipes/private-npm-registry) with example configurations and guidelines for self signed certificates.
