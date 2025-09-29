const makeEnvKey = key => {
  return `VITE_APP_${key}`
}

const getEnv = key => {
  return import.meta.env[makeEnvKey(key)]
}

const getRequiredEnv = key => {
  const value = getEnv(key)

  if (!value) {
    throw new Error(`Environment variable "${makeEnvKey(key)}" is required`)
  }

  return value
}

const env = {
  CAPTCHA_SITE_KEY: getRequiredEnv('CAPTCHA_SITE_KEY'),
  BE_BASE_URL: getRequiredEnv('BE_BASE_URL')
}

export default env
