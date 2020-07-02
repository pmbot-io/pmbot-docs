---
slug: '/plugins/maven'
title: 'Maven'
excerpt: ''
---

# Maven

To use this plugin, you will have to make sure that the `mvn` CLI is available in the environment. Our default docker image embeds Maven 3.6 and the Open JDK 11.

Also, you will have to install your maven dependencies manually before running the `pmbot` CLI.

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

## `bumpConfig`

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

## Environment variables

### MAVEN_OPTS

We export this variable before running the `mvn` CLI:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```
export MAVEN_OPTS=$MAVEN_OPTS; mvn ...
```

</div>

### MAVEN_CLI_OPTS

This variable is passed to the `mvn` CLI as follows: `mvn $MAVEN_CLI_OPTS`
