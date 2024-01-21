import classNames from 'classnames';
import FileSvg from '../../assets/svg/fileSvg';
import Button from '../common/button/button';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import './createModal.scss';
import defaultUser from '../../assets/img/user.jpg';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toBase64 } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { useAction } from '../../hooks/useAction';
import { post } from '../../services/request';
import { API_LIST } from '../../contants/common';
import { updateImage_Video } from '../../services/postImgVideo.service';
import { useRouter } from '../../hooks/useRouter';
import { useLocation } from 'react-router-dom';

const CreateModal = ({ onClose, onCreateSuccess }) => {
  const { action } = useAction();
  const inputRef = useRef();
  const { user } = useSelector((store) => store.user);
  const { token } = useSelector((store) => store.user);
  const [previewVideo, setPreviewVideo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [captionValue, setCaptionValue] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [videoValue, setVideoValue] = useState('');
  const [fileType, setFileType] = useState('');
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1];

  const handleOnClose = () => {
    onClose && onClose();
  };

  // useEffect(() => {
  //   const newDate = date.toLocaleString('en-US', {
  //     timeZone: 'Asia/BangKok',
  //   });
  //   const parsedTime = new Date(newDate);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleFileType = async (file) => {
    if (!file) return;

    const fileType = file.type.split('/')[0];
    const fileBase64 = await toBase64(file);

    if (fileType === 'image') {
      setPreviewImage(fileBase64);
      setImageValue(file);
    }
    if (fileType === 'video') {
      setPreviewVideo(fileBase64);
      setVideoValue(file);
    }
    setFileType(fileType);
  };

  const handleChangeFile = () => {
    setPreviewImage('');
    setPreviewVideo('');
    handleImportFile();
  };

  const handleImportFile = () => {
    inputRef.current.click();
  };

  const handleCaption = (e) => {
    setCaptionValue(e.target.innerText);
  };

  useEffect(() => {}, [captionValue]);

  const handleCaptionUpload = async () => {
    setIsLoading(true);
    await action({
      action: async () =>
        post({
          url: API_LIST.post_create_post,
          data: {
            content: captionValue,
          },
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        const postId = data.postID;

        if (fileType === 'image') {
          await updateImage_Video({
            postId,
            file: imageValue,
            fileType,
            token,
          });
        } else if (fileType === 'video') {
          await updateImage_Video({
            postId,
            file: videoValue,
            fileType,
            token,
          });
        }

        if (currentPath === 'profile') {
          window.location.reload();
        }

        handleOnClose();
      },
    });
    setIsLoading(false);
  };

  return (
    <ModalWrapper onClose={handleOnClose}>
      <div className='create-modal' onClick={(e) => e.stopPropagation()}>
        <div className='create-modal__header'>
          <Button
            isDisabled={!(previewImage || previewVideo)}
            text='Change file'
            onClick={() => handleChangeFile()}
          />
          <div className='create-modal__header__title'>Create new post</div>
          <Button
            onClick={() => handleCaptionUpload()}
            isDisabled={!(captionValue && (previewImage || previewVideo))}
            className={classNames('create-modal__header__share')}
            isLoading={isLoading}
            text='Share'
          />
        </div>
        <div className='create-modal__content'>
          <input
            ref={inputRef}
            onChange={(e) => handleFileType(e.target.files[0])}
            accept='.png, .jpg, .jpeg,video/*'
            className='create-modal__input-file'
            type='file'
          />
          {!(previewImage || previewVideo) && (
            <div className='create-modal__input-file__container'>
              <div className='create-modal__input-file-icon'>
                <FileSvg />
              </div>
              <div className='create-modal__input-desc'>
                Drag photos or videos here
              </div>
              <Button
                className='create-modal__input-btn'
                text='Select from device'
                onClick={() => handleImportFile()}
              />
            </div>
          )}
          {previewImage && (
            <div className='create-modal__img-video'>
              <img src={previewImage} alt='' />
            </div>
          )}
          {previewVideo && (
            <div className='create-modal__img-video'>
              <video controls>
                <source src={previewVideo} />
              </video>
            </div>
          )}
          <div className='create-modal__caption-section'>
            <div className='create-modal__user-info'>
              <div className='create-modal__user-img'>
                <img src={'data:image;base64, ' + user.base64Image} alt='' />
              </div>
              <div className='create-modal__user-name'>{user.userName}</div>
            </div>
            <div className='create-modal__caption'>
              <span
                onInput={handleCaption}
                className={classNames('create-modal__caption-input', {
                  'create-modal__caption-input__has-value': captionValue,
                })}
                contentEditable
              ></span>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateModal;
