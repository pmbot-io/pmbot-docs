---
title: 'Ruby'
excerpt: ''
---

# Ruby

Requires `pmbot/bot` **v1.10.0+**.

To use this plugin, you will have to make sure the `bundle` CLI is available in the environment. Our `pmbot/bot:ruby` Docker image embeds Ruby 2.7 and Bundler 2.1.4.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
version: '1'
packageManagers:
  - packageManager:
      name: ruby
````

</div>

The Ruby package manager does not have additional configuration.

<div class="blockquote" data-props='{ "mod": "info" }'>

This plugin updates your `Gemfile.lock` file only. We plan to add a feature in the future where you can enable the update of your `Gemfile`, but we're waiting for feedback from users before going forward. 

</div>
