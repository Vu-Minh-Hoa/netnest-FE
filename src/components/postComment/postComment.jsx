import { useState } from 'react';
import { useSelector } from 'react-redux';
import HorizontalDot from '../../assets/svg/horizontalDot';
import { DISPLAY_BASE64 } from '../../contants/common';
import { postCommentReaction } from '../../services/like.service';
import Like from '../common/like/like';

const PostComment = ({ commentsItem, onLike, onDeleteComment }) => {
  const [likeAmount, setLikeAmount] = useState(0);
  const [isCommentLiked, setIsCommentLiked] = useState(false);
  const { user, token } = useSelector((store) => store.user);

  const handleLikeComment = async () => {
    const data = await postCommentReaction({
      isLiked: isCommentLiked,
      token,
      commentId: commentsItem?.commentID,
    });

    if (Object?.keys(data)?.length) {
      setLikeAmount(data?.countLike);
      setIsCommentLiked((prev) => !prev);
    }
  };

  const handleClickUserCommentAction = () => {
    onDeleteComment && onDeleteComment(commentsItem.commentID);
  };

  return (
    <li className='view-post__user-info view-post__comment-section__comment'>
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
          <span>{commentsItem?.countLike || likeAmount || 0} likes</span>
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
          isLiked={isCommentLiked || commentsItem?.statusLike}
        />
      </div>
    </li>
  );
};

export default PostComment;
