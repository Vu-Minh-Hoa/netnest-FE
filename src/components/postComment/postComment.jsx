import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HorizontalDot from '../../assets/svg/horizontalDot';
import { postCommentReaction } from '../../services/like.service';
import Like from '../common/like/like';
import { DISPLAY_BASE64 } from '../../contants/common';

const PostComment = ({ commentsItem, key, onLike, token, onDeleteComment }) => {
  const [likeAmount, setLikeAmount] = useState(false);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    console.log(commentsItem.countLike, ': ', commentsItem.commentID);
    setLikeAmount(commentsItem?.countLike);
    setIsCommentLiked(commentsItem?.statusLike);
  }, [commentsItem?.countLike, commentsItem?.statusLike]);

  const handleLikeComment = async () => {
    const data = await postCommentReaction({
      isLiked: isCommentLiked,
      token,
      commentId: commentsItem.commentID,
    });

    if (!data) return;

    if (Object?.keys(data)?.length) {
      setIsCommentLiked((prev) => !prev);
      setLikeAmount(data.countLike);
    }
  };

  const handleClickUserCommentAction = () => {
    onDeleteComment && onDeleteComment(commentsItem.commentID);
  };

  return (
    <li
      key={key}
      className='view-post__user-info view-post__comment-section__comment'
    >
      <div className='view-post__comment-section__comment__user-img__wrapper'>
        <div className='view-post__user-img view-post__comment-section__comment__user-img'>
          <img
            src={DISPLAY_BASE64.IMAGE + commentsItem.user.base64Image}
            alt=''
          />
        </div>
      </div>
      <div className='view-post__comment-section__user-info'>
        <p className='view-post__user-comment view-post__comment-section__comment__text'>
          <span className='view-post__user-name'>
            {commentsItem?.user?.userName}&nbsp;
          </span>
          {commentsItem?.comment}
        </p>
        <span className='view-post__timestamp'>{commentsItem?.createDate}</span>
        <div className='view-post__action'>
          <span>{likeAmount || 0} likes</span>
          {user.userId === commentsItem?.user?.userId && (
            <div
              className='view-post__comment-section__user-action'
              onClick={() => handleClickUserCommentAction()}
            >
              <HorizontalDot />
            </div>
          )}
        </div>
      </div>
      <div className='view-post__reaction'>
        <Like
          onClick={() => handleLikeComment()}
          classname='view-post__reaction__like'
          isLiked={isCommentLiked}
        />
      </div>
    </li>
  );
};

export default PostComment;
