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
  HCAPTCHA_SITEKEY: getRequiredEnv('HCAPTCHA_SITEKEY')
}

export default env
