---
slug: '/plugins/create-merge-request'
title: 'Create merge request'
excerpt: ''
---

# Create issue

This plugin allows you to open a merge request.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: create-merge-request
        on:
          - success
        config:
          token: '${env.MY_TOKEN}'
````

</div>

## token

**Required**

Allows the plugin to authenticate with your Git provider API:
- with **Gitlab**, it should be a [Gitlab personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- with **Github**, it should be a [Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

## title

**Default:** `Automated update of {{slug}} dependencies {{statusEmoji}}`

Allows you to customize issue title.

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

**Default:** none

Additional text to embed in the issue description.

## assignees

**Default:** none

Usernames to assign to the issue created. Note that Gitlab CE only allows one assignee.

## closeOpen

**Default:** `true`

Close open issues that were created by Pmbot. This option prevents multiple issues open simultaneously when you don't have the time to look at them.

## squash

**Default:** `true`

<div class="blockquote" data-props='{ "mod": "warning" }'>

Only applies to **Gitlab**

</div>

Whether commits of the merge request source branch should be squashed.

## deleteSourceBranch

**Default:** `true`

<div class="blockquote" data-props='{ "mod": "warning" }'>

Only applies to **Gitlab**

</div>

Whether the merge request source branch should be deleted.

## maintainerCanModify

**Default:** `true`

<div class="blockquote" data-props='{ "mod": "warning" }'>

Only applies to **Gitlab**

</div>

Whether maintainers can modify the created pull request.
