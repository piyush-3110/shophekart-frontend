// ToastNotification.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotification = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick />;
};

export default ToastNotification;
