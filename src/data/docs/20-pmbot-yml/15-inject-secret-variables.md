---
title: 'Inject Secret Variables'
excerpt: ''
---

# Environment variable injection

You can use environment variables anywhere in your `.pmbot.yml` by placing `${env.MY_VAR}` where `MY_VAR` is an environment variable:

For example, you could place a webhook secret in a `WEBHOOK_SECRET` environment variable, and use it as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
actions:
  - name: 'my-action'
    config:
      url: https://hook.domain.com?token=${WEBHOOK_SECRET}
```

</div>

at runtime, `${env.WEBHOOK_SECRET}` will be replaced with the value set in the environment.
