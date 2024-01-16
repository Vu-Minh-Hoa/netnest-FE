import classNames from 'classnames';
import HearthSolidSvg from '../../../assets/svg/hearthSolidSvg';
import HearthSvg from '../../../assets/svg/hearthSvg';
import './like.scss';
const Like = ({ onClick, isLiked, classname }) => {
  const handleClickLike = () => {
    onClick && onClick();
  };

  return (
    <div
      className={classNames(
        'like-container',
        {
          liked: isLiked,
        },
        classname,
      )}
      onClick={() => handleClickLike()}
    >
      {isLiked ? <HearthSolidSvg /> : <HearthSvg />}
    </div>
  );
};

export default Like;
