import fs from 'fs'
import path from 'path'

const LOCALES_PATH = './public/locales'

export const loadTranslations = (locale = 'en') => {
  const filePath = path.join(LOCALES_PATH, `${locale}.json`)

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}
