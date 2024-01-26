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
  newPassword: yup
    .string()
    .required('New password is required!')
    .min(8, 'Password must be at least 8 characters.')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain special character.',
    ),
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
  const currentPassword = watch('currentPassword', '');
  const confirmPassword = watch('confirmPassword', '');
  const allValue = watch();

  useEffect(() => {
    if (errorText) {
      setErrorText('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allValue]);

  useEffect(() => {
    if (newPassword && newPassword === currentPassword) {
      setErrorText("Can't reuse the current password.");
    } else if (newPassword !== confirmPassword) {
      setErrorText("Password doesn't match");
    } else setErrorText('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setErrorText('');
        if (data === 'success') {
          resetState();
        } else {
          setErrorText('Incorect password!');
        }
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
            {errors.currentPassword?.message && (
              <p className='edit-modal-errText'>
                {errors.currentPassword?.message}
              </p>
            )}
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
            {errors.newPassword?.message && (
              <p className='edit-modal-errText'>
                {errors.newPassword?.message}
              </p>
            )}
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
            {(errors.confirmPassword?.message || errorText) && (
              <p className='edit-modal-errText'>
                {errors.confirmPassword?.message || errorText}
              </p>
            )}
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
