---
slug: '/plugins/auto-merge'
title: 'Auto merge'
excerpt: ''
---

# Auto merge

This plugins allows you to automatically merge the update branch into the source branch.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
- packageManager:
    name: auto-merge
    config:
      rebase: true
      squash: true
      commitMessage: 'chore: update {{slug}} dependencies'
      removeUpdateBranch: true
````

</div>

## rebase

Tells pmbot to rebase the update branch onto the source branch instead of merging. This allows a cleaner Git history.

## squash

Whether to squash commits into a single one. This ensures a clean Git history.

## commitMessage

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
