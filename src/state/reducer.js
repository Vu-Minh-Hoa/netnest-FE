import { combineReducers } from 'redux';

import account from './account';
import app from './app';
import page from './page';

const rootReducer = combineReducers({
    app,
    page,
    account,
});

export default rootReducer;
