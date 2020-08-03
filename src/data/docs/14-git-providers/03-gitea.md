---
title: 'Gitea'
excerpt: ''
---

# Gitea

Gitea support requires:
- pmbot/ui v1.18.0+
- pmbot/backend-community (or any premium edition) v1.9.0+
- pmbot/bot (@pmbot/bot) v1.8.0

## General settings

| Field | Description |
| --- | --- |
| Name | The name of your Git provider |
| URL | Your Gitea URL |

## OAuth Configuration

Got to your **Settings**

![](../../../images/git-providers/gitea/user-settings.png)

Go the the **Application** tab

![](../../../images/git-providers/gitea/applications-tab.png)

Add an OAuth application with the folloing settings:

| Field | Value |
| ---- | ---- |
| Application name   | Pmbot | 
| Authorization callback URL | `https://app.pmbot.io/oauth/redirect` |

![](../../../images/git-providers/gitea/add-application.png)

Copy your **Client ID** and **Client secret**:

![](../../../images/git-providers/gitea/oauth-app-info.png)

## Organization settings

### Lock projects to a Gitea Organization

This setting allows you to limit projects to a given Gitea organization. Pmbot will list the organizations to which you belong and you may select one of them using the given dropdown.

#### Enable organization lock

1. Go to your project page
1. Select an organization
1. To save the changes, click **Update** at the bottom of the page
1. Use the **Cleanup Projects** button to cleanup projects that were configured in Pmbot and do not belong to the new group you have selected.

    ![](../../../images/git-providers/cleanup-projects.png)

    <div class="blockquote" data-props='{ "mod": "danger" }'>
    
    This action will **delete** all projects that belong to that group. You will loose all updates, schedules and configurations of these projects.
    
    </div> 

#### Disable organization lock

1. Go to your project page
1. In the **Organization settings**, clear the selection in the **Gitea Organization** dropdown
    
    ![](../../../images/git-providers/clear-gitlab-group-lock.png)

1. Click **update**
