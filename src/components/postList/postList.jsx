import { useState } from 'react';
import Post from '../post/post';
import './postList.scss';
import ViewPost from '../viewPost/viewPost';
import { POST } from '../../contants/mock';

const PostList = ({ postList }) => {
  const [isClickPost, setIsClickPost] = useState(false);

  const handleClickPost = () => {
    setIsClickPost(true);
  };

  const handleClosePost = () => {
    setIsClickPost(false);
  };

  return (
    <>
      {isClickPost && (
        <ViewPost viewPostInfo={POST} onClose={handleClosePost} />
      )}
      <div className='post-list__container'>
        <div className='post-list__suggest-post'>
          {postList.map((postInfo, key) => {
            return (
              <Post onClick={handleClickPost} key={key} postInfo={postInfo} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PostList;
