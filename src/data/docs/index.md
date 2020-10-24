---
title: 'Introduction'
excerpt: ''
isHomePage: true
---

# Introduction

Pmbot performs automated dependency updates of your Git repositories while making sure your break doesn't break by watching your CI pipelines.

## Difference from Dependabot, Snyk and Renovate bot

- We don't scan for vulnerabilities, we make sure you always have the latest version (patch, minor or major according to what you want)
- We don't open PRs: you decide what to do after an update using [action plugin](https://docs.pmbot.io/plugins/plugin-list#actions). We recommend using the [`auto-merge`](https://docs.pmbot.io/actions/auto-merge) plugin.
- We never checkout your code: you execute our CLI in your CI
- You can self host our entire platform

<div class="links-block">

[Installation](/core/installation)
[.pmbot.yml reference](/pmbot-yml/pmbot-yml)
[Create custom plugins](/plugins/custom-plugin)

</div>
