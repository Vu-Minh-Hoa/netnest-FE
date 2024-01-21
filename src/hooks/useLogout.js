import { useDispatch } from 'react-redux';
import { useRouter } from './useRouter';
import { setToken } from '../slice/userSlice';

export const useLogout = () => {
  const { pushRotue } = useRouter();
  const dispatch = useDispatch();

  const resetState = () => {
    localStorage.setItem('token', '');
    dispatch(setToken(''));
    pushRotue('/login');
  };

  return { resetState };
};
