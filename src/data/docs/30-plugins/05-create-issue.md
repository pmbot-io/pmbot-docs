---
slug: '/plugins/create-issue'
title: 'Create issue'
excerpt: ''
---

# Create issue

This plugin allows you to open an issue.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
updates:
- packageManager:
    name: create-issue
    config:
      title: 'Automated update of {{slug}} {{statusEmoji}}'
      additionalText: ''
      assignees:
        - ...
      closeOpen: true
````

</div>

To be able to authenticate with your Git provider, this plugin needs to have a token:
- with **Gitlab**, set an environment variable named `GITLAB_TOKEN` which should contain a [Gitlab personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)
- with **Github**, set an environment variable named `GITHUB_TOKEN` which should contain a [Github personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)

## title

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

## additionalText

Additional text to embed in the issue description.

## assignees

Usernames to assign to the issue created. Note that Gitlab CE only allows one assignee.

## closeOpen

Close open issues that were created by Pmbot. This option prevents multiple issues open simultaneously when you don't have the time to look at them.
