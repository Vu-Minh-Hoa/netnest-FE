import { useDispatch } from 'react-redux';
import { setToken } from '../slice/userSlice';

export const useLogout = () => {
  const dispatch = useDispatch();

  const resetState = () => {
    localStorage.setItem('token', '');
    localStorage.clear();
    dispatch(setToken(''));
    window.location.reload();
  };

  return { resetState };
};
