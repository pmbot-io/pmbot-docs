---
title: 'Package manager update config'
excerpt: ''
---

# Package manager update config

A package manager config allows you to configure how updates are made for a single package manager (e.g Npm, Go, ...).

<div class="table-of-content"></div>

## packageManager

**Required**

Configure which package manager to use and fine tune the settings. This is an object representing a standard Pmbot plugin declaration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
packageManagers:
  - packageManager:
      name: ... # npm | go
      config: ... # config of your package manager
```

</div>

Available package managers are listed [here](/plugins/plugin-list#package-managers).

## ci

**Optional**

Allows you to configure CI behavior

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
packageManagers:
   - packageManager: ...
     ci:
       enabled: true # defaults to true
```

</div>

### enabled

**Default:** `true`

Whether CI should be enabled. When CI is enabled (`ci.enabled` set to `true`), Pmbot updates one dependency at a time and waits for CI to pass or fail for each dependency updated.

When you set it to `false`, we update all dependencies at once, commit and push, and we do not listen to CI pipeline results.


## branchPrefix

**Default:** `update/`

When Pmbot updates your dependencies, it does so on a specific branch. The name of that branch starts with this prefix.

## commitMessage

**Default:** `chore: update {{dependency}} from {{versionBefore}} to {{versionAfter}}`

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

</div>

| Property        | Description               |
| --------------- | ------------------------- |
| `dependency`    | Name of the dependency    |
| `versionBefore` | Version before the update |
| `versionAfter`  | Version after the update  |

## ignore

**Default:** none

A list dependencies to ignore. Each item should be Javascript regular expression.

## actions

**Default:** none

List of actions to execute when the update is done. See [actions](/actions).

Configure which package manager to use and fine tune the settings. This is an object representing a standard Pmbot plugin declaration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
packageManagers:
  - ...
    actions:
      name: ...
      config: ...
      on: ...
```

</div>

Available actions are listed [here](/plugins/plugin-list#actions).

### name

**Required**

Name of the action. See available actions above.

### config

**Default:** none

Configuration of the action. See available actions above for specific options.

### on

**Default:** always

When to trigger this action:

| Value     | Description                                          |
| --------- | ---------------------------------------------------- |
| `success` | When all dependencies have been updated successfully |
| `partial` | When some dependencies succeeded and some failed     |
| `failure` | When all dependencies failed to update               |

<div class="blockquote" data-props='{ "mod": "warning" }'>

No actions are executed when all dependency updates have status `skipped`.

</div>

## keepUpdateBranchOnFailure

**Default:** `false`

By default, after all actions have been executed, Pmbot deletes the update branch when the status of the package manager update is `failure`. To disable this behavior and keep the update branch, set this to `true`.
