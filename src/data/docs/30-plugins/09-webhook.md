---
slug: '/plugins/webhook'
title: 'Webhook'
excerpt: ''
---

# Webhook

This plugin allows you to `POST` the update result to a specific URL.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: "1"
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: webhook
        config:
          url: "https://automation.company.com/webhooks/pmbot"
          extraData:
            # ...
          headers:
            # ...
````

</div>

## url

The webhook URL to which data will be sent.

## extraData

Data that will be appended to the webhook payload (body) in property `extraData`. Can be of any shape. The YAML will be converted to a JSON object.

For example, with the following configuration:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: webhook
      config:
        extraData:
          prop: 'val'
          arr:
            - val1
            - val2
````

</div>

the webhook payload will include:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````json
{
  "extraData": {
    "prop": "val",
    "arr": [
      "val1",
      "val2"
    ]
  }
}
````

</div>

## headers

An **array** of additional headers to append to the HTTP request.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: webhook
      config:
        ...
        headers:
          - name: "Authorization"
            value: "${env.MY_TOKEN}"
````

</div>

## Request body

The **JSON** body contains information about the update.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````json
{
  "state": {
    "status": "success",
    "dependencyUpdates": [
      {
        "status": "skipped",
        "dependency": {
          "name": "@types/chalk",
          "current": "2.2.0",
          "wanted": "2.2.0",
          "latest": "2.2.0"
        }
      },
      {
        "status": "skipped",
        "dependency": {
          "name": "chalk",
          "current": "1.1.3",
          "wanted": "1.1.3",
          "latest": "2.4.2"
        },
        "warnings": [
          "Latest version \u001b[1m2.4.2\u001b[22m of \u001b[1mchalk\u001b[22m is outside range \u001b[1m^1.1.2\u001b[22m defined in your package manager dependency file. You may want to update your version range to include the latest version."
        ]
      },
      {
        "status": "success",
        "dependency": {
          "name": "is-sorted",
          "current": "1.0.1",
          "wanted": "1.0.5",
          "latest": "1.0.5"
        }
      },
      {
        "status": "success",
        "dependency": {
          "name": "@types/node",
          "current": "12.0.8",
          "wanted": "12.0.10",
          "latest": "12.0.10"
        }
      },
      {
        "status": "skipped",
        "dependency": {
          "name": "package-json",
          "current": "6.4.0",
          "wanted": "6.4.0",
          "latest": "6.4.0"
        }
      }
    ],
    "actions": [],
    "updateBranch": "update/npm/master/1234",
    "slug": "npm-0"
  },
  "extraData": {
    ...
  }
}
````

</div>
