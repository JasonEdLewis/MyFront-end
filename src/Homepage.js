import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import Fragment from "react";
import PostPage from "./PostPage"


class Homepage extends React.Component {
  state = {
    currentUser: "",
    id: "",
    follooweePosts: []
  };

  theFetch = way => {
    let url;
    way
      ? (url = `http://localhost:3000/${way}`)
      : (url = "http://localhost:3000/");
    return fetch(url).then(resp => resp.json());
  };
  componentDidMount() {
    // this.theFetch('profile')
    console.log("Home page: ", localStorage.token);
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(profile => {
        this.setState({ currentUser: profile.username, id: profile.id });
        console.log("Current User: ", this.state.currentUser);
      });

    this.theFetch("posts").then(data =>
      this.setState({ follooweePosts: data })
    );
  }

  // postComment=(id,content,fId)=>{
  //   fetch('http://localhost:3000/comments', {
  //       method: 'POST',
  //       headers:{
  //         'Content-Type': 'Application/json'
  //       },
  //       body :JSON.stringify({
  //           id,
  //           content,
  //           fId,
  //       })

  //   })
  // }

  render() {
    // console.log(this.state)
    return (
      <>
        <HomeContainer
          fposts={this.state.follooweePosts}
          user={this.state.currentUser}
          userId={this.state.id}
        />
      </>
    );
  }
}
export default Homepage;
