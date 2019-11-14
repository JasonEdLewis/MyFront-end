import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import { fetchPost } from './components/PostAdapter';
import { connect }  from 'react-redux'



class Homepage extends React.Component {
  state = {
    currentUser: "",
    id: "",
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
   
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(profile => {
        this.setState({ currentUser: profile.username, id: profile.id });

      });

    this.theFetch("posts").then(data =>
      this.setState({ follooweePosts: data })
    );
  }

  render() {
    console.log("Home Page Props:", this.props)
    return (
      <>
        <HomeContainer
          fposts={this.state.follooweePosts}
          user={this.state.currentUser}
          userId={this.state.id}
          history={this.props.history}
        />
      </>
    );
  }
}
  const mapStateToProps = state => {
    return {
        token: state.login.token
    }
  }

 

export default connect(mapStateToProps)(Homepage)
