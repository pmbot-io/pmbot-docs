---
title: 'Custom Docker image'
excerpt: ''
---

# Custom Docker image

You can execute updates with a custom Docker image. Just make sure the [@pmbot/cli](https://www.npmjs.com/package/@pmbotio/cli) and Node 12 are available.

Here is an example file:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```Dockerfile
FROM node:12
RUN npm install -g @pmbot/cli
# ... add whatever you need here
```

</div>

To publish this Docker image to Docker hub:

<div class="code-group" data-props='{ "lineNumbers": ["true"] }'>

```bash
docker build -t my-pmbot-image .
docker login
docker push my-pmbot-image
```

</div>
