---
title: 'Mattermost'
excerpt: ''
---

# Mattermost

This plugin allows you to send a Mattermost message.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: mattermost
        config:
          url: "${env.MY_MATTERMOST_WEBHOOK_URL}"
          channels:
            - team1
            - awesomeness
          title: 'Automated update of {{slug}} {{statusEmoji}}'
````

</div>

## url

Mattermost [incoming webhook URL](https://docs.mattermost.com/developer/webhooks-incoming.html#simple-incoming-webhook).

## channels

Channels where to send the message. Obsolete parameter when you have enabled **Lock to this channel** for the incoming webhook.

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
