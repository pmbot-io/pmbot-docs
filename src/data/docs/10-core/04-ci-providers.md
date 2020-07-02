---
title: 'CI providers'
excerpt: ''
---

# CI Providers

<div class="table-of-content"></div>

## Add a CI provider

1. At the top of the app, click **CI Providers**

    ![](../../../images/ci-providers/header-link.png)
    
1. In the Git provider list, click "Add"

    ![](../../../images/ci-providers/add-button.png)

1. Select the type of CI provider you want to add

    ![](../../../images/ci-providers/select-type.png)
    
1. Configure **General Configuration**. These fields may vary based on the type of CI provider selected. See the specific configuration for your provider:

    - [Gitlab CI](/ci-providers/gitlab-ci#provider-settings)    
    - [Drone CI](/ci-providers/drone-ci#provider-settings)
    - [Circle CI](/ci-providers/circle-ci#provider-settings)

    ![](../../../images/ci-providers/general-config.png)
    
1. Click **Add CI provider**

    ![](../../../images/ci-providers/add-ci-provider-button.png)
    
## Edit a CI provider

1. At the top of the app, click **CI Providers**

    ![](../../../images/ci-providers/header-link.png)
    
1. In the CI provider list, select the one you want to edit

    ![](../../../images/ci-providers/select-in-list.png)
    
1. Edit the settings

    ![](../../../images/ci-providers/form.png)
    
1. To save the changes, click **Update**

    ![](../../../images/ci-providers/update-button.png)
    
## Delete a CI provider

1. At the top of the app, click **CI Providers**

    ![](../../../images/ci-providers/header-link.png)
    
1. In the CI provider list, select the one you want to delete

    ![](../../../images/ci-providers/select-in-list.png)

1. Click **Delete**

    ![](../../../images/ci-providers/delete-button.png)

   When you click the button, a dialog opens up and you are asked to type in the name of your CI provider before being able to click the **Confirm** button.
       
   ![](../../../images/ci-providers/confirm-delete.png)
   
   Once the provider is deleted, you will be redirected to the CI provider list.

    <div class="blockquote" data-props='{ "mod": "info" }'>
        When you delete a CI provider, you will have to reconfigure a CI for each project it was used in.
    </div>
