---
title: 'Limitations'
excerpt: ''
---

# Limitations

## localhost

Since we clone projects inside a Docker container, your repo URL must not use `localhost`.

## OAuth token expiration

When you sign in, we store your OAuth token in our database so we can use it to:
- synchronize your repos regularly
- if you have enabled a repo:
    - send pipeline status to your git server
    - check whether the branch of a pipeline is protected when setting its jobs' environment

**What happens if an OAuth token expires ?**
- we're not able to synchronize your repos => it's non blocking
- we're not able to send pipeline status to your git server for repos you've setup
- we're not able to check whether a branch is protected when we create set jobs' environment. This can be blocking, so at the moment we fallback to considering a branch to be non protected, this way in most cases Pmbot can keep working, and we log errors to make sure you see them.

**What can you do to fix this ?**
- If **your** token expired, you just need to logout and login again.
- If the token of **another user** expired, pipelines for repos setup by that user will not be created anymore. In that case, all you need is to disable the repo and enable it right after. This will associate **you** as the user that setup the repo, and hence **your** token will be used when something needs to be done autonomously for that repo. Note that to setup a repo, you need to have sufficient [permissions](#permissions).

<div class="blockquote" data-props='{ "mod": "warning" }'>

Always make sure that the **refresh token** expiration time is greater than the **access token** expiration time. Some Git servers allow you to set the access/refresh token expiration. For example, with Gitea, you can set [`REFRESH_TOKEN_EXPIRATION_TIME`/`ACCESS_TOKEN_EXPIRATION_TIME`](https://docs.gitea.io/en-us/config-cheat-sheet/#oauth2-oauth2). For Github, OAuth tokens never expire (for Gthub OAuth apps), and for Gitlab we're not sure if this setting exists but we believe that at this time, OAuth tokens never expire.

</div>
