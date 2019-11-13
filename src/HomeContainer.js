import React from "react";
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import { fetchPost, submitNewPost } from './components/PostAdapter';
import { postComment } from './components/CommentAdapter';
import { Image } from 'react-bootstrap';
import Jack from "./img/jack.jpg";


import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    id: "",
    name: this.props.user,
    comment: "",
    post_id: "",
    Picture: "",
    caption: "",
    likes: 0,
    page: "thePost"

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
        back={this.returnToThePost}

      />
    );
  };

  myProfile = () => {
    // debugger
    const { fposts, userId, history } = this.props
    // this.setState({ page: "profile" })
    const myPost = fposts.filter(post => post.user_id === userId);

    return ( history.push('/profile'),
      <Postcard
        post={myPost}
        // id={myPost.id}
        submitComment={() => this.submitComment(myPost.id, myPost.userId)}
        handleComment={this.handleComment}

      />
      
      
    );
   
  };
  // this.state.cameraClick ? NewPost() :

  returnToThePost = () => {
    this.setState({ page: "thePost" })
  }
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

  pageToRender = () => {

    switch (this.state.page) {
      case "thePost":
        return this.thePost()
      case "newPost":
        return this.theNewPostCard()
      case "profile":
        return this.myProfile()
    }
  }
  logout = () => {
    localStorage.clear()
    this.props.history.push('/')
  }


  render() {
    // debugger
    console.log("Home Container props", this.props);
    const { fposts, user, userId, history } = this.props;

    return (
      <div className="Home-Container">
        <div className="Homepage-nav">

          <div id="jays-gram" onClick={() => this.returnToThePost()}><span >{this.props.user}s'taGram </span></div>

          <div>
            <span className="camera" id={this.state.id} onClick={() => this.setState({ page: "newPost" })}> 📸 </span>
          </div>


          <div className="thumb-and-button">
            <div className="thumbnail" onClick={() => this.setState({ page: "profile" })}><img src={Jack} id='thumbnail' /> </div>
            <div className="logout"><button onClick={this.logout} id="logout-button" > logout  </button></div>



          </div>


        </div>
        <div className="Home-Content">

          {this.pageToRender()}
          {this.state.page !== "newPost" ? <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div> : <></>}
        </div>
      </div>



    );
  }
}

export default HomeContainer;

