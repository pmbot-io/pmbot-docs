---
title: 'Slack'
excerpt: ''
---

# Slack

This plugin allows you to send a Slack message.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: slack
        config:
          url: "${env.MY_SLACK_WEBHOOK_URL}"
          title: 'Automated update of {{slug}} {{statusEmoji}}'
          additionalText: '@john'
````

</div>

## url

Slack webhook URL. To get this URL:

1. [Create](https://api.slack.com/apps?new_app=1) a custom Slack App. Fill in the form as follows:
    - *App Name*: `Pmbot`
    - *Development Slack Workspace*: Workspace where you want Pmbot to be integrated to
2. Click "Create App". You are redirected to your app's page.
3. Under menu section *Features*, select *Incoming Webhooks*, then toggle on *Activate Incoming Webhooks*. A new section named *Webhook URLs for Your Workspace* appears.
4. Under section *Webhook URLs for Your Workspace*, click *Add New Webhook To Workspace*, then select the channel to which you want messages to be sent, for example `#pmbot`.
5. Once added, copy the webhook URL and configure this action with it

## title

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

## additionalText

Additional text to embed in the message body.
