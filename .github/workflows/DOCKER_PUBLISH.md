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

## Check Published Images

To check what images are published to GitHub Container Registry:

```bash
# List all container packages for the user
gh api "/users/slavamelanko/packages?package_type=container" | jq '.[] | {name, created_at, updated_at}'

# Example output:
# {
#   "name": "smela-front-ci",
#   "created_at": "2025-10-20T14:07:59Z",
#   "updated_at": "2025-10-20T14:08:01Z"
# }

# List all tags/versions for a specific package
gh api /users/slavamelanko/packages/container/smela-front-ci/versions | jq '.[] | {name: .metadata.container.tags[], created_at}'
```

Or browse in your web browser:

- All packages: <https://github.com/slavamelanko?tab=packages>
- Specific package:
  <https://github.com/users/slavamelanko/packages/container/smela-front-ci>

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
