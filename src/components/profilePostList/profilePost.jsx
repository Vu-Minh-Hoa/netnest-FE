import { useEffect, useState } from 'react';
import ViewPost from '../viewPost/viewPost';
import './profilePost.scss';
import { useAction } from '../../hooks/useAction';
import { get, post } from '../../services/request';
import { API_LIST } from '../../contants/common';
import { useSelector } from 'react-redux';

const ProfilePostLit = ({ postData }) => {
  const [isClickPost, setIsClickPost] = useState(false);
  const [postedComment, setPostedComment] = useState();
  const [viewPostData, setViewPostData] = useState(false);
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();

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

  const handleOnClickPost = async (postId) => {
    getPostDetail(postId);
    setIsClickPost(true);
  };

  const handlePostCommenRecallPostDetail = (postId) => {
    setPostedComment(postId);
  };

  const handleClosePost = () => {
    setViewPostData('');
    setIsClickPost(false);
  };

  return (
    <>
      {isClickPost && (
        <ViewPost
          postedComment={handlePostCommenRecallPostDetail}
          viewPostInfo={viewPostData}
          onClose={handleClosePost}
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
                    <div
                      className='post__img-video'
                      onClick={() => handleOnClickPost(post.postID)}
                    >
                      <img
                        src={`data:image;base64, ${base64Image?.[0]}`}
                        alt=''
                      />
                    </div>
                  )}
                  {!base64Image?.[0] && base64video?.[0] && (
                    <div
                      className='post__img-video'
                      onClick={() => handleOnClickPost(post.postID)}
                    >
                      <video controls>
                        <source
                          src={`data:video;base64, ${base64video[0]}`}
                          type='video/mp4'
                        ></source>
                      </video>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ProfilePostLit;
