import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import { fetchPost } from './components/PostAdapter';
import { connect } from 'react-redux';
import { fetchUser } from './redux/actions/UserActions'



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
    const { fetchUser } = this.props
    fetchUser(localStorage.token)

    this.theFetch("posts").then(data =>
      this.setState({ follooweePosts: data })
    );
  }

  render() {
    console.log("Home Page Props:", this.props)
    const { user } = this.props
    return (
      <>
        <HomeContainer
          fposts={this.state.follooweePosts}
          user={user.username}
          userId={user.id}
          history={this.props.history}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.login.token,
    user: state.users
  }
}



export default connect(mapStateToProps, { fetchUser })(Homepage)
