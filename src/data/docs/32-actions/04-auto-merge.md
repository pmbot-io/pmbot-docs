---
title: 'Auto merge'
excerpt: ''
---

# Auto merge

This plugin allows you to automatically merge the update branch into the source branch.

For our bot to commit and push to your repository, you will have to setup and SSH keypair as explained [here](https://docs.pmbot.io/core/projects#git-credentials).

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: "1"
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: auto-merge
        on:
          - success
````

</div>

<div class="blockquote" data-props='{ "mod": "warning" }'>

When a dependency update fails, Pmbot reverts it. For this reason, this plugin will **not** work when `failure` is used in the [`on`](https://docs.pmbot.io/pmbot-yml/package-manager-update-config#on) property.  

</div>

You can customize this plugin by providing a custom configuration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: auto-merge
        on:
          - success
        config:
          commitMessage: 'chore: update {{slug}} dependencies'
````

</div>

## squash

**Default:** `true`

Whether to squash commits into a single one. This ensures a clean Git history.

## commitMessage

**Default:** `chore: update {{slug}} dependencies`

The commit message used for the merge/squash commit.

This [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) template is passed the following context:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```json
{
  "slug": "npm-0"
}
```

</div>

| Property | Description |
| --- | --- |
| `slug` | Key that identifies the update in your configuration. For example, "npm", or, "npm-0" when there are multiple `packageManagerUpdates` configured with `npm` as the `packageManager.name`. |

## removeUpdateBranch

**Default:** `true`

Whether the update branch should be removed.
