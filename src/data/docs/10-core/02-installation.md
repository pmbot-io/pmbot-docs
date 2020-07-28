---
title: 'Installation'
excerpt: ''
---

# Installation

We try to make the installation of Pmbot as clean as possible. We currently have the UI and backend as separate Docker images so that you can fine tune how you want them deployed with `docker-compose`.

<div class="blockquote" data-props='{ "mod": "info" }'>

If you think the installation workflow can be simplified or improved in any way, or if you want to showcase other ways to deploy Pmbot and/or want to share installation recipes, you are welcome to open and issue in our [Github docs repository](https://github.com/pmbot-io/docs/issues). We'll see how to integrate it in these docs.

</div>

<div class="table-of-content"></div>

## Docker compose

### Basic

Here is a basic `docker-compose.yml` that can be used to test pmbot locally:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
# docker-compose.yml
version: "3.6"

services:
  reverse-proxy:
    image: pmbot/reverse-proxy
    restart: unless-stopped
    ports:
      - 127.0.0.1:9118:80

  backend:
    image: pmbot/backend
    restart: unless-stopped
    volumes:
      - secrets:/secrets

  frontend:
    image: pmbot/ui
    restart: unless-stopped

  mongo:
    image: mongo:4.2-bionic
    restart: unless-stopped
    volumes:
      - mongo:/data/db

volumes:
  mongo:
  secrets:
#
```

</div>

It can be launched with the following command:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
docker-compose up --detach
```

</div>

### HTTPS with Let's Encrypt

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
# docker-compose.yml
version: "3.6"

services:
  reverse-proxy:
    image: pmbot/reverse-proxy
    restart: unless-stopped
    ports:
      - 80:80
      - 443:443
    volumes:
      - letsencrypt:/letsencrypt
    command:
      - "--entrypoints.websecure.address=:443"
      - "--certificatesresolvers.letsencrypt.acme.email=${LETSENCRYPT_EMAIL?LETSENCRYPT_EMAIL}"
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.letsencrypt.acme.tlschallenge=true"

  backend:
    image: pmbot/backend
    restart: unless-stopped
    volumes:
      - secrets:/secrets
    environment:
      APP_UI_URL: https://${PMBOT_DOMAIN}
    labels:
      - "traefik.http.routers.backend.entrypoints=websecure"
      - "traefik.http.routers.backend.rule=Host(`${PMBOT_DOMAIN?PMBOT_DOMAIN}`) && PathPrefix(`/api`)"
      - "traefik.http.routers.backend.tls=true"
      - "traefik.http.routers.backend.tls.certresolver=letsencrypt"

  frontend:
    image: pmbot/ui
    restart: unless-stopped
    environment:
      PMBOT_API_URL: https://${PMBOT_DOMAIN}
    labels:
      - "traefik.http.routers.frontend.entrypoints=websecure"
      - "traefik.http.routers.frontend.rule=Host(`${PMBOT_DOMAIN?PMBOT_DOMAIN}`) && PathPrefix(`/`)"
      - "traefik.http.routers.frontend.tls=true"
      - "traefik.http.routers.frontend.tls.certresolver=letsencrypt"

  mongo:
    image: mongo:4.2-bionic
    restart: unless-stopped
    volumes:
      - mongo:/data/db

volumes:
  letsencrypt:
  mongo:
  secrets:
#
```

</div>

It can be launched with the following command:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
docker-compose --env PMBOT_DOMAIN=pmbot.company.com LETSENCRYPT_EMAIL=infra@company.com up --detach
```

</div>


## Reverse proxy environment variables

The reverse proxy is a [traefik](https://hub.docker.com/_/traefik) image preconfigured
to serve the frontend (`/`) and backend (`/api`).

It can also be configured with commands like a regular traefik container.

### TRAEFIK\_DYNAMIC\_CONFIG

**Default:** none

May contain additional [dynamic configuration](https://docs.traefik.io/reference/dynamic-configuration/file/) to inject
in Traefik.
The content of this variable will be written into a temporary file and will be loaded
by Traefik [file provider](https://docs.traefik.io/providers/file/).

You may use yaml multiline syntax for this variable:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
...
services:
  reverse-proxy:
    image: pmbot/reverse-proxy
    restart: unless-stopped
    environment:
      TRAEFIK_DYNAMIC_CONFIG: >
        [tls.stores]
          [tls.stores.default]
            [tls.stores.default.defaultCertificate]
              certFile = "/certs/fullchain.pem"
              keyFile = "/certs/privkey.pem"
...
```

</div>

### TRAEFIK\_DYNAMIC\_CONFIG\_FORMAT

**Default:** `toml`

File format of the content given in [TRAEFIK\_DYNAMIC\_CONFIG](#traefik_dynamic_config).
Can be `toml` or `yaml`.

## Backend environment variables

### AUTH\_PRIVATE\_KEY\_PATH

**Default:** `/secrets/private-key.pem`

Path to the private key used by Pmbot to sign JWT tokens.
If this file does not exist, Pmbot will generate a new key pair.

It can be generated using the following command:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
ssh-keygen -t rsa -b 4096 -m PEM -f private-key.pem -q -N "" 
```

</div>

### AUTH\_PUBLIC\_KEY\_PATH

**Default:** `/secrets/public-key.pem`

Path to the public key matching the [private key](#auth_private_key_path).
If this file does not exist, Pmbot will generate a new key pair.

It can be generated from the private key using the following command:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
openssl rsa -in private-key.pem -pubout -outform PEM -out public-key.pem 
```

</div>

### APP\_PROJECTUPDATES\_MAX\_TIMETOWRITE

**Default:** `86400000` (1 day)

Maximum duration of an update, in milliseconds from the start of the update.
After that period, the CI will not be able to change the status of an update anymore.

### DB_URI

**Default:** `mongo://mongo:27017/pmbot`

MongoDB connection string.

See [MongoDB documentation](https://docs.mongodb.com/manual/reference/connection-string/) for more information.

### HTTP\_COOKIE\_DOMAINS

**Default:** hostname of the request

Comma separated list of domains on which the cookies use by Pmbot should be set.

### HTTP\_CORS\_ORIGIN

**Default:** hostname of the request (insecure)

[Origin](https://developer.mozilla.org/en-US/docs/Glossary/origin) from which CORS requests are allowed.
 `*` will not work.

### LOG_LEVEL

**Default:** `info`

Determine how much information should be logged.
Possible levels, from less verbose to more verbose, are: `error`, `warning`, `info`, `debug`.

### MAIL_FROM

**Default:** `noreply@pmbot.io`

Sets the sender email address for all emails sent by Pmbot.

### MAIL_HOST

**Default:** none (print emails in logs)

Address of the SMTP server used to send emails.

See [Nodemailer transport](https://nodemailer.com/smtp/) `host`.

<div class="blockquote" data-props='{ "mod": "warning" }'>

If no MAIL_HOST is specified, emails will be printed in the server logs instead of being sent.    

</div> 

### MAIL_PORT

**Default:** `465` or `587` (automatic, see [Nodemailer transport](https://nodemailer.com/smtp/) `port`)

TCP port of the SMTP server used to send emails.

### MAIL_SECURE

**Default:** `false`

If `true`, forces the use of SSL/TLS.
If `false`, the client and server will start without SSL/TLS and enable it if possible.

See [Nodemailer transport](https://nodemailer.com/smtp/) `secure`.

### MAIL\_SUBJECT\_PREFIX

**Default:** `Pmbot | `

Prefix to be added in front of the subject in mails sent by Pmbot.
This can be used for filtering and rules in your mail client.

### MAIL_USERNAME

**Default:** none

Username for the SMTP server

### MAIL_PASSWORD

**Default:** none

Password for the SMTP server.

### SECURITY\_ENCRYPTION\_KEY

**Default:** generated by Pmbot (see [SECURITY\_ENCRYPTION\_KEY\_PATH](#security_encryption_key_path))

This encryption key is used by Pmbot to protect sensitive information. It must be a 32 byte key encoded in the `hex` format.

It can be generated using the following command:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
openssl rand -hex 32
```

</div>

### SECURITY\_ENCRYPTION\_KEY\_PATH

**Default:** `/secrets/encryption-key`

If [SECURITY\_ENCRYPTION\_KEY](#security_encryption_key) is not specified, Pmbot will attempt to read the key from this file.
If this file does not exist, Pmbot will generate a key and store it into this file.

If [SECURITY\_ENCRYPTION\_KEY](#security_encryption_key) is given after a key file has been generated,
the key file will be ignored and the value given in the environment variable will be used instead.

## Frontend environment variables

### API_URL

**Default:** `/api` (from the frontend)

URL of Pmbot API (backend).
This URL needs to be accessible by the users (not by the frontend container/server).

With the default deployment, it should point towards Pmbot reverse proxy with the `/api` path.

## Premium

If you are a premium user, you will need to:
- replace `pmbot/backend` and `pmbot/backend` with the [corresponding images](#premium-registry) for your edition
- provide the backend Docker container with your [license file](#license)

### Premium registry

Premium editions are available on our private Docker registry. You can get your credentials in your dashboard under the **Install** section.

The following images are available for customer using the **developer edition**:
- `docker.pmbot.io/backend-developer` (replaces `pmbot/backend`)
- `docker.pmbot.io/ui-developer` (replaces `pmbot/ui`)

The following images are available for customer using the **enterprise edition**:
- `docker.pmbot.io/backend-enterprise` (replaces `pmbot/backend`)
- `docker.pmbot.io/ui-enterprise` (replaces `pmbot/ui`)

### License

Premium users will need to provide their license file (downloaded from their dashboard) to the backend Docker container in **one of** the following ways:

### Environment variable

Define a `LICENSE` environment variable with the content of your license file:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
services:
  backend:
    # ...
    environment:
      LICENSE: "<license-content-goes-here>"
```

</div>

### File

Our backend looks for a file named `/license.txt`, so you'll need to provide it via a Docker volume:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
services:
  backend:
    # ...
    volumes:
      - /data/PMBOT_LICENSE.txt:/license.txt
```

</div>
