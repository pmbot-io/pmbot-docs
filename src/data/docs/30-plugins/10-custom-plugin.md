---
slug: 'plugins/custom'
title: 'Custom plugin'
excerpt: ''
---

# Custom plugins

When you don't find what you need in the [native plugins](/plugins/plugin-list), we suggest one of the folloing things:

- create a custom plugin and reference it in your [`.pmbot.yml`](#pmbotyml)
- open an issue on our [Github issue tracker](https://discourse.pmbot.io) so we can keep track of your request

<div class="blockquote" data-props='{ "mod": "info" }'>

Community plugins are welcome ! If you open source your plugin, we will reference it here in our documentation.

</div>

<div class="table-of-content"></div>

## Creating a custom plugin

<div class="blockquote" data-props='{ "mod": "info" }'>

If your custom plugin uses a CLI that is not available in our `pmbot/bot` Docker image, you can create a custom Docker image with the Pmbot CLI embedded (see [here](/plugins/custom-docker-image)).

</div>

Pmbot currently has two types of plugins: [**package managers**](#package-managers) and [**actions**](#actions). Package manager plugins allow Pmbot to interact with specific package managers. Action plugins allow you to execute specific tasks after the dependencies of a package manager have been updated.

Plugins must be made with **Javascript**, but we greatly recommend you to write them with [Typescript](https://www.typescriptlang.org/) and compile them to Javascript before shipping.

<div class="blockquote" data-props='{ "mod": "info" }'>

We will release a plugin toolkit with Typescript typings and helper functions in the coming weeks.

</div>

A plugin consists in a Javascript file that exports the following properties:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```javascript
class MyPlugin {
  constructor(context, logger) {
    // ...
  }
  execute(actionConfig, actionContext) {
    // plugin logic
  } 
}

module.exports = {
  version: '1.0.0',
  type: 'action', // action | pm
  name: 'my-plugin', // plugin name
  core: MyPlugin,
  parser: config => config,
  validator: config => Promise.resolve([]),
};
```

</div>

### `version`

The plugin version. This property is used for logging purposes.

### `type`

The type of plugin. Can be `action` or `pm`.

### `name`

The name of your plugin. This is what will be used to reference your plugin in `.pmbot.yml`.

### `core`

The plugin core logic. This should implement an interface specific to the defined plugin type:

- [Package manager](#package-managers)
- [Actions](#actions)

### Plugin constructor

Independently from the plugin type, the `core` should be an **ES6 class**. The constructor will be passed two arguments in the following order:

#### context

Contains information about the environment, update configuration, etc. 

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface Context {
  urls: {
    backend: string; // Pmbot backend URL
    update: string; // URL of the current update in the Pmbot UI
  };
  workdir: string; // working directory
  projectUpdateConfig: any; // `.pmbot.yml` parsed as plain Javascript object
  projectUpdateState?: ProjectUpdateState;
  updateRunData: UpdateRunData;
}

interface UpdateRunData {
  project: {
    id: string;
    gitProviderProjectId: string;
    name: string;
  };
  gitProvider: {
    type: 'GITLAB' | 'GITHUB';
    url: string;
  };
  uiUpdatePath: string;
}
```

</div>

The `projectUpdateState` contains information about the current update, such as dependencies, source branch, updates branches, etc:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```json
{
  "version": 0,
  "ciProviderType": "GITLAB", // GITLAB | GITHUB
  "sourceBranch": "master", // branch from which the update started
  "packageManagerUpdates": [
    // one item per package manager declared in the `.pmbot.yml`
    {
      "packageManagerType": "npm",
      /*
       * Could also be npm-0, npm-1... when multiple package managers use the same type
       * in your .pmbot.yml
       */
      "slug": "npm",
      "status": "pending", // running, pending, interrupted, success, partial, failure, unknown
      "actions": [],
      "dependencyUpdates": [
        {
          "dependency": {
            "name": "@types/chalk",
            "current": "2.2.0",
            "wanted": "2.2.0",
            "latest": "2.2.0"
          },
          "status": "pending"
        }
      ]
    }
  ]
}
```

</div>

<div class="blockquote" data-props='{ "mod": "warning" }'>

`projectUpdateState` is always `undefined` for package manager plugins.

</div>

#### logger

Gives you access to the logger used by the `pmbot` CLI, which implements the following interface:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```ts
interface Logger {
  info(message: string, meta?: LoggerMeta): void;

  debug(message: string, meta?: LoggerMeta): void;

  warn(message: string, meta?: LoggerMeta): void;

  error(message: string, meta?: LoggerMeta): void;
}

export interface LoggerMeta {
  /**
   * An error object that should be printed by the logger by calling the `toString` 
   * method on the error.
   */
  error?: any;
  /**
   * The logger passed to your plugin has a context named after the type and name 
   * of your plugin. By default, `logger.info('hello')` will produce a log which 
   * contains `... [<plugin-type>-<plugin-name>] ... hello`. If you provide a context
   * via `logger.info('hello', {context: 'some-function'})`,
   * you will see something like `... [<plugin-type>-<plugin-name>/some-function] ... hello`.
   */
  context?: string;
}
```

</div>

### `parser`

This is a **synchronous** function that we call with the configuration loaded as a plain Javascript object from the [`.pmbot.yml`](/pmbot-yml/pmbot-yml).

You are free to do whatever you like in this function. We generally use it to convert plain objects into classes that we can later validate using [`class-validator`](https://www.npmjs.com/package/class-validator).

The minimum code required is the identity function:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```javascript
module.exports = {
  // ...
  parser: config => config,
};
```

</div>

### `validator`

This function is given the configuration parsed by your plugin `parser`. It allows you to validate the plugin configuration. It should return a `Promise` with an array of `ClassValidationError`:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface ClassValidationError {
  property: string;
  value?: any;
  constraints?: {
    [key: string]: string;
  };
  children?: ClassValidationError[];
}
```

</div>

For example:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```javascript
module.exports = {
  // ...
  validator: async config => {
    const errors = [];

    if (!!config.token) {
      errors.push({
        property: 'token',
        value: config.token,
        constraints: {
          required: 'The token property is required',
        },
      });
    }

    return errors;
  },
};
```

</div>

## Package manager adapters

Package manager adapters are the bridge between Pmbot and package managers like Npm, Go, Maven, etc. We are constantly adding new adapters but encourage the community to come forward with new adapters. We will be happy to add your package manager adapters to our documentation.

A package manager adapter is a plugin which has a type `pm` and provides a `core` which satisfies the following interface:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface PackageManagerAdapter<C = any> {
  getPackageManagerType(): string;

  listDependencies(config: C): Promise<Dependency[]>;

  update(dep: Dependency, config: C): Promise<void>;

  listTrackedFiles(config: C): string[];
}
```

</div>

Where a `Dependency` complies with the following interface:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface Dependency<Meta = any> {
  /**
   * Name of the package, which identifies it.
   */
  name: string;

  /**
   * Current version of this dependency.
   */
  current: string;

  /**
   * Version this dependency should be updated to.
   */
  wanted: string;

  /**
   * Latest version available for this dependency.
   */
  latest: string;

  /**
   * Error explaining why something went wrong, if its the case.
   */
  error?: string;

  /**
   * Can be used by the package manager adapter to store metadata. You can access this in the update function.
   */
  meta?: Meta;
}
```

</div>

## Actions

Actions are executed when all the dependencies of a package manager are updated. This means that if you configured an Npm and Go package manager in your project using the [`.pmbot.yml`](/pmbot-yml/pmbot-yml), actions will be executed twice.

Actions should comply with the following interface:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface Action<Config = any> {
  execute(config: Config, actionContext: ActionContext): Promise<any>;
}
```

</div>

Where the `ActionContext` is

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```typescript
interface ActionContext {
  packageManagerUpdateState: PackageManagerUpdateState;
  packageManagerUpdateConfig: PackageManagerUpdateConfig;
}
```

</div>

The `PackageManagerUpdateConfig` corresponds to the current [package manager](#updates) from your [`.pmbot.yml`](#pmbotyml), parsed as a plain Javascript object.

The `PackageManagerUpdateState` contains information of the current package manager update:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```json
{
  "packageManagerType": "npm",
  /*
   * Could also be npm-0, npm-1... when multiple package managers use the same type
   * in your .pmbot.yml
   */
  "slug": "npm",
  "status": "pending", // running, pending, interrupted, success, partial, failure, unknown
  "actions": [],
  "dependencyUpdates": [
    {
      "dependency": {
        "name": "@types/chalk",
        "current": "2.2.0",
        "wanted": "2.2.0",
        "latest": "2.2.0"
      },
      "status": "pending"
    }
  ]
}
```

</div>

## Using a custom plugin

Plugins are loaded by the `pmbot` CLI as standard Npm modules using Node's `require` function. Hence, they can be simple Javascript files placed at your project root, or Npm packages with an `index.js`.

First, you'll have to install the plugin in your CI so that our CLI can `require` it. There are several ways to do this:
- install the plugin using `npm install`
- place it at the root of your project or anywhere on the file system
- use `curl` to download the plugin
- ...

Once your plugin is made available to our CLI, you'll want to register it when running the `update` command:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
pmbot update --plugins ./plugin.js
# OR with an absolute path
pmbot update --plugins /plugin.js
# OR with a plugin distributed as an Npm package
pmbot update --plugins my-plugin
```

</div>

Finally, you'll need to reference it in your [`.pmbot.yml`](#pmbotyml) using its `name`. For example, if we have the following plugin:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
module.exports = {
  name: 'my-plugin',
  ...
};

```

</div>

we'll use it as follows:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: "1"
packageManagers:
  - packageManager:
      name: npm
    actions:
      - name: my-plugin # reference the name of your plugin
        on:
          - success
          - partial
          - failure
```

</div>

If you want to register more than one plugin, you can do the following:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
pmbot update \
  --plugins ./plugin.js \
  --plugins ./my-other-plugin.js
```

</div>

### Package manager adapters

If you defined your plugin as a **package manager adapter**, you can use it in the [`packageManager`](#pmbotyml/packagemanager) section of your [`.pmbot.yml`](#pmbotyml).

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
packageManagers:
  - packageManager:
      name: my-plugin
      config: ... # config of your package manager
```

</div>

### Actions

If you defined your plugin as an **action**, you can use it in the [`actions`](#pmbotyml/actions) section of your [`.pmbot.yml`](#pmbotyml).

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```yaml
version: '1'
packageManagers:
  - ...
    actions:
      name: my-action
      config: ... # your action config
      on: ...
```

</div>
