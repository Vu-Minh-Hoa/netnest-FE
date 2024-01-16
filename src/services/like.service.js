import { API_LIST } from '../contants/common';
import { deleteFormData, upload } from './request';

export const postPostReaction = async ({ isLiked, token, postId }) => {
  const data = new FormData();
  let response;
  const url = isLiked
    ? API_LIST.post_dislike_comment
    : `${API_LIST.post_add_comment}/addLike`;

  if (postId) {
    data.append('postId', postId);
  }

  if (isLiked) {
    response = await deleteFormData({
      url,
      data,
      config: {
        headers: { authorization: 'Bearer ' + token },
      },
    });
  } else {
    response = await upload({
      url,
      data,
      config: {
        headers: { authorization: 'Bearer ' + token },
      },
    });
  }

  return response;
};

export const postCommentReaction = async ({ isLiked, token, commentId }) => {
  const data = new FormData();
  let response;
  const url = API_LIST.post_like_comment;
  // const url = isLiked
  //   ? API_LIST.post_dislike_comment
  //   : `${API_LIST.post_like_comment}`;

  if (commentId) {
    data.append('commentId', commentId);
  }

  // if (isLiked) {
  //   response = await deleteFormData({
  //     url,
  //     data,
  //     config: {
  //       headers: { authorization: 'Bearer ' + token },
  //     },
  //   });
  // } else {
  response = await upload({
    url,
    data,
    config: {
      headers: { authorization: 'Bearer ' + token },
    },
  });
  // }

  return response;
};
