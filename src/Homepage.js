import React from "react";
import Container from "./components/HomeContainer";
import PostCard from './components/PostCard'

class Homepage extends React.Component {
  state = {
    username: "",
    posts: []
  };


  
  componentDidMount() {

     return fetch('http://localhost:3000/posts')
            .then(resp => resp.json())
            .then(data => this.setState({posts: data}))

  
    // console.log(localStorage.token);
    // fetch("http://localhost:3000/profile", {
    //   Headers: {
    //     Authorization: localStorage.token
    //   }
    // })
    //   .then(res => res.json())
    //   .then(profile => console.log(profile));

    //   this.setState({ username: profile.username })
  }

  // loadFolloweesPost=()=>{
  //   return this.theFetch('post')
  // }

  render() {
    // console.log(this.state)
    return(
      // <PostCard/>
    <Container posts={this.state.posts}/>
    // return <p>{this.state.username}</p>;
    )
  }
}
export default Homepage;
