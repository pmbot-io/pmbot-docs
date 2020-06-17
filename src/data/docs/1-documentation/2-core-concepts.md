---
title: 'Core concepts'
excerpt: ''
---

# Core concepts

<div class="table-of-content"></div>

When we developed Pmbot, we tried to replicate how we updated our own projects manually. In practice, a developer would:
- clone the project
- updated the dependencies on a new branch, say `update/npm`
- check that everything builds and that all tests pass
- commit and push
- wait for CI pipelines to complete and pass
- merge the update branch into the main branch
- notify others that the update was successful

Pmbot basically automates this behavior by interacting with your Git server and CI platforms.

## Git Providers

Git providers allow make Pmbot aware of your Git repositories. When you add a Git provider, we synchronize your projects which then allows you to configure how you want them to be updated.

Git providers are also used for access control. We use them to check whether a user can view, edit, add, delete or run manual updates for a given project. 

## CI Providers

CI providers are used by Pmbot to trigger updates of specific Git repositories on your CI platform. When you configure them, you generally provides settings such as the platform URL and set credentials so that Pmbot can make the proper API calls. 

## Projects

Projects allow you to configure how to update a given project on a given CI platform. They allow you to track updates and set schedules.

### Schedules

Project schedules allow you to define which branches to update, and when. You can configure the timezone and select predefined schedules or use custom cron sequences. 

### Updates

Project updates are the core of Pmbot. They represent a group of dependency updates for various package managers, on a given project.

## .pmbot.yml

To configure a given project is updated, you place at it's root a `.pmbot.yml` file. It allows you to define which package managers to use and fine tune how dependencies of a given package manager are updated. We have made sure that you can set things like commit messages, version policies, etc.  
