---
title: 'Pmbot YAML Reference'
sidebarTitle: '.pmbot.yml'
excerpt: ''
---

# Pmbot YAML Reference

The `.pmbot.yml` file allows you to configure how the `pmbot` CLI performs updates.

## version

**Required**

Tells version of your `.pmbot.yml` file. The only value at this time is `1`

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
```

</div>

## packageManagers

**Required**

A list of [package manager update configs](/pmbot-yml/package-manager-update-config). In a single project, you may update your Npm dependencies, Go dependencies etc.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - ...
````

</div>
