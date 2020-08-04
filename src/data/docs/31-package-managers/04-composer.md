---
title: 'Composer'
excerpt: ''
---

# Composer

To use this plugin, you will have to make sure the `composer` CLI v1.10.0+ is available in the environment. Our `pmbot/bot:composer` Docker image embeds Composer 1.10.10 and the PHP Runtime 7.3.20.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: composer
````

</div>

The Composer package manager does not have additional configuration.

<div class="blockquote" data-props='{ "mod": "info" }'>

This plugin updates your `composer.lock` file only. We plan to add a feature in the future where you can enable the update of your `composer.json`, but we're waiting for feedback from users before going forward. 

</div>
