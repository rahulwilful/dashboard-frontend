import { toast } from 'react-toastify'
import './ShowToast.css'

const showToast = (message, type = 'default') => {
  switch (type) {
    case 'success':
      toast.success(message, {
        autoClose: 1500,
      })
      break
    case 'error':
      toast.error(message, {
        autoClose: 1500,
      })
      break
    case 'info':
      toast.info(message, {
        autoClose: 1500,
      })
      break
    case 'warning':
      toast.warning(message, {
        autoClose: 1500,
      })
      break
    default:
      toast(message, {
        autoClose: 1500,
      })
      break
  }
}

export default showToast
