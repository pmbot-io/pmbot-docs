---
title: 'Installation'
excerpt: ''
---

# Installation

To deploy, you'll need to:
- Create a `docker-compose.yml` file
- Register Pmbot as an OAuth app in your Git server and update your `docker-compose.yml`
- Configure your CI provider in your `docker-compose.yml`
- Run `docker-compose up -d`
- Browse `http://localhost:3000`

If you are using the enterprise edition, we provided you with:
- a license file, which you can pass to `pmbot-server` using the [`PMBOT_LICENSE`](/environment-reference/server-environment-reference#pmbot_license) environment variable, or by providing your license as a Docker volume pointing to `/license.txt`
- credentials to pull Docker images `pmbot/server-ee` and `pmbot/ui-ee` from our premium Docker registry. You will use these images in place of `pmbot/server` and `pmbot/ui` 

## 1. Basic docker-compose

Create a `docker-compose.yml` (we'll complete it further below):

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: "3"

services:
  ui:
    image: pmbot/ui-ce:latest
    restart: unless-stopped
    ports:
      - "3000:80"
    environment:
      PMBOT_SERVER_URL: http://10.0.1.23:3001

  server:
    image: pmbot/server-ce:latest
    restart: unless-stopped
    ports:
      - "3001:80"
    environment:
      PMBOT_HOST: http://10.0.1.23:3001
      PMBOT_UI_URL: http://10.0.1.23:3000
      # Generated with "openssl rand 32 -hex"
      PMBOT_JWT_SECRET: 896933b3545913aac9175890882c2ca3d861f6109dfe2c48f1b4c15686c59542
      # Generated with "openssl rand 32 -hex"
      PMBOT_RUNNER_SECRET: 1f1b3c989bd7514797f5bc8da6a6dd8ac6acd08c3719acf47aa2a7f4aa1a7e57
      PMBOT_MONGO_URI: mongodb://mongo:27017/pmbot
      # if you wish not to enabled automatic crash reporting with Sentry (https://sentry.io)
      #PMBOT_SENTRY_ENABLED: "false"

  mongo:
    image: mongo:4.2-bionic
    restart: unless-stopped
    volumes:
      - pmbot-mongo:/data/db

volumes:
  pmbot-mongo:
```

</div>

## 2. Register Pmbot in your Git server(s)

<div class="blockquote" data-props='{ "mod": "info" }'>

As of Pmbot Server v2, you can enable multiple Git servers.

</div>

### Gitea

In **Settings / Applications**, add an OAuth application with the following settings:

| Field | Value |
| ---- | ---- |
| Application name   | Pmbot | 
| Authorization callback URL | `<pmbot-server-url>/auth/gitea/oauth/callback` |

Copy your **Client ID** and **Client secret**.

<div class="blockquote" data-props='{ "mod": "info" }'>

If you've changed [`REFRESH_TOKEN_EXPIRATION_TIME`](https://docs.gitea.io/en-us/config-cheat-sheet/#oauth2-oauth2) in your Gitea config, make sure to set `PMBOT_REFRESH_TOKEN_EXPIRATION_TIME` with that same value. We've opened [an issue](https://github.com/go-gitea/gitea/issues/12641) on their repo to improve this.

</div>

Now, you can update your `docker-compose.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...
services:
  # ...
  pmbot-server:
    # ...
    environment:
      # ...
      PMBOT_GITEA_CLIENT_ID: <your-gitea-client-id>
      PMBOT_GITEA_CLIENT_SECRET: <your-gitea-client-secret>
      PMBOT_GITEA_URL: http://10.0.1.23:3003
```

</div>

### Gitlab

From your Gitlab **admin area**, [add a new application](https://docs.gitlab.com/ee/integration/oauth_provider.html#adding-an-application-through-the-profile) with the following settings:

| Field | Value |
| ---- | ---- |
| Name   | Pmbot | 
| Redirect URL | `<pmbot-server-url>/auth/gitlab/oauth/callback` |
| Trusted | true |
| Scopes | api |

After creating the application, Gitlab will give you both the **Client ID** and **Client Secret**, which they respectively name **Application ID** and **Application Secret**.

<div class="blockquote" data-props='{ "mod": "warning" }'>

You may need to check "Allow requests to the local network from web hooks and services" in **Admin / Settings / Network / Outbound requests** for webhooks to be sent to Pmbot.

</div>

Now, you can update your `docker-compose.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...
services:
  # ...
  pmbot-server:
    # ...
    environment:
      # ...
      PMBOT_GITLAB_CLIENT_ID: <your-gitlab-application-id>
      PMBOT_GITLAB_CLIENT_SECRET: <your-gitlab-application-secret>
      PMBOT_GITLAB_URL: http://10.0.1.23:3003
      # optionally if your Pmbot server uses a self-signed certificate
      PMBOT_GITLAB_WEBHOOK_SSL_VERIFY: "false"
```

</div>

### Github

In Github, go to **Settings / Developer Settings / OAuth Apps** and add a new OAuth app with the following settings:

| Field | Value |
| ---- | ---- |
| Application name   | Pmbot | 
| Homepage URL   | https://pmbot.io | 
| Authorization callback URL | `<pmbot-server-url>/auth/github/oauth/callback` |

Now, you can update your `docker-compose.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...
services:
  # ...
  pmbot-server:
    # ...
    environment:
      # ...
      PMBOT_GITHUB_CLIENT_ID: <your-github-oauth-app-client-id>
      PMBOT_GITHUB_CLIENT_SECRET: <your-github-oauth-app-client-secret>
      PMBOT_GITHUB_URL: http://10.0.1.23:3003
      # optionally if your Pmbot server uses a self-signed certificate
      PMBOT_GITHUB_WEBHOOK_SSL_VERIFY: "false"
```

</div>

## 3. Configure your CI provider(s)

<div class="blockquote" data-props='{ "mod": "info" }'>

As of Pmbot Server v2, you can enable multiple CI providers.

</div>

### Gitlab CI

Gitlab CI is enabled when you use Gitlab as a Git server. You don't need to configure anything else, but you can change things like CI file name using [server environment variables](https://docs.pmbot.io/environment-reference/server-environment-reference).

### Drone CI

Update your `docker-compose.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...
services:
  # ...
  pmbot-server:
    # ...
    environment:
      # ...
      PMBOT_DRONE_ENABLED: "true"
      # optional (default https://cloud.drone.io)
      PMBOT_DRONE_URL: http://drone.company.com
```

</div>

In the UI, you'll be asked to set your Drone personal user token so Pmbot can authenticate when using Drone's API. You can get this token in your Drone instance:

![](/images/get-drone-token.gif)

You can tune things using [server environment variables](https://docs.pmbot.io/environment-reference/server-environment-reference).

### Circle CI

Update the `docker-compose.yml`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
# ...
services:
  # ...
  pmbot-server:
    # ...
    environment:
      # ...
      PMBOT_CIRCLE_ENABLED: "true"
```

</div>

In the UI, you'll be asked to set your personal user token so Pmbot can authenticate when using the Circle CI API. You can get this token in your Circle CI user settings:

![](/images/get-circle-token.gif)

You can tune things using [server environment variables](https://docs.pmbot.io/environment-reference/server-environment-reference).

## 4. Run Pmbot

Run `docker-compose up -d`, and browse [http://localhost:3000](http://localhost:3000).
