import { test as base } from '@playwright/test'
import fs from 'fs'
import path from 'path'

import { EmailService } from '../utils'

const LOCALES_PATH = './public/locales'

const loadTranslations = (locale = 'en') => {
  const filePath = path.join(LOCALES_PATH, `${locale}.json`)

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export const test = base.extend({
  t: [loadTranslations(), { scope: 'worker' }],
  emailService: [new EmailService(), { scope: 'worker' }]
})

export { expect } from '@playwright/test'
