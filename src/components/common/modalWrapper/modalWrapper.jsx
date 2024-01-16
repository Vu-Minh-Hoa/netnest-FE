import classNames from 'classnames';
import CloseSvg from '../../../assets/svg/closeSvg';
import './modalWrapper.scss';

const ModalWrapper = ({ children, className, onClose, haveClose = true }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <div className={classNames('modal-wrapper', className)}>
      {haveClose && (
        <div className='modal__close' onClick={() => handleClose()}>
          <CloseSvg />
        </div>
      )}
      <div className='modal-container'>{children}</div>
    </div>
  );
};

export default ModalWrapper;
