import './button.scss';

function Button({
  text = 'Text',
  className = '',
  btnType = 'button',
  onClick,
}) {
  return (
    <button onClick={onClick} type={btnType} className={'button ' + className}>
      {text}
    </button>
  );
}

export default Button;
