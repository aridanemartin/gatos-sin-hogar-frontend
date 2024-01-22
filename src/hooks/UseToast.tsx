import { Slide, ToastOptions, toast } from 'react-toastify';

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

  const toastError = (message: string) => toast.error(message, options);

  const toastWarning = (message: string) => toast.warning(message, options);

  const toastInfo = (message: string) => toast.info(message, options);

  return { toastSuccess, toastError, toastWarning, toastInfo };
};

export default UseToast;
