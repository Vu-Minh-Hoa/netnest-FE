import { useState } from 'react';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import './delModal.scss';

const DelModal = ({ onDelete, onClose, text }) => {
  const handleDeleteBtn = () => {
    onDelete && onDelete();
  };

  const handleCloseChatModal = () => {
    onClose && onClose();
  };

  return (
    <ModalWrapper onClose={handleCloseChatModal}>
      <div className='chat-modal__user-action'>
        <div
          className='chat-modal__user-leave-btn'
          onClick={() => handleDeleteBtn()}
        >
          {text}
        </div>
        <div
          className='chat-modal__user-cancel-btn'
          onClick={() => handleCloseChatModal()}
        >
          Cancel
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DelModal;
