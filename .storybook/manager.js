import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'SMELA',
    brandImage: '/logo-with-text-light.png',
    brandTarget: '_self'
  })
})
