import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { get } from '../../services/request';
import Post from '../post/post';
import ViewPost from '../viewPost/viewPost';
import './postList.scss';
import ModalLoadingCircle from '../common/loadingCircle/loadingCircle';

const PostList = ({ postList = [] }) => {
  const [isClickPost, setIsClickPost] = useState(false);
  const [viewPostData, setViewPostData] = useState();
  const [postedComment, setPostedComment] = useState();
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();

  useEffect(() => {
    console.log(!!viewPostData);
    if (isClickPost) return;

    setViewPostData('');
  }, [isClickPost]);

  useEffect(() => {
    if (!postedComment) return;

    getPostDetail(postedComment);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postedComment]);

  const getPostDetail = async (postId) => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.post_detail,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { postId },
          },
        }),
      onSuccess: async (data) => {
        setViewPostData(data);
      },
    });
  };

  const handlePostComment = async (postId) => {
    await getPostDetail(postId);
    setIsClickPost(true);
  };

  const handleClickPost = async (postId) => {
    setIsClickPost(true);
    await getPostDetail(postId);
  };

  const handleClosePost = () => {
    setViewPostData('');
    setIsClickPost(false);
  };

  return (
    <>
      {isClickPost && !viewPostData && <ModalLoadingCircle />}
      {isClickPost && viewPostData && (
        <ViewPost viewPostInfo={viewPostData} onClose={handleClosePost} />
      )}
      <div className='post-list__container'>
        <div className='post-list__suggest-post'>
          {postList.map((postInfo, key) => {
            return (
              <Post
                onClick={handleClickPost}
                key={key}
                onPostComment={handlePostComment}
                postInfo={postInfo}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostList;
