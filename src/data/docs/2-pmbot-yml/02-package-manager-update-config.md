---
title: 'Package manager update config'
excerpt: ''
---

# Package manager update config

A package manager config allows you to configure how updates are made for a single package manager (e.g Npm, Go, ...).

## packageManager

Configure which package manager to use and fine tune the settings. This is an object representing a standard Pmbot plugin declaration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
  - packageManager:
      name: ... # npm | go
      config: ... # config of your package manager
````

</div>

Available package managers:

- [Npm](/plugins/npm)
- [Go](/plugins/go)
- [Go](/plugins/maven)
- ... can't find your favorite package manager here ? You can [create your own package manager plugin](#plugins/custom) or open an issue on our [Github issue tracker](https://github.com/pmbot-io/issues/issues) so we can keep track of your request !

## ci

Allows you to configure CI behavior

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
  - ci:
      enabled: true # defaults to true
````

</div>

### enabled

Whether CI should be enabled. When CI is enabled (`ci.enabled` set to `true`), Pmbot updates one dependency at a time and waits for CI to pass or fail for each dependency updated.

When you set it to `false`, we update all dependencies at once, commit and push, and we do not listen to CI pipeline results.

**default:** `true`

**optional** yes

## branchPrefix

When Pmbot updates your dependencies, it does so on a specific branch. By default, we use `update/` as a branch prefix. Use this prefix to change the branch prefix.

## commitMessage

Commit message template to use when Pmbot commits a dependency update.

This [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) template is passed the following context:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```json
{
    "dependency": "chalk",
    "versionBefore": "1.0.0",
    "versionAfter": "1.0.1"
}
```

| Property | Description |
| --- | --- |
| `dependency` | Name of the dependency |
| `versionBefore` | Version before the update |
| `versionAfter` | Version after the update |

</div>

## ignore

List of dependencies to ignore. Each item is a [minimatch](https://github.com/isaacs/minimatch) pattern.

## actions

List of actions to execute when the update is done. See [actions](/actions).

Configure which package manager to use and fine tune the settings. This is an object representing a standard Pmbot plugin declaration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
  - ...
    actions:
      name: ... 
      config: ...
      on: ...
````

</div>

Available actions are:

- [auto-merge](/plugins/auto-merge)
- [create-issue](/plugins/create-issue)
- [create-merge-request](/plugins/create-merge-request)
- [email](/plugins/email)
- [mattermost](/plugins/mattermost)
- [slack](/plugins/slack)
- [webhook](/plugins/webhook)
- ... can't find what you need ? You can [write your own actions](#plugins/custom) as a Pmbot plugin. Otherwise, you can open an issue on our [Github issue tracker](https://github.com/pmbot-io/issues/issues) so we can keep track of your request !

### name

Name of the action. See available actions above.

### config

Configuration of the action. See available actions above for specific options.

### on

When to trigger this action:

| Value | Description |
| `success` | When all dependencies have been updated successfully |
| `partial` | When some dependencies succeeded and some failed |
| `failure` | When all dependencies failed to update |
