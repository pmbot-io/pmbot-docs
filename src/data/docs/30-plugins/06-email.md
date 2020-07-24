---
slug: '/plugins/email'
title: 'Send an email'
excerpt: ''
---

# Create issue

This plugin allows you to send an email using [Nodemailer](https://nodemailer.com/message/).

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: "1"
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: email
        config:
          transportOptions:
            host: smtp.company.com
          messageConfig:
            from: "pmbot@company.com"
            to: "admin@company.com"
            subject: "Automated update of {{slug}} {{statusEmoji}}"
          additionalText: "Please contact John if there is any issue."
````

</div>

## transportOptions

A YAML object with Nodemailer [transport options](https://nodemailer.com/smtp/#general-options). For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: email
      config:
        transportOptions:
          port: 1025
          host: mailhog # inside a Docker network
````

</div>

## messageConfig

### from

Email address of the sender. See [Nodemailer's message config](https://nodemailer.com/message/) for advanced usage.

### to

Comma-separated list of recipients. See [Nodemailer's message config](https://nodemailer.com/message/) for advanced usage.

### subject

The email subject.

This [handlebars](https://handlebarsjs.com/guide/#what-is-handlebars) template is passed the following context:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```json
{
    "slug": "myPm",
    "status": "myStatus",
    "statusEmoji": "🚀"
}
```

</div>

| Property | Description |
| --- | --- |
| `slug` | Key that identifies the update in your configuration. For example, "npm", or, "npm-0" when there are multiple `packageManagerUpdates` configured with `npm` as the `packageManager.name`. |
| `status` | Status of the package manager update |
| `statusEmoji` |  Emoji corresponding to the package manager update status |

### Additional properties

You may add any additional Nodemailer [message properties](https://nodemailer.com/message/), except `html` and `text` which are overridden by the plugin.

For example, if you want to add `cc`, you can do:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: email
        config:
          ...
          messageConfig:
            cc: 'test@test.com'

````

</div> 

## additionalText

Additional text to embed in the email body.
