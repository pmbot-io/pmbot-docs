---
title: '.pmbot.yml'
excerpt: ''
---

# .pmbot.yml

The `.pmbot.yml` file allows you to configure how the `pmbot` CLI performs updates.

<div class="table-of-content"></div>

## version

Tells version of your `.pmbot.yml` file. The only value at this time is `1`

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
```

</div>

## updates

A list of [package manager update configs](/package-manager-update-config). In a single project, you may update your Npm dependencies, Go dependencies etc.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
  - ...
````

</div>
