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

  theFetch = async way => {
    let url;
    way
      ? (url = `http://localhost:3000/${way}`)
      : (url = "http://localhost:3000/");
    const resp = await fetch(url);
    return await resp.json();
  };
  componentDidMount() {
    const { fetchUser, getPost } = this.props
    fetchUser(localStorage.token)
    getPost()
   
  }

  render() {
    console.log("Home Page Props:", this.props)
    const { user, post } = this.props
    return (
      <>
      {post.request && <Loader/>}
        <HomeContainer
          fposts={this.state.follooweePosts}
          history={this.props.history}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.login.token,
    user: state.users,
    post: state.post.data
  }
}



export default connect(mapStateToProps, { fetchUser, getPost  })(Homepage)
