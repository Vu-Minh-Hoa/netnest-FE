import React from 'react';
import { FOLLOWED_LIST, POST_LIST, SUGGESTION_LIST } from '../../contants/mock';
import SuggestionList from '../../components/suggestion/suggestionList/SuggestionList';
import './home.scss';
import FollowedList from '../../components/followed/followed';
import PostList from '../../components/postList/postList';
const HomePage = () => {
  if (false) {
    return (
      <div className='homePage-suggestion'>
        <div className='homePage-suggestion-content'>
          <span>Suggested for you</span>
          <SuggestionList listItem={SUGGESTION_LIST} />
        </div>
      </div>
    );
  } else {
    return (
      <div className='homePage-suggestion'>
        <div className='homePage-suggestion-content'>
          <FollowedList listUser={FOLLOWED_LIST} />
          <PostList postList={POST_LIST} />
        </div>
      </div>
    );
  }
};

export default HomePage;
