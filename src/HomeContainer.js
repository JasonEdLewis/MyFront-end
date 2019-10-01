import React from "react";
import "./components/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";

import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    id: "",
    comment: "",
    post_id: "",
    picture: "",
    caption: "",
    likes: 0,
    newPost: false
  };

  info = () => {
    console.log(this.props);
    return this.props;
  };
  // POST COMMENT FETCH POST
  postComment = (id, content, fId) => {
    return fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        post_id: id,
        content: content,
        followee_id: fId
      })
    });
  };

  // HANDLER FOR COMMENTS
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
        submitPost={() => this.submitNewPost(this.state.id)}
        state={this.state}
        userId={this.state.id}
      />
    );
  };

  pageToRender = () => {
    // debugger;
    // console.log(this.props)
    this.state.newPost
      ? this.theNewPostCard(this.props)
      : this.thePost(this.props);
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
    this.postComment(postId, this.state.comment, userId)
      .then(resp => resp.json())
      .then(console.log);
  };

  submitNewPost = id => {
    console.log(id);
    const postUlr = "http://localhost:3000/posts";
    console.log(
      "The state we are submitting",
      this.state.picture,
      this.state.caption,
      id
    );
    fetch(postUlr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: id,
        picture: this.state.picture,
        caption: this.state.caption,
        likes: 0
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          newPost: false
        });
      });
    // this.handleNewPostClick();
  };

  handleNewPost = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log("New Post Status", this.state.newPost);
    const { fposts, user, userId } = this.props;

    return (
      <div className="Home-Container">
        <div className="Home-Content">
          <div className="signindiv">
            <Navbar className="nav-main">
              <Navbar.Brand >
              <Nav.Item>
                  <h3>Jays'taGram </h3>
                  </Nav.Item>
                  <Nav.Item>
                  <Button
                      variant=""
                      className="camera-btn"
                      onClick={() => this.handleNewPostClick()}
                    >
                      <span className="logo" id={this.state.id}>
                        📸
                      </span>
                    </Button>
                    </Nav.Item>
                  <Nav.Item >
                  Welcome Back <a a href="/profile">{this.props.user}</a>
                  </Nav.Item>
             
              </Navbar.Brand>
              <Navbar.Toggle />
    
            </Navbar>
          </div>

          <div className="Home-main"></div>

          {this.state.newPost ? (
            <>
              <NewPostCard
                handleNewPost={this.handleNewPost}
                submitPost={() => this.submitNewPost(userId)}
                state={this.state}
                userId={userId}
              />
            </>
          ) : (
            <>
              <h2 style={{ color: "black" }}>What You missed 👇🏽</h2>
              {this.thePost()}
            </>
          )}
        </div>
        <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
      </div>
    );
  }
}

export default HomeContainer;
