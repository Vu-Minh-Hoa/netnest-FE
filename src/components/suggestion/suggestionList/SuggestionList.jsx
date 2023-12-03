import React from 'react';
import './style.css';

const SuggestionItem = ({ id, img, ma, name }) => {
  return (
    <div className='item' key={id}>
      <div className='info-item'>
        <img src={img} alt='' />
        <div className='group-info'>
          <b>{ma}</b>
          <h4>{name}</h4>
          <span>follow you</span>
        </div>
      </div>
      <button className='btn-flow'>Follow</button>
    </div>
  );
};

const SuggestionList = ({ listItem }) => {
  return (
    <div className='list-item'>
      {listItem?.map((item) => (
        <SuggestionItem
          key={item.id}
          img={item.img}
          ma={item.ma}
          name={item.name}
        />
      ))}
    </div>
  );
};

export default SuggestionList;
