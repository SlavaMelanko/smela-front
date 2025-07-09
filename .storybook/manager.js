import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'The Proxies',
    brandUrl: 'https://google.com',
    brandImage: '/logo.svg',
    brandTarget: '_self'
  })
})
