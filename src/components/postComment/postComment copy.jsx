import { useEffect, useState } from 'react';
import Like from '../common/like/like';
import { postCommentReaction } from '../../services/like.service';

const PostComment = ({ commentsItem, key, onLike, token, isLiked }) => {
  const [likeAmount, setLikeAmount] = useState(0);
  const [isCommentLiked, setIsCommentLiked] = useState(isLiked);

  useEffect(() => {
    if (!commentsItem?.countLike) return;

    setLikeAmount(commentsItem?.countLike);
  }, [commentsItem]);

  const handleLikeComment = async () => {
    const data = await postCommentReaction({
      isLiked,
      token,
      commentId: commentsItem.commentID,
    });

    if (!data) return;

    if (Object?.keys(data)?.length) {
      setIsCommentLiked((prev) => !prev);
      setLikeAmount(data.countLike);
    }
  };

  return (
    <li
      key={key}
      className='view-post__user-info view-post__comment-section__comment'
    >
      <div className='view-post__comment-section__comment__user-img__wrapper'>
        <div className='view-post__user-img view-post__comment-section__comment__user-img'>
          <img
            src={`data:image;base64, ${commentsItem.user.base64Image}`}
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
