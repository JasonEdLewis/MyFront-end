import { combineReducers } from 'redux';
import post from './PostReducer';
import login from './LoginReducer';
import comments from './CommentsReducer';
import users from './UserReducer';
import follows from './FollowReducer';


export default combineReducers({
    post, login, comments, users, follows
})