---
title: 'Projects'
excerpt: ''
---

# Projects

Projects allow run update for a given Git repository on a specific CI platform and with specific schedules.

## Add a project

1. In the top nav bar, click **Projects**

    ![](../../../images/projects/header-link.png)
    
1. If you have no projects, you'll see an empty page. Click **Add first project**

    ![](../../../images/projects/empty.png)
    
    Otherwise, click **Add project**
    
    ![](../../../images/projects/add-button.png)

1. Select a Git repository. If you don't see any repositories in the list, make sure to [synchronize your Git providers](/git-providers#synchronize-git-providers).

    ![](../../../images/projects/select-repo.png)
    
1. Select the CI provider on which you want to run updates

    ![](../../../images/projects/select-ci.png)
    
1. Configure the selected CI provider for this repository. See [here](#ci-provider-project-configuration) for the configuration for the type of CI provider your have selected.

    ![](../../../images/projects/ci-config.png)
    
1. Click **Next step**

    ![](../../../images/projects/next-step.png)
    
1. Add a schedule by clicking **Add schedule**

    ![](../../../images/projects/add-schedule-step.png)
    
    <div class="blockquote" data-props='{ "mod": "info" }'>
        As a cloud user, depending on your plan, you may be limited to how many schedules you can add. In that case, the **Add branch** button will be disabled.
    </div>
        
1. Select the Git branch you wish to update, set the **timezone**, and **period**

    ![](../../../images/projects/schedule-form.png)
    
1. Click the **Save** button in the schedule form
    
    ![](../../../images/projects/save-schedule.png)
    
1. Once you have saved the schedule, you can click **Add project**

    ![](../../../images/projects/add-project-step.png)
    
    You will be redirected to your project's page where you can then setup Git credentials and prepare your [`.pmbot.yml`](/pmbotyml) file.

## CI provider project configuration

### Gitlab

| Field | Description |
| --- | --- |
| Gitlab project ID | The ID of your Gitlab project, available under **Settings / General** in your Gitlab project. |
| Pipeline trigger token | This token allows Pmbot to trigger a pipeline in Gitlab CI. You can created them in **Settings / CI/CD / Pipeline Triggers** in your Gitlab project. Checkout [the official Gitlab docs](https://docs.gitlab.com/ee/ci/triggers/#adding-a-new-trigger) for more info. |

### Circle CI

| Field | Config version | Description |
| --- | --- | --- |
| Circle Project Path | all | The path of your Circle CI project. It should have the form `<vcs-type>/<org>/<repo>`, for example `github/jsmith/foo`. |
| Config version | all | The version of your `.circle/config.yml`. |
| Api token | all | The API token will **have** to be a [**Personal API Token**](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token). We are aware that [project access tokens](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-project-api-token) are safer since they grant read-only access to your Circle CI account, but unfortunately, their new API has dropped usage of those tokens. More info [here](https://discuss.circleci.com/t/feedback-wanted-moving-from-v1-1-job-triggering-to-v2-pipeline-triggering/33494). |
| Update job name | 2.0 | The name of the update job in your `.circle/config.yml`. |

<div class="blockquote" data-props='{ "mod": "warning" }'>

Support for `2.0` configuration should end some time in 2020 as Circle CI will drop some API endpoints that we use for v2 configurations. More info [here](https://discuss.circleci.com/t/feedback-wanted-moving-from-v1-1-job-triggering-to-v2-pipeline-triggering/33494).
    
</div> 

## Project details page

To open the project details page:

1. In the top nav bar, click **Projects**

    ![](../../../images/projects/header-link.png)
    
2. Click the project in the list to open its details page
    
    ![](../../../images/projects/project-list.png)

## Delete a project

To delete a project:

1. Open the [project details page](#project-details-page)

3. Click the **Delete** button

    ![](../../../images/projects/delete.png)

## Schedules

Schedules allow you to configure which branches of your Git repository are updated and when.

### Add schedule

1. Open the [project details page](#project-details-page)
1. In the project details page, click the **Schedules** tab

    ![](../../../images/projects/schedules-tab.png)
    
1. Click **Add schedule**

    ![](../../../images/projects/add-schedule-button.png)
    
1. Select the Git branch you wish to update, set the **timezone**, and **period**

    ![](../../../images/projects/schedule-form.png)
    
    By default we suggest you use predefined **periods** such as **daily** or **weekly**. Prenium users may use cron expressions by toggling **Use cron expression**
    
    ![](../../../images/projects/cron-expression.png)

### Update schedule

1. Open the [project details page](#project-details-page)
1. In the project details page, click the **Schedules** tab

    ![](../../../images/projects/schedules-tab.png)
    
1. Edit any field in the schedule that you wish to update
1. Click **Save**

    ![](../../../images/projects/save-schedule.png)

### Delete schedule

1. Open the [project details page](#project-details-page)
1. In the project details page, click the **Schedules** tab

    ![](../../../images/projects/schedules-tab.png)
    
1. At the top right of the schedule you want to delete, click the cross mark

    ![](../../../images/projects/delete-schedule.png)

## Updates

### Run an update

### View an update

## CI

### Change CI provider

### Change CI provider settings

## Dependencies

## Setup
