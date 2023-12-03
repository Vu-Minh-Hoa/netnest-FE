import React from 'react';
import './style.css';

const MainLayout = ({ children }) => {
  return (
    <div className='main'>
      <div className='row' style={{ width: '100%' }}>
        <div className='content col-10'>{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
