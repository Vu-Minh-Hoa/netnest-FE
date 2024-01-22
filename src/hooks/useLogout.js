import { useDispatch } from 'react-redux';
import { setToken } from '../slice/userSlice';

export const useLogout = () => {
  const dispatch = useDispatch();

  const resetState = () => {
    localStorage.setItem('token', '');
    dispatch(setToken(''));
    window.location.reload();
    console.log('loging out');
  };

  return { resetState };
};
