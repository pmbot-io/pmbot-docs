---
title: 'Github'
excerpt: ''
---

# Github

## General settings

| Field | Description |
| --- | --- |
| Name | The name of your Git provider |
| URL | Your Github URL. You must turn on the **Github enterprise** toggle for this parameter to be visible. |

## OAuth Configuration

From your admin area, [add an OAuth application](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) with the following settings:

| Field | Value |
| ---- | ---- |
| Application name   | Pmbot | 
| Homepage URL   | https://pmbot.io | 
| Authorization callback URL | `https://app.pmbot.io/oauth/redirect`|

## Organization settings

### Lock projects to a Github Organization

This setting allows you to limit projects to a given Github organization. Pmbot will list the organizations to which you belong and you may select one of them using the given dropdown.

<div class="blockquote" data-props='{ "mod": "warning" }'>

You have to grant access to each organization separately for it to appear in the dropdown.

</div>

If you want to revoke access from the Pmbot app to a Github organization:
1. Settings -> Applications -> Authorized OAuth Apps -> Pmbot -> Revoke access
2. Disconnect provider and try connect again, this time click "grant" on the organization you want to see in the list
3. Or, if your want to revoke access to a specific org, go to your organization Setting -> Third Party Access -> revoke access

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
1. In the **Organization settings**, clear the selection in the **Github Organization** dropdown
    
    ![](../../../images/git-providers/clear-gitlab-group-lock.png)

1. Click **update**
