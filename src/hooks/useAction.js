import { useDispatch } from 'react-redux';
import { setIsLoading } from '../slice/userSlice';

export const useAction = () => {
  const dispatch = useDispatch();

  const action = async ({ isLoading = true, action, onError, onSuccess }) => {
    try {
      isLoading && dispatch(setIsLoading(true));
      const res = await action();
      onSuccess && (await onSuccess(res || {}));
    } catch (error) {
      onError && onError(error);
    } finally {
      isLoading && dispatch(setIsLoading(false));
    }
  };

  const actionAll = async (funcs = []) => {
    try {
      dispatch(setIsLoading(true));
      await Promise.all(funcs);
    } catch (error) {
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return { action, actionAll, dispatch };
};
