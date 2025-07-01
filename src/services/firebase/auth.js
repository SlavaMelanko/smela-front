import { FirebaseError } from 'firebase/app'
import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import i18n from '@/i18n'
import { UserStatus } from '@/lib/types'

import { saveUserToStorage } from './firestore'
import { app } from './init'

const getAuthSafe = () => {
  if (!app) {
    throw new Error('Firebase app is not initialized.')
  }

  return getAuth(app)
}

const configureLanguage = () => {
  const auth = getAuthSafe()

  auth.languageCode = i18n.language
}

export const onAuthChange = callback => {
  return onAuthStateChanged(getAuthSafe(), callback)
}

export const signUpWithEmail = async ({
  email,
  password,
  firstName,
  lastName,
  status
}) => {
  const { user } = await createUserWithEmailAndPassword(
    getAuthSafe(),
    email,
    password
  )

  await saveUserToStorage(user.uid, {
    email,
    firstName,
    lastName,
    status
  })

  return { user }
}

export const signUpWithGoogle = async () => {
  throw new Error('Not implemented')
}

export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(
    getAuthSafe(),
    email,
    password
  )

  return result.user
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  const result = await signInWithPopup(getAuthSafe(), provider)

  return result.user
}

export const signOutUser = async () => {
  return signOut(getAuthSafe())
}

export const verifyEmail = async oobCode => {
  const auth = getAuthSafe()

  await applyActionCode(auth, oobCode)
  await saveUserToStorage(auth.currentUser.uid, {
    status: UserStatus.VERIFIED
  })

  return { success: true }
}

export const sendVerificationEmail = async () => {
  const user = getAuthSafe().currentUser

  if (!user) {
    throw new FirebaseError('auth/unauthenticated')
  }

  configureLanguage()

  return sendEmailVerification(user)
}

export const sendPasswordResetLink = async email => {
  const auth = getAuthSafe()

  configureLanguage()

  await sendPasswordResetEmail(auth, email)
}

export const confirmNewPassword = async (oobCode, newPassword) => {
  const auth = getAuthSafe()

  await confirmPasswordReset(auth, oobCode, newPassword)

  return { success: true }
}
