import React from 'react';
import "./suggestion.css";
import SuggestionList from '../../components/suggestion/suggestionList/SuggestionList';

const list = [
  {
      id: 1,
      img: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg',
      ma: 'dssdadsa',
      name: 'Nguyen'
  },
  {
    id: 2,
    img: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg',
    ma: 'dssdadsa',
    name: 'Nguyen'
  },
  {
    id: 3,
    img: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg',
    ma: 'dssdadsa',
    name: 'Nguyen'
  },
  {
    id: 4,
    img: 'https://cdn.alongwalk.info/vn/wp-content/uploads/2022/09/28150733/image-69-hinh-anh-gai-xinh-trung-quoc-hot-girl-trung-quoc-dep-nhat-2022-166432725338362.jpg',
    ma: 'dssdadsa',
    name: 'Nguyen'
},
]

const SuggestionPage = () => {
  return (
    <div className='wrap-flex'>
      <h1 className="title">Suggestion</h1>
      <SuggestionList listItem={list} />
    </div>
  )
};

export default SuggestionPage;
