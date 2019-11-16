import React from "react";
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import { fetchPost, submitNewPost } from './components/PostAdapter';
import { postComment } from './components/CommentAdapter';
import { Image } from 'react-bootstrap';
import Jack from "./img/jack.jpg";
import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions'


import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    userId: this.props.userid,
    name: this.props.user,
    showCommentField: false,
    comment: "",
    post_id: "",
    Picture: "",
    caption: "",
    likes: 0,
    page: "thePost",
    postLoaded: false
    

  };

  componentDidMount() {
    // this.props.getPost().then(()=> {
    //   this.setState( { postLoaded: true})
    // }
    // )
    
  }

  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
showCommentField=()=>{
  return this.setState({showCommentField: !this.state.showCommentField})
}
  thePost = () => {
    debugger
    const { post } = this.props
    return post.map(post => (
      <Postcard
        post={post}
        commentLen={this.state.comment.length}
        toggleCommentField={this.showCommentField}
        commentFieldStatus={this.state.showCommentField}
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
    const {userid } = this.props
    return (
      <NewPostCard
        handleNewPost={this.handleNewPost}
        submitPost={() => (userid)}
        state={this.state}
        userId={userid}
        back={this.returnToThePost}

      />
    );
  };

  myProfile = () => {
    debugger
    const { fposts, userid, history } = this.props
   
    return ( history.push('/profile')
     
      
    );
   
  };
 

  returnToThePost = () => {
    this.setState({ page: "thePost" })
  }
  submitComment = (postId) => {
    const {userId ,comment } = this.state
    console.log(
      "Post id",
      postId,
      "User is:",
      userId,
      "comment: ",
      this.state.comment
    );
    postComment(postId, comment, userId)
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
            <div className="logout"><span onClick={this.logout} id="logout-button" > logout  </span></div>



          </div>


        </div>
        <div className="Home-Content">

          {this.state.postLoaded &&  this.pageToRender()}
          {this.state.page !== "newPost" ? <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div> : <></>}
        </div>
      </div>



    );
  }
 
}
const mapStateToProps = (state)=>{
  return {
    user: state.users.username,
    userid: state.users.id,
    posts: post.data
  }
}

export default connect(mapStateToProps, { getPost })(HomeContainer);

