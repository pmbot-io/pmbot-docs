---
slug: '/plugins/maven'
title: 'Maven'
excerpt: ''
---

# Maven

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
- packageManager:
    name: maven
    config:
    ...
````

</div>

`bumpConfig`

Configures how dependencies should be bumped. This is available because Go does not offer native support for semantic versioning. See the [generic bump configuration](#generic-bump-configuration) which re-use for all package managers that don't natively offer this funtionality.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
- packageManager:
    name: maven
    config:
      bumpConfig:
        ...        
````

</div>

