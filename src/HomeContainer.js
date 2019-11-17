import React from "react";
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import Follows from './components/Follows';
import Jack from "./img/jack.jpg";
import { connect } from 'react-redux';
import { getPost, editCaption } from './redux/actions/PostActions';
import { fetchUser } from './redux/actions/UserActions';
import { addComment } from './redux/actions/CommentsActions'
import { addLike } from './redux/actions/PostActions'
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
    page: "thePost",
    editingCaption: false,
    liked: false

  };

  componentDidMount() {
    console.log("Home Page CONTAINER MOUNTED")
    const { fetchUser, getPost } = this.props
    fetchUser(localStorage.token)
    getPost()

  }

  // COMMENTS //
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

  resetCommentLength = () => {
    this.setState({comment: ""})
  }
  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };
// EDIT CAPTION

   getCapField=()=>{
    this.setState( {editingCaption: !this.state.editingCaption} )
  }
  handleEditSubmit=(id)=>{
    this.props.editCaption(id,this.state.comment)
    this.setState( { comment:""} )
    this.getCapField()
  }
  showCommentField = () => {
    return this.setState({ showCommentField: !this.state.showCommentField })
  }
addLike = (id, like)=>{
  this.setState({ liked: !this.state.liked})
  const numLikes = like + 1
  this.props.addLike(id,numLikes)
}


// POST STUFF 

  thePost = () => {
    const { posts } = this.props
    const { comment, showCommentField,editingCaption, liked  } = this.state
    return posts && posts.length > 0 ? posts.map(post => (
      <Postcard
        post={post}
        commentLen={comment.length}
        toggleCommentField={this.showCommentField}
        commentFieldStatus={showCommentField}
        id={post.id}
        resetComment={this.resetCommentLength}
        submitComment={() => this.submitComment(post.id, post.userId)}
        handleComment={this.handleComment}
        getCapEditField={this.getCapField}
        editCapStatus={editingCaption}
        submitCapEdit={this.handleEditSubmit}
        addLike={this.addLike}
        liked={liked}
      />
    )) : console.log("The Post didnt work, here are the props:", this.props)
  };



  // NEW POST STUFF 
  // SUBMIT THE COMMENT /FETCH POST
  handleNewPostClick = () => {
    this.setState({ newPost: !this.state.newPost });
  };

  theNewPostCard = props => {
    const { userid } = this.props
    return (
      <NewPostCard
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
    // console.log("Home Container props", this.props);

    const { fposts, user, userId, history } = this.props;

    return (
      <div className="Home-Container">
        <Follows/>
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
    posts: state.post.posts,
    postRequested: state.post.requested
  }
}

export default connect(mapStateToProps, { getPost, fetchUser, addComment,editCaption, addLike })(HomeContainer);

