import { getAuth } from 'firebase/auth'
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer
} from 'react'

import { UserStatus } from '@/lib/types'
import {
  getUserFromStorage,
  onAuthChange,
  sendVerificationEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
  signUpWithGoogle as doSignUpWithGoogle
} from '@/services/firebase'

const AuthContext = createContext()

const initialState = { profile: null, loading: true, error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null }
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, loading: false, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR':
      return { ...state, profile: null, loading: false, error: null }
    default:
      return state
  }
}

function clearAuthIfNoUser(user, dispatch) {
  if (!user) {
    dispatch({ type: 'CLEAR' })

    return true
  }

  return false
}

async function loadUserProfile(user, dispatch) {
  if (clearAuthIfNoUser(user, dispatch)) return

  dispatch({ type: 'START_LOADING' })

  try {
    const profile = await getUserFromStorage(user.uid)

    dispatch({
      type: 'SET_PROFILE',
      payload: {
        ...profile,
        uid: user.uid,
        email: user.email
      }
    })
  } catch (err) {
    dispatch({ type: 'SET_ERROR', payload: err })
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const refreshUser = useCallback(async () => {
    const user = getAuth().currentUser

    await loadUserProfile(user, dispatch)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthChange(async user => {
      await loadUserProfile(user, dispatch)
    })

    return unsubscribe
  }, [])

  const handleAuthOperation = useCallback(async operation => {
    dispatch({ type: 'START_LOADING' })

    try {
      return await operation()
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err })
      throw err
    }
  }, [])

  const signUp = useCallback(
    async data =>
      handleAuthOperation(async () => {
        const { user } = await signUpWithEmail({
          ...data,
          status: UserStatus.NEW
        })

        sendVerificationEmail(user)
      }),
    [handleAuthOperation]
  )

  const signUpWithGoogle = useCallback(
    async data => handleAuthOperation(() => doSignUpWithGoogle(data)),
    [handleAuthOperation]
  )
  const logIn = useCallback(
    async (email, password) =>
      handleAuthOperation(() => signInWithEmail(email, password)),
    [handleAuthOperation]
  )
  const logInWithGoogle = useCallback(
    () => handleAuthOperation(() => signInWithGoogle()),
    [handleAuthOperation]
  )
  const logOut = useCallback(
    () => handleAuthOperation(() => signOutUser()),
    [handleAuthOperation]
  )

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: !!state.profile,
      signUp,
      signUpWithGoogle,
      logIn,
      logInWithGoogle,
      logOut,
      refreshUser
    }),
    [
      state,
      signUp,
      signUpWithGoogle,
      logIn,
      logInWithGoogle,
      logOut,
      refreshUser
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
