import { API_LIST } from '../contants/common';
import { deleteFormData, post, upload } from './request';

export const postPostReaction = async ({ isLiked, token, postId }) => {
  const data = new FormData();
  let response;
  const url = isLiked
    ? API_LIST.post_dislike_post
    : `${API_LIST.post_post}/addLike`;

  if (postId) {
    data.append('postId', postId);
  }

  if (isLiked) {
    const rawData = await deleteFormData({
      url,
      data,
      config: {
        headers: { authorization: 'Bearer ' + token },
      },
    });
    response = rawData?.data;
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
  const url = isLiked
    ? API_LIST.post_dislike_comment
    : `${API_LIST.post_like_comment}`;

  if (commentId) {
    data.append('commentId', commentId);
  }
  if (isLiked) {
    response = await post({
      url,
      config: {
        headers: { authorization: 'Bearer ' + token },
        params: {
          commentId,
        },
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
