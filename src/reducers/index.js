import {combineReducers} from 'redux';
import userProfile from './profile';
import allUsersPost from './post';

export default combineReducers({
  userProfile,
  allUsersPost,
});
