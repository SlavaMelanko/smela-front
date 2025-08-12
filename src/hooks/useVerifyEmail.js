import { useEffect, useReducer, useRef } from 'react'

const ActionType = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const initialState = {
  isLoading: true,
  isError: false,
  error: null,
  isSuccess: false
}

const verificationReducer = (state, action) => {
  switch (action.type) {
    case ActionType.START:
      return initialState
    case ActionType.SUCCESS:
      return {
        isLoading: false,
        isError: false,
        error: null,
        isSuccess: true
      }
    case ActionType.ERROR:
      return {
        isLoading: false,
        isError: true,
        error: action.payload,
        isSuccess: false
      }
    default:
      return state
  }
}

export const useVerifyEmail = verifyEmail => {
  const [state, dispatch] = useReducer(verificationReducer, initialState)

  // useRef is used here for two purposes:
  // 1. hasRun: prevents multiple verification attempts by persisting across re-renders
  //    Unlike state, changing ref doesn't trigger re-render
  // 2. isMounted: tracks component mount state to prevent state updates after unmount
  //    This prevents memory leaks and "setState on unmounted component" warnings
  // Link to the problem: https://stackoverflow.com/q/72601834
  const hasRun = useRef(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (hasRun.current) {
      return
    }

    hasRun.current = true

    const doVerification = async () => {
      if (!verifyEmail) {
        if (isMounted.current) {
          dispatch({
            type: ActionType.ERROR,
            payload: new Error('No verification function provided')
          })
        }

        return
      }

      try {
        await verifyEmail()

        if (isMounted.current) {
          dispatch({ type: ActionType.SUCCESS })
        }
      } catch (err) {
        console.error(err)

        if (isMounted.current) {
          dispatch({
            type: ActionType.ERROR,
            payload: err
          })
        }
      }
    }

    doVerification()
  }, [verifyEmail])

  return state
}

export default useVerifyEmail
