# Manual Docker Image Publishing

Quick guide for manually building and publishing CI Docker images.

## Prerequisites

**Create GitHub Classic Token** (one-time setup):

1. Go to https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Check `write:packages`
4. Generate and copy token

## Publish Docker Image

```bash
# 1. Login to GitHub Container Registry
echo YOUR_TOKEN | docker login ghcr.io -u SlavaMelanko --password-stdin

# 2. Build the image
npm run docker:ci

# 3. Tag for target branch(es)
docker tag smela-front-ci ghcr.io/slavamelanko/smela-front-ci:dev
docker tag smela-front-ci ghcr.io/slavamelanko/smela-front-ci:main

# 4. Push to registry
docker push ghcr.io/slavamelanko/smela-front-ci:dev
docker push ghcr.io/slavamelanko/smela-front-ci:main
```

## Verify

```bash
docker pull ghcr.io/slavamelanko/smela-front-ci:dev
docker pull ghcr.io/slavamelanko/smela-front-ci:main
```

## Test Image Locally

After building the image, you can test it interactively:

```bash
# Run container interactively
docker run -it --rm smela-front-ci bash

# Inside the container, verify installations:

# 1. Check npm and Node versions
npm --v && node --v

# 2. Check Playwright
npx playwright --version
```
