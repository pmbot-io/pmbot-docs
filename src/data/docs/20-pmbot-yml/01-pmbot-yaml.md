---
title: '.pmbot.yml'
excerpt: ''
---

# .pmbot.yml

The `.pmbot.yml` file allows you to configure how the `pmbot` CLI performs updates.

<div class="table-of-content"></div>

## Environment variable injection

You can use environment variables anywhere in your `.pmbot.yml` by placing `${env.MY_VAR}` where `MY_VAR` is an environment variable:

For example, you could place a webhook secret in a `WEBHOOK_SECRET` environment variable, and use it as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
actions:
  - name: 'my-action'
    config:
      url: https://hook.domain.com?token=${env.WEBHOOK_SECRET}
```

</div>

at runtime, `${env.WEBHOOK_SECRET}` will be replaced with the value set in the environment.

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

A list of [package manager update configs](/package-manager-update-config). In a single project, you may update your Npm dependencies, Go dependencies etc.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - ...
````

</div>
