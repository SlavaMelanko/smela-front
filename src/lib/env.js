const makeKey = key => {
  return `VITE_${key}`
}

const getValue = key => {
  return import.meta.env[makeKey(key)]
}

const getRequiredEnv = key => {
  const value = getValue(key)

  if (!value) {
    throw new Error(`Environment variable "${makeKey(key)}" is required`)
  }

  return value
}

const env = {
  CAPTCHA_SITE_KEY: getRequiredEnv('CAPTCHA_SITE_KEY'),
  BE_BASE_URL: getRequiredEnv('BE_BASE_URL')
}

export default env
