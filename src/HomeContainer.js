import React from "react";
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import Jack from "./img/jack.jpg";
import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions';
import { fetchUser } from './redux/actions/UserActions';
import { addComment } from './redux/actions/CommentsActions'
import Loader from './components/loader'


import { Card, Form, Navbar, Button, NavbarBrand, Nav } from "react-bootstrap";

class HomeContainer extends React.Component {
  state = {
    showCommentField: false,
    comment: "",
    post_id: "",
    Picture: "",
    caption: "",
    likes: 0,
    page: "thePost"

  };

  componentDidMount() {
    console.log("Home Page CONTAINER MOUNTED")
    const { fetchUser, getPost } = this.props
    fetchUser(localStorage.token)
    getPost()

  }
  resetCommentLength = () => {
    this.setState({comment: ""})
  }
  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  showCommentField = () => {
    return this.setState({ showCommentField: !this.state.showCommentField })
  }
  thePost = () => {
    const { posts } = this.props
    return posts && posts.length > 0 ? posts.map(post => (
      <Postcard
        post={post}
        commentLen={this.state.comment.length}
        toggleCommentField={this.showCommentField}
        commentFieldStatus={this.state.showCommentField}
        id={post.id}
        resetComment={this.resetCommentLength}
        submitComment={() => this.submitComment(post.id, post.userId)}
        handleComment={this.handleComment}
      />
    )) : console.log("The Post didnt work, here are the props:", this.props)
  };

  // SUBMIT THE COMMENT /FETCH POST
  handleNewPostClick = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  theNewPostCard = props => {
    const { userid } = this.props
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
    this.props.history.push('/profile')

  };


  returnToThePost = () => {
    this.setState({ page: "thePost" })
  }
  submitComment = (postId) => {
    const { userid, addComment } = this.props
    const { userId, comment } = this.state
    console.log(
      "Post id",
      postId,
      "User is:",
      userId,
      "comment: ",
      this.state.comment
    );
    const body = {
      post_id: postId,
      content: comment,
      followee_id: userid
    }
    addComment(body)
    this.setState({ comment: " " })
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
          {this.props.postRequest && <Loader />}
          {this.pageToRender()}
          {this.state.page !== "newPost" ? <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div> : <></>}
        </div>
      </div>



    );
  }

}
const mapStateToProps = (state) => {
  return {
    user: state.users.username,
    userid: state.users.id,
    posts: state.post.posts.data,
    postRequested: state.post.requested
  }
}

export default connect(mapStateToProps, { getPost, fetchUser, addComment })(HomeContainer);

