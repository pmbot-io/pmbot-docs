---
title: 'Gitlab CI'
excerpt: ''
---

# Gitlab CI

## Untracked files errors in Gitlab CI

If you forced push to the update source branch, for example `master`, you may experience issues where Git throws an error as the bot tries to `checkout` the update branch. You can work around this problem as follows:

1. Go to your Gitlab project **CI/CD settings**
2. In the **General** section, under **Git strategy for pipelines**, select **Git clone** and then **save** the form.

This will ensure that the workspace is clean for each run.

![](../../../images/gitlab-clone.png)
