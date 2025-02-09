import { Slide, type ToastOptions, toast } from 'react-toastify';

const UseToast = () => {
  const options: ToastOptions<unknown> = {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Slide
  };

  const toastSuccess = (message: string) => toast.success(message, options);

  const toastError = (message: string, opts?: ToastOptions) =>
    toast.error(message, { ...options, ...opts });

  const toastWarning = (message: string, opts?: ToastOptions) =>
    toast.warning(message, { ...options, ...opts });

  const toastInfo = (message: string, opts?: ToastOptions) =>
    toast.info(message, { ...options, ...opts });

  return { toastSuccess, toastError, toastWarning, toastInfo };
};

export default UseToast;
