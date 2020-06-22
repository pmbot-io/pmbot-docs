---
slug: 'plugins/custom'
title: 'Custom plugin'
excerpt: ''
---

# Custom plugins

By default, Pmbot embeds the following plugins:

**Actions**
- [auto-merge](/plugins/auto-merge)
- [create-issue](/plugins/create-issue)
- [create-merge-request](/plugins/create-merge-request)
- [email](/plugins/email)
- [mattermost](/plugins/mattermost)
- [slack](/plugins/slack)
- [webhook](/plugins/webhook)

**Package managers**
- [Npm](/plugins/npm)
- [Go](/plugins/go)
- [Go](/plugins/maven)

When you don't find what you need in the native bundle, we suggest one of the folloing things:
- open an issue on our [Github issue tracker](https://github.com/pmbot-io/issues/issues) so we can keep track of your request
- create a custom plugin and reference it in your [`.pmbot.yml`](#).

<div class="blockquote" data-props='{ "mod": "info" }'>

Community plugins are welcome ! If you open source your plugin, we will reference it here in our documentation. 

</div>

## Creating a custom plugin

Pmbot currently has two types of plugins: [**package managers**](#package-managers) and [**actions**](#actions). Package manager plugins allow Pmbot to interact with specific package managers. Action plugins allow you to execute specific tasks after the dependencies of a package manager have been updated.

Plugins must be made with **Javascript**, but we greatly recommend you to write them with [Typescript](https://www.typescriptlang.org/) and compile them to Javascript before shipping.

<div class="blockquote" data-props='{ "mod": "info" }'>

We will release a plugin toolkit with Typescript typings and helper functions in the coming weeks.

</div>

A plugin basically consists of a Node module which contains a single Javascript file that exports the following properties:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````javascript
module.exports = {
  version: '1.0.0',
  type: 'ACTION', // ACTION | PACKAGE_MANAGER_ADAPTER
  name: 'my-plugin', // plugin name
  core: async () => {
    // plugin logic
  }, 
  parser: config => config,
  validator: config => Promise.resolve([]),
  configClass: Object,
};
````

</div>

`version`

The plugin version. This property is used for logging purposes.

`type`

The type of plugin. Can be `ACTION` or `PACKAGE_MANAGER_ADAPTER`.

`name`

Plugin name.

`core`

The plugin core logic. This should be a `class` or `object` (at your discretion) which implements an interface specific to the defined plugin type:
- [Package manager](#package-managers)
- [Actions](#actions)

`parser`

This is a **synchronous** function that we call with the configuration loaded as a plain Javascript object from the [`.pmbot.yml`](/pmbotyml).

You are free to do whatever you like in this function. We generally use it to convert plain objects into classes that we can later validate using `class-validator`.

The minimum code required is the identify function:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````javascript
module.exports = {
  // ...
  parser: config => config,
};
````

</div>

`validator`

This function is given the configuration parsed by your plugin `parser`. It allows you to validate the plugin configuration. It should return a `Promise` with an array of `ClassValidationError`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````typescript
interface ClassValidationError {
  property: string;
  value?: any;
  constraints?: {
    [key: string]: string
  };
  children?: ClassValidationError[];
}
````

</div>

For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````javascript
module.exports = {
  // ...
  validator: async config => {
    const errors = [];
    
    if (!!config.token) {
      errors.push({
        property: 'token',
        value: config.token,
        constraints: {
          required: 'The token property is required'
        }
      });
    }
    
    return errors;
  },
};
````

</div>

### Package manager adapters

Package manager adapters are the bridge between Pmbot and package managers like Npm, Go, Maven, etc. We are constantly adding new adapters but encourage the community to come forward with new adapters. We will be happy to add your package manager adapters to our documentation.

A package manager adapter is a plugin which has a type `PACKAGE_MANAGER_ADAPTER` and provides a `core` which satisfies the following interface:



### Actions

## Publishing a custom plugin

## Using a custom plugin
