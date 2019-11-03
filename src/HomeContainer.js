import React from "react";
import "./components/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import {fetchPost, submitNewPost } from './components/PostAdapter';
import {postComment } from './components/CommentAdapter'


import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    id: this.props.userId,
    name: this.props.user,
    comment: "",
    post_id: "",
    Picture: "",
    caption: "",
    likes: 0,
    page:"thePost"
    
  };

  info = () => {
    console.log(this.props);
    return this.props;
  };

  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  thePost = props => {
    

    return this.props.fposts.map(post => (
      <Postcard
        post={post}
        id={post.id}
        submitComment={() => this.submitComment(post.id, post.userId)}
        handleComment={this.handleComment}
      />
    ));
  };

  // SUBMIT THE COMMENT /FETCH POST
  handleNewPostClick = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  theNewPostCard = props => {
    return (
      <NewPostCard
        handleNewPost={this.handleNewPost}
        submitPost={() => (this.state.id)}
        state={this.state}
        userId={this.state.id}

      />
    );
  };

  myProfile =() => {
    const myPost = this.props.fposts.filter(post => post.user_id === this.state.id);
    debugger
    return (
      <Postcard
        post={myPost}
        id={myPost.id}
        submitComment={() => this.submitComment(myPost.id, myPost.userId)}
        handleComment={this.handleComment}
        
      />
    );
  };
  // this.state.cameraClick ? NewPost() :

  submitComment = (postId, userId) => {
    console.log(
      "Post id",
      postId,
      "User is:",
      userId,
      "comment: ",
      this.state.comment
    );
    postComment(postId, this.state.comment, userId)
      .then(resp => resp.json())
      .then(console.log);
  };

  handleNewPost = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  pageToRender=()=>{
    switch(this.state.page){
      case "thePost":
        return this.thePost()
      case "newPost":
        return this.theNewPostCard()
      case "profile":
        return this.myProfile()
    }
  }
  logout=()=>{
    localStorage.clear()
    this.props.history.push('/')
  }


  render() {
    // debugger
    console.log("Home Container props", this.props);
    const { fposts, user, userId } = this.props;

    return (
      <div className="Home-Container">
        <div className="Home-Content">
          <div className="signindiv">
            <Navbar className="ml-auto">
              <Nav.Item>
                <h3>Jays'taGram </h3>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant=""
                  className="camera-btn"
                  onClick={() => this.setState({page:"newPost"})}
                >
                  <span className="logo" id={this.state.id}>
                    📸
                  </span>
                </Button>
              </Nav.Item>
              <Nav.Item>
                Welcome Back
                <span style={{ color: "blue" }} onClick={()=> this.setState({page:"profile"})}>{this.props.user}</span>
              </Nav.Item>
              <Nav.Item>
                <Button
                  variant="outline-dark"
                  onClick={this.logout}
                  className="ml-auto"
                >
                  logout
                </Button>
              </Nav.Item>
              <Navbar.Toggle />
            </Navbar>
          </div>

          <div className="Home-main"></div>

          { 
            this.pageToRender()   
              
          }
        </div>
        <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
      </div>
    );
  }
}

export default HomeContainer;

