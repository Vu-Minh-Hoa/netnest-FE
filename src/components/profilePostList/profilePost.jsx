import { useEffect, useState } from 'react';
import ViewPost from '../viewPost/viewPost';
import './profilePost.scss';
import { useAction } from '../../hooks/useAction';
import { deleteMethod, get, post } from '../../services/request';
import { API_LIST } from '../../contants/common';
import { useSelector } from 'react-redux';
import VideoSvg from '../../assets/svg/videoSvg';
import HearthSolidSvg from '../../assets/svg/hearthSolidSvg';
import ChatSolidSvg from '../../assets/svg/chatSolidSvg';
import ModalLoadingCircle from '../common/loadingCircle/loadingCircle';

const ProfilePostList = ({ postData, onDeletePost, onDeleteComment }) => {
  const [isClickPost, setIsClickPost] = useState(false);
  const [postedComment, setPostedComment] = useState();
  const [postComments, setPostComments] = useState();
  const [viewPostData, setViewPostData] = useState({});
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();

  useEffect(() => {
    if (!postedComment) return;

    getPostDetail(postedComment);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postedComment]);

  const getPostDetail = async (postId) => {
    setIsClickPost(true);

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
        setPostComments(data.comments);
        setViewPostData(data);
      },
    });
  };

  const DelPost = async (postId) => {
    await action({
      action: async () =>
        await deleteMethod({
          url: API_LIST.del_post,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { postId: postId },
          },
        }),
      onSuccess: async (data) => {
        onDeletePost && onDeletePost();
      },
    });
  };

  const DelComment = async (postId, commentId) => {
    await action({
      action: async () =>
        await deleteMethod({
          url: API_LIST.del_post_comment,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { postId: postId, commentId: commentId },
          },
        }),
      onSuccess: async (data) => {
        await getPostDetail(postId);
        onDeleteComment && onDeleteComment();
      },
    });
  };

  const handleDeletePost = async (postId) => {
    await DelPost(postId);
  };

  const handleOnClickPost = async (postId) => {
    await getPostDetail(postId);
  };

  const handlePostCommenRecallPostDetail = (postId) => {
    setPostedComment(postId);
  };

  const handleDeleteComment = async (postId, conmmentId) => {
    await DelComment(postId, conmmentId);
  };

  const handleClosePost = () => {
    setViewPostData('');
    setIsClickPost(false);
  };

  return (
    <>
      {isClickPost && !Object.keys(viewPostData).length > 0 && (
        <ModalLoadingCircle />
      )}

      {isClickPost && Object.keys(viewPostData).length > 0 && (
        <ViewPost
          postedComment={handlePostCommenRecallPostDetail}
          viewPostInfo={viewPostData}
          postComments={postComments}
          onClose={handleClosePost}
          onDeletePost={handleDeletePost}
          onDeleteComment={handleDeleteComment}
        />
      )}
      <div className='profile-post-list-container'>
        <div className='profile-post-list'>
          {postData.length > 0 &&
            postData.map((post, key) => {
              const { base64Image, base64video } = post || {};
              return (
                <div className='profile-post' key={key}>
                  {base64Image?.[0] && !base64video?.[0] && (
                    <div className='post__img-video'>
                      <img
                        src={`data:image;base64, ${base64Image?.[0]}`}
                        alt=''
                      />
                    </div>
                  )}
                  {!base64Image?.[0] && base64video?.[0] && (
                    <div className='post__img-video'>
                      <video>
                        <source
                          src={`data:video;base64, ${base64video[0]}`}
                          type='video/mp4'
                        ></source>
                      </video>
                      <div className='post__img-video__video-icon'>
                        <VideoSvg />
                      </div>
                    </div>
                  )}
                  <div
                    className='profile-post__info-hover'
                    onClick={() => handleOnClickPost(post.postID)}
                  >
                    {post?.countLike > 0 && (
                      <div className='profile-post__liked'>
                        <span className='profile-post__liked-icon'>
                          <HearthSolidSvg />
                        </span>
                        <span className='profile-post__liked-amount'>
                          {post?.countLike}
                        </span>
                      </div>
                    )}
                    <div className='profile-post__commented'>
                      <span className='profile-post__commented-icon'>
                        <ChatSolidSvg />
                      </span>
                      <span className='profile-post__commented-amount'>
                        {post?.countComments}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProfilePostList;
