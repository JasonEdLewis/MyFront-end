import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import Fragment from "react";
import {fetchPost } from './components/PostAdapter'


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
    // this.theFetch('profile')
    // console.log("Home page: ", localStorage.token);
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
export default Homepage;
