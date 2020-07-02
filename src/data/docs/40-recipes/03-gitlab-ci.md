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

## Group level and global variables

Did you know that you can set CI variables at [the group level](https://docs.gitlab.com/ee/ci/variables/) and [the instance level](https://docs.gitlab.com/ee/ci/variables/#instance-level-cicd-environment-variables) (new in Gitlab 13) ? This will help you speed up setup for projects by providing globally things like trusted CA and, for example, global CLI options. 

This is really useful as you can define globally a variable named `PMBOT_URL` and you can omit the `--url` when calling the `pmbot` CLI in your CI configuration files.
