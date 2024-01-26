import { useSelector } from 'react-redux';
import { API_LIST } from '../contants/common';
import { deleteMethod, post } from '../services/request';
import { useAction } from './useAction';
import { useState } from 'react';

export const useFollow = () => {
  const [resData, setResData] = useState();
  const { action } = useAction();
  const { token } = useSelector((state) => state.user);

  const delUnfollow = async (userId) => {
    await action({
      action: async () =>
        await deleteMethod({
          url: API_LIST.del_unfollow,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userId: userId },
          },
        }),
      onSuccess: async (data) => {},
    });

    return resData;
  };

  const addFollow = async (userName) => {
    await action({
      action: async () =>
        await post({
          url: API_LIST.post_add_following,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userName: userName },
          },
        }),
      onSuccess: async (data) => {
        setResData(data);
      },
    });

    return resData;
  };

  return { delUnfollow, addFollow };
};
