import React from "react";
import Container from "./components/HomeContainer";
import PostCard from './components/PostCard'

class Homepage extends React.Component {
  state = {
    username: ""
  };

  componentDidMount() {
    // console.log(localStorage.token);
    fetch("http://localhost:3000/profile", {
      Headers: {
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(profile => console.log(profile));

    //   this.setState({ username: profile.username })
  }

  render() {
    return(
    <Container/>
    // return <p>{this.state.username}</p>;
    )
  }
}
export default Homepage;
