import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseSvg from '../../assets/svg/closeSvg';
import HearthSvg from '../../assets/svg/hearthSvg';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { post } from '../../services/request';
import Dot from '../common/dot/dot';
import './viewPost.scss';
import { CircularProgress } from 'react-cssfx-loading';
import Like from '../common/like/like';
import {
  postCommentReaction,
  postPostReaction,
} from '../../services/like.service';
import PostComment from '../postComment/postComment';
import { convertDateTimeFormat } from '../../utils/utils';

const ViewPost = ({ viewPostInfo, postComment, onClose }) => {
  const {
    comments = [],
    countLike = 0,
    content,
    createBy,
    createDate,
    base64Image,
    base64Video,
    followStatus,
    likeStatus,
    postID,
  } = viewPostInfo || {};
  const commentRef = useRef();
  const [commentValue, setCommentValue] = useState('');
  const [currentLikeAmount, setCurrentLikeAmount] = useState(0);
  const [timestamp, setTimestamp] = useState(0);
  const [commentsValue, setCommentsValue] = useState(comments.reverse() || []);
  const [isLiked, setIsLiked] = useState(likeStatus);
  const [followSuccess, setFollowSuccess] = useState(followStatus);
  const [isLoading, setIsLoading] = useState('');
  const [isCommentLoading, setIsCommentLoading] = useState('');
  const { action } = useAction();
  const { token, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (countLike) setCurrentLikeAmount(countLike);
  }, [countLike]);

  useEffect(() => {
    if (!comments?.length) return;

    const newData = comments
      .map((item) => {
        const newDateTimeFormate = convertDateTimeFormat(item.createDate);
        return { ...item, createDate: newDateTimeFormate };
      })
      .reverse();

    setCommentsValue(newData);
  }, [comments]);

  useEffect(() => {
    if (!createDate) return;
    const newDateTimeFormate = convertDateTimeFormat(createDate);
    setTimestamp(newDateTimeFormate);
  }, [createDate]);

  // useEffect(() => {
  //   window.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     onClose();
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleFollow = async () => {
    setIsLoading(true);
    await action({
      action: async () =>
        await post({
          url: API_LIST.post_add_following,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userName: viewPostInfo.createBy.userName },
          },
        }),
      onSuccess: async (data) => {
        setFollowSuccess(true);
      },
    });
    setIsLoading(false);
  };

  const handlePostComment = async () => {
    setIsCommentLoading(true);
    await action({
      action: async () =>
        await post({
          url: `${API_LIST.post_post}/${viewPostInfo.postID}/addComments`,
          data: {
            comment: commentValue,
          },
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        const newData = data
          .map((item) => {
            const newDateTimeFormate = convertDateTimeFormat(item.createDate);
            return { ...item, createDate: newDateTimeFormate };
          })
          .reverse();
        setCommentsValue(newData);
        commentRef.current.innerHTML = '';
        setCommentValue('');
      },
    });

    setIsCommentLoading(false);
  };

  const handleClose = () => {
    onClose();
  };

  const handleComment = (e) => {
    if (!e) return;
    setCommentValue(e.target.innerText);
  };

  const handlePostReaction = async () => {
    const data = await postPostReaction({
      isLiked,
      token,
      postId: postID,
    });

    if (Object?.keys(data)?.length) {
      setIsLiked((prev) => !prev);
      setCurrentLikeAmount(data.countLike);
    }
  };

  return (
    <>
      {viewPostInfo && (
        <div className='view-post__container' onClick={() => handleClose()}>
          <div className='view-post__close' onClick={() => handleClose()}>
            <CloseSvg />
          </div>
          <div className='view-post' onClick={(e) => e.stopPropagation()}>
            {base64Image.length > 0 && (
              <div className='view-post__img'>
                <img src={`data:image; base64, ${base64Image}`} alt='' />
              </div>
            )}
            {!base64Image.length > 0 && base64Video && (
              <div className='view-post__img'>
                <video controls>
                  <source
                    src={`data:video; base64, ${base64Video}`}
                    type='video/mp4'
                  />
                </video>
              </div>
            )}
            <div className='view-post__comment-section'>
              <div className='view-post__user-info view-post__author-info'>
                <div className='view-post__user-img view-post__comment-section__user-img'>
                  <img
                    src={`data:image;base64, ${createBy?.base64Image}`}
                    alt=''
                  />
                </div>
                <div className='view-post__comment-section__user-name'>
                  {createBy?.userName}
                </div>
                {!(user?.userId === createBy?.userId) && !followSuccess && (
                  <>
                    <Dot />
                    <div
                      className='view-post__comment-section__follow-btn'
                      onClick={() => handleFollow()}
                    >
                      {isLoading ? '...loading' : 'Follow'}
                    </div>
                  </>
                )}
              </div>
              <div className='view-post__comment-section__comment__wrapper'>
                <ul className='view-post__comment-section__comments'>
                  <li className='view-post__user-info view-post__comment-section__comment view-post__comment-section__comment__user'>
                    <div className='view-post__comment-section__comment__user-img__wrapper'>
                      <div className='view-post__user-img view-post__comment-section__comment__user-img'>
                        <img
                          src={`data:image;base64, ${createBy?.base64Image}`}
                          alt=''
                        />
                      </div>
                    </div>
                    <div className='view-post__comment-section__user-info'>
                      <p className='view-post__user-comment view-post__comment-section__comment__text'>
                        <span className='view-post__user-name'>
                          {createBy?.userName}&nbsp;
                        </span>
                        {content}
                      </p>
                    </div>
                  </li>
                  {commentsValue?.length > 0 &&
                    commentsValue?.map((commentsItem, key) => {
                      return (
                        <PostComment
                          commentsItem={commentsItem}
                          key={key}
                          token={token}
                        />
                      );
                    })}
                </ul>
              </div>
              <div className='view-post__reaction-timestamp'>
                <div className='view-post__reaction'>
                  <Like
                    onClick={() => handlePostReaction()}
                    isLiked={isLiked}
                  />
                </div>
                <div className='view-post__like'>{currentLikeAmount} likes</div>
                <div className='view-post__timestamp'>{timestamp} ago</div>
              </div>
              <div className='view-post__comment'>
                {isCommentLoading && (
                  <div className='view-post__comment-loading'>
                    <CircularProgress height={22} width={22} />
                  </div>
                )}
                <span
                  onInput={handleComment}
                  className={classNames('view-post__comment-input', {
                    'view-post__comment-input__has-value': commentValue,
                    'view-post__comment-input__loading': isCommentLoading,
                  })}
                  ref={commentRef}
                  contentEditable
                ></span>
                <span
                  className={classNames('view-post__comment-submit', {
                    'view-post__comment-submit__has-value': commentValue,
                  })}
                  onClick={() => handlePostComment()}
                >
                  Post
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPost;
