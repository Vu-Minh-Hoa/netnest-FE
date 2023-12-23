import './viewPost.scss';
import defaultUserImg from '../../assets/img/user.jpg';
import { useEffect, useState } from 'react';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import HearthSvg from '../../assets/svg/hearthSvg';
import classNames from 'classnames';
import CloseSvg from '../../assets/svg/closeSvg';
import Dot from '../common/dot/dot';

const ViewPost = ({ viewPostInfo, onClose }) => {
  const {
    comments = [],
    username = '',
    caption = '',
    likeAmount,
    commentAmount,
    video = '',
    userImg = defaultUserImg,
    img = '',
  } = viewPostInfo || {};
  const [commentValue, setCommentValue] = useState('');

  // useEffect(() => {
  //   window.addEventListener('click', (e) => {
  //     e.stopPropagation();
  //     onClose();
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleClose = () => {
    onClose();
  };

  const handleComment = (e) => {
    if (!e) return;
    setCommentValue(e.target.innerText);
  };

  return (
    <>
      {viewPostInfo && (
        <div className='view-post__container' onClick={() => handleClose()}>
          <div className='view-post__close' onClick={() => handleClose()}>
            <CloseSvg />
          </div>
          <div className='view-post' onClick={(e) => e.stopPropagation()}>
            <div className='view-post__img'>
              <img src={img} alt='' />
            </div>
            <div className='view-post__comment-section'>
              <div className='view-post__user-info view-post__author-info'>
                <div className='view-post__user-img view-post__comment-section__user-img'>
                  <img src={userImg} alt='' />
                </div>
                <div className='view-post__comment-section__user-name'>
                  {username}&nbsp;
                </div>
                <Dot />
                <div className='view-post__comment-section__follow-btn'>
                  Follow
                </div>
              </div>
              <div className='view-post__comment-section__comment__wrapper'>
                <ul className='view-post__comment-section__comments'>
                  {comments.length > 0 &&
                    comments.map((commentsItem, key) => {
                      const { userImg, comment } = commentsItem;
                      return (
                        <li
                          key={key}
                          className='view-post__user-info view-post__comment-section__comment'
                        >
                          <div className='view-post__comment-section__comment__user-img__wrapper'>
                            <div className='view-post__user-img view-post__comment-section__comment__user-img'>
                              <img src={userImg} alt='' />
                            </div>
                          </div>
                          <div className='view-post__comment-section__user-info'>
                            <p className='view-post__user-comment view-post__comment-section__comment__text'>
                              <span className='view-post__user-name'>
                                {username}&nbsp;
                              </span>
                              {comment}
                            </p>
                            <div className='view-post__action'>
                              <span>{likeAmount} likes</span>
                            </div>
                          </div>
                          <div className='view-post__reaction'>
                            <div className='view-post__reaction__like'>
                              <HearthSvg />
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className='view-post__reaction-timestamp'>
                <div className='view-post__reaction'>
                  <div className='view-post__reaction__like'>
                    <HearthSvg />
                  </div>
                </div>
                <div className='view-post__like'>
                  <span>{likeAmount} likes</span>
                </div>
                {/* <div className='view-post__timestamp'>
                </div> */}
              </div>
              <div className='view-post__comment'>
                <span
                  onInput={handleComment}
                  className={classNames('view-post__comment-input', {
                    'view-post__comment-input__has-value': commentValue,
                  })}
                  contentEditable
                ></span>
                <span
                  className={classNames('view-post__comment-submit', {
                    'view-post__comment-submit__has-value': commentValue,
                  })}
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
