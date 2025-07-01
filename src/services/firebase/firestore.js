import { getFirestore } from 'firebase/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { app } from './init'

export const getFirestoreSafe = () => {
  if (!app) {
    throw new Error('Firebase app is not initialized.')
  }

  return getFirestore(app)
}

const USER_COLLECTION_LABEL = 'users'

export const saveUserToStorage = async (userId, data) => {
  if (!data) {
    return
  }

  const db = getFirestoreSafe()

  await setDoc(doc(db, USER_COLLECTION_LABEL, userId), data, { merge: true })
}

export const getUserFromStorage = async userId => {
  if (!userId) {
    return null
  }

  const db = getFirestoreSafe()
  const user = await getDoc(doc(db, USER_COLLECTION_LABEL, userId))

  return user.exists() ? user.data() : null
}
