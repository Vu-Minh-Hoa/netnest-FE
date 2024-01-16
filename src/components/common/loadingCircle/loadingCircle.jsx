import { CircularProgress } from 'react-cssfx-loading';
import './loadingCircle.scss';
import ModalWrapper from '../modalWrapper/modalWrapper';
import classNames from 'classnames';

function ModalLoadingCircle({ className, modalClassName }) {
  return (
    <ModalWrapper className={modalClassName} haveClose={false}>
      <div className={classNames('loadingCircle-container', className)}>
        <CircularProgress />
      </div>
    </ModalWrapper>
  );
}

export default ModalLoadingCircle;
