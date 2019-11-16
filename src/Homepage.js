import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import { getPost } from './redux/actions/PostActions'
import { connect } from 'react-redux';
import { fetchUser } from './redux/actions/UserActions';
import Loader from './components/loader'



class Homepage extends React.Component {
  state = {
    follooweePosts: []
  };

  componentDidMount() {
    debugger
    const { fetchUser, getPost } = this.props
    fetchUser(localStorage.token)
    getPost()

  }

  render() {
    console.log("Home Page Props:", this.props)
    const { user, post } = this.props
    return (
      <>
        {/* {post.request && <Loader />} */}
        <HomeContainer
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.users,
    post: state.post
  }
}



export default connect(mapStateToProps, { fetchUser, getPost })(Homepage)
