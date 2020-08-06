---
title: 'Maven'
excerpt: ''
---

# Maven

To use this plugin, you will have to make sure the `mvn` CLI is available in the environment. Our `pmbot/bot:maven` docker image embeds Maven 3.6 and the Open JDK 11.

Also, you will have to install your maven dependencies manually before running the `pmbot` CLI.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: maven
      config:
        # ...
````

</div>

## Limitations of the current plugin

The current Maven plugin is only able to update dependencies for which the version is specified directly in the `<version></version>` tag of the dependency inside your `pom.xml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```xml
<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
  <version>2.6</version>
</dependency>
```

</div>

If you do not specifiy a version:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```xml
<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
</dependency>
```

</div>

or use **properties**

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```xml
<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
  <version>${commonsio.version}</version>
</dependency>
```

</div>

the plugin will not be able to update the dependency.

## bumpConfig

Configures how dependencies should be bumped. This is available because Go does not offer native support for semantic versioning. See the [generic bump configuration](/pmbot-yml/generic-bump-configuration) which re-use for all package managers that don't natively offer this funtionality.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: maven
      config:
        bumpConfig:
          # ...        
````

</div>

## settingsPath

**Default:**
- `~/.m2/settings.xml`
- `.m2/settings.xml`

Path to a maven `settings.xml` file which contains credentials for private repositories.

## Environment variables

### MAVEN_OPTS

We export this variable before running the `mvn` CLI:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```bash
export MAVEN_OPTS=$MAVEN_OPTS; mvn ...
```

</div>

### MAVEN\_CLI\_OPTS

This variable is passed to the `mvn` CLI as follows: `mvn $MAVEN_CLI_OPTS`
