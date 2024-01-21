import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import Button from '../../components/common/button/button';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { useLogout } from '../../hooks/useLogout';
import { post } from '../../services/request';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import './editModal.scss';

const schema = yup.object({
  currentPassword: yup.string().required('Current password is required!'),
  newPassword: yup.string().required('New password is required!'),
  confirmPassword: yup.string().required('Confirm password is required!'),
});

const EditModal = ({ userInfo, onClose }) => {
  const {
    register,
    handleSubmit,
    formState,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { action } = useAction();
  const { resetState } = useLogout();
  const { token } = useSelector((store) => store.user);
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const newPassword = watch('newPassword', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    if (newPassword !== confirmPassword) {
      setErrorText('Password not match');
    } else {
      setErrorText('');
    }
  }, [newPassword, confirmPassword]);

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    await action({
      action: async () =>
        await post({
          url: API_LIST.post_change_password,
          data: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
          },
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        resetState();
      },
      onError: async () => {
        setErrorText('Incorect password');
      },
    });
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    onClose && onClose();
  };

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <div className='edit-modal-container'>
        {/* edit avatar section (currently not neccesary)
          <div className='edit-modal'>
            <div className='user-edit-info'>
              <input
                ref={inputRef}
                onChange={(e) => handleFile(e.target.files[0])}
                accept='.png, .jpg, .jpeg'
                className='edit-modal__input-file'
                type='file'
              />
              <div className='user-edit-info__avatar'>
                <img src={DISPLAY_BASE64.IMAGE + userInfo.base64Image} alt='' />
              </div>
              <div className='user-edit-info__user-info'>
                <span className='user-edit-info__username'>
                  {userInfo.userName}
                </span>
                <span className='user-edit-info__fullname'>
                  {userInfo.fullName}
                </span>
              </div>
              <div className='user-edit-info__edit-avatar'>
                <Button
                  text='Change photo'
                  onClick={() => handleUploadAvatar()}
                  className='user-edit-info__edit-avatar-btn'
                />
              </div>
            </div>
          </div> */}

        <form className='edit-modal-form' onSubmit={handleSubmit(onSubmitForm)}>
          <h2 className='edit-modal-title'>Update your profile</h2>
          <div className='edit-modal__input-form'>
            <p className='edit-modal__input-title'>Current password:</p>
            <input
              className='edit-modal-current-password'
              type='password'
              name='currentPassword'
              placeholder='Current password'
              {...register('currentPassword')}
            />
            <p className='edit-modal-errText'>
              {errors.currentPassword?.message}
            </p>
          </div>
          <div className='edit-modal__input-form'>
            <p className='edit-modal__input-title'>New password:</p>
            <input
              className='edit-modal-new-password'
              type='password'
              name='newPassword'
              placeholder='New password'
              {...register('newPassword')}
            />
            <p className='edit-modal-errText'>{errors.newPassword?.message}</p>
          </div>

          <div className='edit-modal__input-form'>
            <p className='edit-modal__input-title'>Confirm password:</p>
            <input
              className='edit-modal-confirm-password'
              type='password'
              name='confirmPassword'
              placeholder='Confirm password'
              {...register('confirmPassword')}
            />
            <p className='edit-modal-errText'>
              {errors.confirmPassword?.message || errorText}
            </p>
          </div>

          <Button
            btnType='submit'
            text='Update'
            isLoading={isLoading}
            isDisabled={!formState.isDirty || !!errorText}
            className='edit-modal-button'
          />
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditModal;
