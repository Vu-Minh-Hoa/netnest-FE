import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentSvg from '../../assets/svg/commentSvg';
import HearthSolidSvg from '../../assets/svg/hearthSolidSvg';
import HearthSvg from '../../assets/svg/hearthSvg';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { postPostReaction } from '../../services/like.service';
import { post } from '../../services/request';
import Dot from '../common/dot/dot';
import './post.scss';
import Like from '../common/like/like';
import { convertDateTimeFormat } from '../../utils/utils';
import { useRouter } from '../../hooks/useRouter';

const Post = ({ postInfo, onClick, onPostComment }) => {
  const {
    postID,
    username,
    content,
    countLike = 0,
    countComments = 0,
    base64video = '',
    createBy,
    createDate,
    base64Image = '',
    likeStatus,
    followStatus = false,
  } = postInfo;
  const [commentValue, setCommentValue] = useState('');
  const [timestamp, setSimestamp] = useState('');
  const [currentLikeAmount, setCurrentLikeAmount] = useState(countLike);
  const [followSuccess, setFollowSuccess] = useState(followStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(likeStatus);
  const { pushRoute } = useRouter();
  const { action } = useAction();
  const { token } = useSelector((store) => store.user);
  const commentRef = useRef(null);

  useEffect(() => {
    setSimestamp(convertDateTimeFormat(createDate));
  }, [createDate]);

  const handleComment = (e) => {
    if (!e) return;
    setCommentValue(e.target.innerText);
  };

  const handleOnclick = () => {
    onClick && onClick(postID);
  };

  const handlePostComment = async () => {
    await action({
      action: async () =>
        await post({
          url: `${API_LIST.post_post}/${postID}/addComments`,
          data: {
            comment: commentValue,
          },
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        setCommentValue('');
        commentRef.current.innerHTML = '';
        onPostComment && onPostComment(postID);
      },
    });
  };

  const handleFollow = async (userName) => {
    console.log(userName);
    setIsLoading(true);
    await action({
      action: async () =>
        await post({
          url: API_LIST.post_add_following,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userName },
          },
        }),
      onSuccess: async (data) => {
        setFollowSuccess(true);
      },
    });
    setIsLoading(false);
  };

  const handlePostReaction = async () => {
    const data = await postPostReaction({ isLiked, token, postId: postID });
    if (Object?.keys(data)?.length) setIsLiked((prev) => !prev);
    setCurrentLikeAmount(data.countLike);
  };

  const handleClickAvatar = () => {
    pushRoute(`/profile/${createBy.userName}`);
  };

  return (
    <div className='post'>
      <div className='post__user-info__wrapper'>
        <div className='post__user-info__container'>
          <div className='post__user-info' onClick={() => handleClickAvatar()}>
            <div className='post__user-img__wrapper'>
              <div className='post__user-img'>
                <img
                  src={`data:image;base64, ${createBy.base64Image}`}
                  alt=''
                />
              </div>
            </div>
            <span className='post__username'>{createBy.userName}</span>
          </div>

          <Dot />
          <span className='post__timestamp'>{timestamp}</span>
          {!followSuccess && (
            <>
              <Dot />
              {isLoading ? (
                <span className='post__follow-loading'>...loading</span>
              ) : (
                <span
                  className='post__follow'
                  onClick={() => handleFollow(createBy.userName)}
                >
                  Follow
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {base64Image?.[0] && (
        <div className='post__img-video' onClick={() => handleOnclick()}>
          <img src={`data:image;base64, ${base64Image?.[0]}`} alt='' />
        </div>
      )}
      {!base64Image?.[0] && base64video?.[0] && (
        <div className='post__img-video'>
          <video controls>
            <source
              src={`data:video;base64, ${base64video[0]}`}
              type='video/mp4'
            ></source>
          </video>
        </div>
      )}
      <div className='post__action__wrapper'>
        <Like onClick={handlePostReaction} isLiked={isLiked} />
        <div
          className={classNames('post__action', 'post__action-comment')}
          onClick={() => handleOnclick()}
        >
          <CommentSvg />
        </div>
      </div>
      {currentLikeAmount ? (
        <div className='post__like'>
          <span>{currentLikeAmount} likes</span>
        </div>
      ) : (
        ''
      )}
      {content ? (
        <div className='post__caption'>
          <span className='post__caption-username'>{username}&nbsp;</span>
          <p className='post__caption-text'>{content}</p>
        </div>
      ) : (
        ''
      )}
      {countComments ? (
        <div className='post__view-comment'>
          <span
            className='post__view-comment-text'
            onClick={() => handleOnclick()}
          >
            View {countComments > 1 ? `all ${countComments}` : 1} comments
          </span>
        </div>
      ) : (
        ''
      )}
      <div className='post__comment'>
        <span
          onInput={handleComment}
          className={classNames('post__comment-input', {
            'post__comment-input__has-value': commentValue,
          })}
          ref={commentRef}
          contentEditable
        ></span>
        {commentValue && (
          <span
            className='post__comment-submit'
            onClick={() => handlePostComment()}
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
