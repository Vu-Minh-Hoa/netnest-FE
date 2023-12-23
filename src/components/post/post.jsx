import './post.scss';
import defaultUserImg from '../../assets/img/user.jpg';
import { useState } from 'react';
import Dot from '../common/dot/dot';
import classNames from 'classnames';

const Post = ({ postInfo, onClick }) => {
  const {
    username,
    caption,
    likeAmount,
    commentAmount,
    video = '',
    userImg = defaultUserImg,
    img = '',
  } = postInfo;
  const [commentValue, setCommentValue] = useState('');

  const handleComment = (e) => {
    if (!e) return;
    setCommentValue(e.target.innerText);
  };

  const handleOnclick = () => {
    onClick && onClick();
  };

  return (
    <div className='post'>
      <div className='post__user-info__wrapper'>
        <div className='post__user-info'>
          <div className='post__user-img__wrapper'>
            <div className='post__user-img'>
              <img src={userImg} alt='' />
            </div>
          </div>
          <span className='post__username'>{username}</span>
          <Dot />
          <span className='post__follow'>Follow</span>
        </div>
      </div>
      <div className='post__img-video' onClick={() => handleOnclick()}>
        <img src={img} alt='' />
      </div>
      <div className='post__action'></div>
      {likeAmount && (
        <div className='post__like'>
          <span>{likeAmount} likes</span>
        </div>
      )}
      {caption && (
        <div className='post__caption'>
          <span className='post__caption-username'>{username}&nbsp;</span>
          <p className='post__caption-text'>{caption}</p>
        </div>
      )}
      {commentAmount && (
        <div className='post__view-comment'>
          <span
            className='post__view-comment-text'
            onClick={() => handleOnclick()}
          >
            View {commentAmount > 1 ? `all ${commentAmount}` : 1} comments
          </span>
        </div>
      )}
      <div className='post__comment'>
        <span
          onInput={handleComment}
          className={classNames('post__comment-input', {
            'post__comment-input__has-value': commentValue,
          })}
          contentEditable
        ></span>

        {commentValue && <span className='post__comment-submit'>Post</span>}
      </div>
    </div>
  );
};

export default Post;
