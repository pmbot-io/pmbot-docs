---
title: 'Server environment reference'
sidebarTitle: 'Server'
excerpt: ''
---

# Server environment reference

## DEBUG

**Default**: none

**Type**: string

**Description**:

Enable debug using the popular [debug](https://www.npmjs.com/package/debug) Npm package. To limit logs to Pmbot, use `DEBUG=pmbot.server*`.

## PMBOT\_JWT\_SECRET

**Default**: none

**Type**: string

**Description**:

Secret used to sign and verify JWT tokens. Can be generated with `openssl rand 32 -hex`.

## PMBOT\_JWT\_TOKEN\_EXPIRATION

**Default**: 259200 (30 days)

**Type**: number

**Description**:

Expiration time (in seconds) of JWT tokens.

## PMBOT\_UI\_URL

**Default**: none

**Type**: string

**Description**:

URL of the Pmbot UI.

## PMBOT\_MONGO\_URI

**Default**: none

**Type**: string

**Description**:

URI of a MongoDB instance.

## PMBOT\_GITLAB\_URL

**Default**: https://gitlab.com

**Type**: string

**Description**:

URL of your Gitlab instance

## PMBOT\_GITLAB\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Gitlab application ID (see [here](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile)).

## PMBOT\_GITLAB\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Gitlab application secret (see [here](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile)).

## PMBOT\_GITLAB\_WEBHOOK\_SSL\_VERIFY

**Default**: true

**Type**: boolean

**Description**:

Whether to enable [Gitlab webhook SSL verification](https://docs.gitlab.com/ee/user/project/integrations/webhooks.html#ssl-verification) for hooks created by Pmbot.

## PMBOT\_GITLAB\_CI\_FILE

**Default**: .gitlab-ci.yml

**Type**: string

**Description**:

The name of the Gitlab CI configuration file. We use this variable to detect CI in your repositories.

## PMBOT\_GITEA\_URL

**Default**: none

**Type**: string

**Description**:

URL of your Gitea instance

## PMBOT\_GITEA\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Client ID of an OAuth app registered in your Gitea instance.

## PMBOT\_GITEA\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Client secret of an OAuth app registered in your Gitea instance.

## PMBOT\_GITHUB\_URL

**Default**: https://github.com

**Type**: string

**Description**:

URL of your Github instance.

## PMBOT\_GITHUB\_CLIENT\_ID

**Default**: none

**Type**: string

**Description**:

Client ID of a Github OAuth app.

## PMBOT\_GITHUB\_CLIENT\_SECRET

**Default**: none

**Type**: string

**Description**:

Client secret of a Github OAuth app.

## PMBOT\_PORT

**Default**: 3001 (local development) / 80 (Dockerfile)

**Type**: number

**Description**:

Port on which pmbot is listening.

## PMBOT\_HOST

**Default**: none

**Type**: string

**Description**:

Host of your pmbot server. For example `pmbot.company.com:3000`. You can include host and port, but it should not contain protocol as this is handled internally. This value is used for providing correct redirect URL when doing OAuth flows and should 

## PMBOT\_LOCAL\_HOST

**Default**: PMBOT_HOST

**Type**: string

**Description**:

Host that can be used by local docker containers to reach your Pmbot server. This is useful when you are working locally as you've probably set [`PMBOT_HOST`](#pmbot_host) to `localhost`. When our bot calls Pmbot server from your CI, `localhost` will point to itself. The solution is to set `PMBOT_PUBLIC_HOST` to `host.docker.internal` (OS X) or to your IP.

## PMBOT\_MIGRATE\_ROLLBACK

**Default**: false

**Type**: boolean

**Description**:

Forces the server to rollback the last migration, then exit. Use this when you're trying to [downgrade](#/docs/core/upgrade-and-downgrade).

## PMBOT\_SYNC\_INTERVAL

**Default**: 1800 (30 minutes)

**Type**: number

**Description**:

How often (in seconds) user repositories should be synchronized.

## PMBOT\_SYNC\_TASK\_INTERVAL

**Default**: 10

**Type**: number

**Description**:

How often (in seconds) we should check for users awaiting synchronization.

## PMBOT\_SYNC\_TASK\_ENABLED

**Default**: true

**Type**: boolean

**Description**:

Whether the server should automatically synchronize repositories (on a regular basis).

## PMBOT\_ORGS

**Default**: none

**Type**: string

**Description**:

A comma separated list of organization **names** (not ID !) to which login and repos should be limited. For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```dotenv
PMBOT_ORGS=octocat
```

</div>

## PMBOT\_SSL\_KEY

**Default**: none

**Type**: string

**Description**:

An SSL private key in PEM format. See [SSL](#/core/ssl).

## PMBOT\_SSL\_CERT

**Default**: none

**Type**: string

**Description**:

An SSL certificate in PEM format. See [SSL](#/core/ssl).

## PMBOT\_REQUIRE\_LOGIN\_FOR\_PUBLIC\_REPOS

**Default**: true

**Type**: boolean

**Description**:

When set to false, public repositories of your Git server will also be public in Pmbot. This grants guests read-only access to pipelines, jobs and logs.

## PMBOT\_REFRESH\_TOKEN\_TASK\_PERIOD

**Default**: 10

**Type**: number

**Description**:

How often (in seconds) to check for tokens that need to be refreshed.

## PMBOT\_COOKIE\_SAMESITE

**Default**: null

**Type**: string

**Description**:

Allows you to set the [SameSite](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite) property for cookies defined by the server. Useful when your Pmbot server has a different host or URL than your UI.

## PMBOT\_COOKIE\_SECURE

**Default**: false

**Type**: boolean

**Description**:

Allows you to set the [Secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) property for cookies defined by the server. Some browsers, like Chrome, require it to be `true` to use cookies for cross site requests (which implies you need a secure backend). 

## PMBOT\_LICENSE

**Default**: none

**Type**: string

**Description**:

The **content** of your Pmbot license file.

## PMBOT\_DRONE\_ENABLED

**Default**: false

**Type**: boolean

**Description**:

Whether Drone CI should be enabled.

## PMBOT\_DRONE\_URL

**Default**: none

**Type**: string

**Description**:

URL of your Drone CI server.

## PMBOT\_DRONE\_FILE

**Default**: .drone.yml

**Type**: string

**Description**:

The name of your Drone CI config file. This is used to detect Drone in your repositories.

## PMBOT\_CIRCLE\_ENABLED

**Default**: false

**Type**: boolean

**Description**:

Whether Drone CI should be enabled.

## PMBOT\_CIRCLE\_URL

**Default**: https://circleci.com

**Type**: string

**Description**:

Circle CI URL. Used as base URL for API calls.

## PMBOT\_CIRCLE\_APP\_URL

**Default**: https://app.circleci.com

**Type**: string

**Description**:

Circle CI app URL. Used as base URL for creating links to Circle CI UI (pipelines...).

## PMBOT\_CIRCLE\_FILE

**Default**: .circleci/config.yml

**Type**: string

**Description**:

The name of your Circle CI config file. This is used to detect Circle CI in your repositories.

## PMBOT\_SCHEDULE\_MIN\_INTERVAL

**Default**: 300 (5 minutes)

**Type**: number

**Description**:

The minimum amount of time (in seconds) between two updates of a given schedule. For example, if your schedule defines an update ever minute, in practice you will get an update every `PMBOT_SCHEDULE_MIN_INTERVAL` minutes. 

## PMBOT\_DEFAULT\_BRANCH\_FALLBACK

**Default**: master

**Type**: string

**Description**:

When the server cannot determine the default branch of a repository, it uses this fallback.

## PMBOT\_REMOVE\_SCHEDULES\_WHEN\_DISABLE\_REPO

**Default**: false

**Type**: boolean

**Description**:

Whether schedules of a repo should be removed when disabling it.

## PMBOT\_UPDATE\_SCHEDULER\_INTERVAL

**Default**: 10 (seconds)

**Type**: string

**Description**:

The interval (in seconds) between each time the server checks for expired schedules. 

## PMBOT\_UPDATE\_TIMEOUT

**Default**: 86400 (1 day)

**Type**: number

**Description**:

When an update has started, it will be locked after this amount of time (in seconds). The bot will not be able to change its status or write to it. 

## PMBOT\_UPDATE\_TIMEOUT\_AFTER\_END

**Default**: 300 (5 minutes)

**Type**: number

**Description**:

When an update has finished, the bot still has this amount of time (in seconds) to finish all its calls the server.
