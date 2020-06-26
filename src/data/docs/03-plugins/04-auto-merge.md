---
slug: '/plugins/auto-merge'
title: 'Auto merge'
excerpt: ''
---

# Auto merge

This plugin allows you to automatically merge the update branch into the source branch.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
- packageManager:
    name: auto-merge
    config:
      squash: true
      commitMessage: 'chore: update {{slug}} dependencies'
      removeUpdateBranch: true
````

</div>

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
