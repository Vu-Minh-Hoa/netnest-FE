import './modalWrapper.scss';

const ModalWrapper = ({ children }) => {
  return (
    <div className='modal-wrapper'>
      <div className='modal'>{children}</div>
    </div>
  );
};

export default ModalWrapper;
