---
title: 'Pmbot CLI'
excerpt: ''
---

# Pmbot CLI Reference

<div class="table-of-content"></div>

## Global

### Options

These options are available regardless of the command you are using.

#### debug

**CLI Option:** `--debug [true|false]`, `-d [true|false]`

**Environment variable:** `PMBOT_DEBUG`

**Default:** `false`

Enable the debug mode. This will print more information in the logs.

This is useful when things go wrong but can unnecessarily bloat your logs otherwise.

#### sentry

**CLI Option:** `--sentry [true|false]`, `-s [true|false]`

**Environment variable:** `PMBOT_SENTRY`

**Default:** `true`

Enable [Sentry](https://sentry.io/) error reporting.

This allows us to detect and fix errors easier and sooner in order to improve the quality of Pmbot.

## Update

The update command is the default command. It is used inside your CI jobs in order to execute the updates triggered by Pmbot. 
 
### Options

#### token

**CLI Option:** `--token <token>`, `-t <token>`

**Environment variable:** `PMBOT_TOKEN`

**Default:** none, **required**

Token used to authenticate with the [API](#url).

#### ssh-private-key

**CLI Option:** `--ssh-private-key <path>`, `-k <path>`

**Environment variable:** `PMBOT_SSH_PRIVATE_KEY`

**Default:** none, **required**

Path to the SSH private key for pushing to the git current repository.

You can generate a new SSH key pair with the following command:

<div class="code-group" data-props='{ "lineNumbers": [true] }'>

```shell script
ssh-keygen
```

</div>

<div class="blockquote" data-props='{ "mod": "warning" }'>

Make sure you add the corresponding public key to your git project.

</div>

#### url

**CLI Option:** `--url <url>`, `-u <url>`

**Environment variable:** `PMBOT_URL`

**Default:** `https://app.pmbot.io`

The URL to the instance of Pmbot used for the update (e.g. `https://pmbot.company.com` or `https://company.com/pmbot`)

#### disable-host-key-verification

**CLI Option:** `--disable-host-key-verification [true|false]`

**Environment variable:** `PMBOT_DISABLE_HOST_KEY_VERIFICATION`

**Default:** `false`

Disable host key verification when using git over SSH.

#### plugins

**CLI Option:** `--plugins <name> [--plugins <name>] ...`, `-p <name> [-p <name>] ...`

**Environment variable:** `PMBOT_PLUGINS`

**Default:** none

<div class="blockquote" data-props='{ "mod": "warning" }'>

Only one plugin can be added the environment variable due to a [limitation in yargs](https://github.com/yargs/yargs/issues/821).
If you need to use multiple plugins, please use CLI arguments.    

</div>

#### config

**CLI Option:** `--config <path>`, `-c <path>`

**Environment variable:** `PMBOT_CONFIG`

**Default:** `.pmbot.yml`

Path to the Pmbot config file.

#### workdir

**CLI Option:** `--workdir <workdir>`, `-w <workdir>`

**Environment variable:** `PMBOT_WORKDIR`

**Default:** `.`

The directory where Pmbot will find the cloned repository of the project to update.

### Self signed certificates

If you are using self-signed certificates to secure your servers (i.e. Pmbot, package repositories...), you'll want to set the `NODE_EXTRA_CA_CERTS` environment variable with the **path** to a trusted Certification Authority certificate.

This CA should have the **`pem`** format:

<div class="code-group" data-props='{ "lineNumbers": [true] }'>

```
-----BEGIN CERTIFICATE-----
MIIFtDCCA5ygAwIBAgIJAKh8+CrWL5MeMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNV
...
nDFc85qf23ctw8OnZULq6H9VT/m02vgIqCD21hrCt8krY5n8JgOoRWsn9PVIsIVu
fQ+WljzA1PldDsGyspFWPpwqw3qSo9Uj
-----END CERTIFICATE-----
```

</div> 
