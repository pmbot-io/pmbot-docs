---
title: 'Core concepts'
excerpt: ''
---

# Core concepts 

## How it works

When we developed Pmbot, we tried to replicate how we updated our own repositories manually. In practice, a developer would:
- clone the repository
- updated the dependencies on a new branch, say `update/npm`
- check that everything builds and that all tests pass
- commit and push
- wait for CI pipelines to complete and pass
- merge the update branch into the main branch
- notify others that the update was successful

Pmbot basically automates this behavior by interacting with your Git server and CI platforms.

## .pmbot.yml

To configure how a given repository is updated, you place at it's root a `.pmbot.yml` file. It allows you to define which package managers to use and fine tune how dependencies of a given package manager are updated. We have made sure that you can set things like commit messages, version policies, etc.  

## CI

When Pmbot updates a dependency, it watches the status of your CI to make sure nothing breaks.
