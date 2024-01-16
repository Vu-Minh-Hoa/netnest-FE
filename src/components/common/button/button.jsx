import classNames from 'classnames';
import { FadingBalls } from 'react-cssfx-loading';
import './button.scss';

function Button({
  className = '',
  text = '',
  btnType = 'button',
  onClick,
  isDisabled = false,
  isLoading = false,
  children,
}) {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={btnType}
      className={classNames('button', { disabled: isDisabled }, className)}
    >
      {isLoading ? (
        <div className='btn-loading'>
          <FadingBalls width='40px' height='10px' color='#fff' />
        </div>
      ) : (
        <>
          {text}
          {children}
        </>
      )}
    </button>
  );
}

export default Button;
