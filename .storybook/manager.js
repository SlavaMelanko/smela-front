import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Massive',
    brandUrl: 'https://joinmassive.com',
    brandImage: '/massive.svg',
    brandTarget: '_self'
  })
})
