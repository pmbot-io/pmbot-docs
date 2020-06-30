---
title: 'Generic bump configuration'
excerpt: ''
---

# Generic bump configuration

Unlike Npm, some package managers do not offer a way to control how dependency versions are bumped. This feature is useful when you want to limit which versions a given dependency is updated to, whether it be to the latest major, minor or patch version.

For this reason, we have introduced a generic bump configuration that follows the [semantic versioning](https://semver.org/) concepts. You can set a default bump rule and fine tune how each dependency is bumped using patterns.  

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
defaultBumpRule: minor
bumpRules:
  - pattern: @angular/*
    bump: minor
````

</div>

## defaultBumpRule

Defines the default bump rules applied to a dependency when no other rule applies.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
defaultBumpRule: minor # major | minor | patch
````

</div>

Defaults to `minor`.

## bumpRules

A list of bump rules against which Pmbot should match dependency names. We apply the **first matching rule**, and this rule overrides the [`defaultBumpRule`](#defaultbumprule).

Usage:
<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
bumpRules:
  - pattern: @angular/*
    bump: minor
````

</div>

### pattern

A [minimatch](https://www.npmjs.com/package/minimatch) pattern to use for matching against dependency names.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
bumpRules:
  - pattern: @angular/*
````

</div>

### bump

The type of bump to use for dependencies matching the pattern associated with this bump.

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

````yaml
bumpRules:
  - pattern: @angular/*
    bump: minor # major | minor | patch
````

</div>

