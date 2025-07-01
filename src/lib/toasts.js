import { toast } from 'react-toastify'

const ToastId = Object.freeze({
  SUCCESS: 'success-toast',
  ERROR: 'error-toast'
})

const toasts = {
  success: message => {
    if (toast.isActive(ToastId.SUCCESS)) {
      return
    }

    return toast.success(message, { toastId: ToastId.SUCCESS })
  },

  error: message => {
    if (toast.isActive(ToastId.ERROR)) {
      return
    }

    return toast.error(message, { toastId: ToastId.ERROR })
  },

  clear: () => toast.dismiss()
}

export default toasts
