import {combineReducers} from 'redux';
import userProfile from './profile';
import allUsersPost from './post';
import catList from './category';

export default combineReducers({
  userProfile,
  allUsersPost,
  catList,
});
