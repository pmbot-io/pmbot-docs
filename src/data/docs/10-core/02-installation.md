---
title: 'Installation'
excerpt: ''
---

# Installation

We try to make the installation of Pmbot as clean as possible.
We currently have the UI and backend as separate [Docker](https://docs.docker.com/) images so that you can fine tune how you want them deployed with [Docker Compose](https://docs.docker.com/compose/).

<div class="blockquote" data-props='{ "mod": "info" }'>

If you think the installation workflow can be simplified or improved in any way, or if you want to showcase other ways to deploy Pmbot and/or want to share installation recipes, you are welcome to open and issue in our [Github docs repository](https://github.com/pmbot-io/docs/issues). We'll see how to integrate it in these docs.

</div>

<div class="table-of-content"></div>

## Docker compose

### One-liner

The following command will launch an instance of Pmbot for local testing:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
curl https://raw.githubusercontent.com/pmbot-io/install/master/basic/docker-compose.yml > docker-compose.yml | docker-compose up --detach
```

</div>

<div class="blockquote" data-props='{ "mod": "warning" }'>

When testing Pmbot on your local machine with remote git providers, keep in mind that you need to adapt the Pmbot URL you give them.
Use an IP address that they can use to reach your local machine.

</div> 

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
      - 9118:80

  backend:
    image: pmbot/backend-community
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

### Advanced

For more advanced and configurable deployments, we provide a [repository](https://github.com/pmbot-io/install)
with a more configurable `docker-compose.yaml`.

## Backend environment variables

### APP\_UI\_URL

**Default:** `http://localhost:9118`

URL that users can use to reach the frontend. It will be used in emails, notifications, etc.

### APP\_PROJECTUPDATES\_MAX\_TIMETOWRITE

**Default:** `86400000` (1 day)

Maximum duration of an update, in milliseconds from the start of the update.
After that period, the CI will not be able to change the status of an update anymore.

### AUTH\_KEY\_PATH\_PRIVATE

**Default:** `/secrets/private-key.pem`

Path to the private key used by Pmbot to sign JWT tokens.
If this file does not exist, Pmbot will generate a new key pair.

It can be generated using the following command:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
ssh-keygen -t rsa -b 4096 -m PEM -f private-key.pem -q -N "" 
```

</div>

### AUTH\_KEY\_PATH\_PUBLIC

**Default:** `/secrets/public-key.pem`

Path to the public key matching the [private key](#auth_key_path_private).
If this file does not exist, Pmbot will generate a new key pair.

It can be generated from the private key using the following command:
<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```shell script
openssl rsa -in private-key.pem -pubout -outform PEM -out public-key.pem 
```

</div>

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

**Default:** `[Pmbot] `

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

### PMBOT\_API\_URL

**Default:** `http://localhost:9118`

URL of Pmbot API (backend).
This URL needs to be accessible by the users (not by the frontend container/server).

With the default deployment, it should point towards Pmbot reverse proxy.

### PMBOT\_API\_PATH

**Default:** `/api`

Path that will be appended to the [PMBOT\_API\_URL](#api\_url).

## Recipes

### How to set a trusted CA certificate

If you are using other self-hosted services with Pmbot, you might have secured them with a self-signed certificate.
In order for Pmbot to recognize that certificate, you must provide it with the corresponding trusted CA certificate.

You can do so by modifying the backend service in the `docker-compose.yml` file:

<div class="code-group" data-props='{ "lineNumbers": [false] }'>

```yaml
# docker-compose.yml
services:
    ...
    backend:
      ...
      volumes:
        - ./trusted-ca.pem:/trusted-ca.pem:ro
      environment:
        NODE_EXTRA_CA_CERTS: /trusted-ca.pem
    ...
```

</div>

This adds a read-only volume pointing to `./trusted-ca.pem` (the trusted CA certificate)
and tells Nodejs (used by Pmbot) to trust it.

## Premium

If you are a premium user, you will need to:
- replace `pmbot/backend-community` with the [corresponding images](#premium-registry) for your edition
- provide the backend Docker container with your [license file](#license)

### Premium registry

Premium editions are available on our private Docker registry. You can get your credentials in your dashboard under the **Install** section.

The following image is available for customers using the **developer edition**:
- `docker.pmbot.io/backend-developer` (replaces `pmbot/backend-community`)

The following image is available for customers using the **enterprise edition**:
- `docker.pmbot.io/backend-enterprise` (replaces `pmbot/backend-community`)

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
      - /data/LICENSE.txt:/license.txt:ro
```

</div>
