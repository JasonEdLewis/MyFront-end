import React from "react";
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import Follows from './components/Follows';
import { getFollows } from './redux/actions/FollowActions';
import { connect } from 'react-redux';
import { getPost, editCaption } from './redux/actions/PostActions';
import { fetchUser, fetchAllUsers } from './redux/actions/UserActions';
import { addComment,deleteComment  } from './redux/actions/CommentsActions';
import { changeLike } from './redux/actions/PostActions';
import { logout, notRequesting } from './redux/actions/LoginActions';
import Loader from './components/loader';


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
    likedPosts: [],
    postRecieveingComment:null,
    requesting: false


  };

  componentDidMount() {

    console.log("HOME CONTAINER")
    const {  history } = this.props
   
    !localStorage.token && history.push('/')

  }

                              // COMMENTS //


  submitComment = (postId) => {
    const { userid, addComment, user, requestedPost } = this.props
    const { userId, comment } = this.state
    console.log(
      "Post_id",
      postId,
      "User is:",
      user,
      "comment: ",
      this.state.comment
    );
    const body = {
      post_id: postId,
      content: comment,
      followee_id: userid
    }
    addComment(body)
    !requestedPost && this.setState({ comment: " ", showCommentField: false })
  };


postToCommentOn=(id)=>{
this.setState( {postRecieveingComment: id })
}

  resetCommentLength = () => {
    this.setState({ comment: "",postRecieveingComment: null  })
  }

  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  deleteComment = (com) => {
    const {deleteComment  } = this.props
   
    // console.log(com.id, com.post_id, com.followee_id, com.content)
    deleteComment(com.id, com.post_id, com.followee_id, com.content)

  }
                            // EDIT CAPTION

  getCapField = () => {
    this.setState({ editingCaption: !this.state.editingCaption })
  }
  handleEditSubmit = (id) => {
    this.props.editCaption(id, this.state.comment)
    this.setState({ comment: "" })
    this.getCapField()
  }
  showCommentField = () => {
    return this.setState({ showCommentField: !this.state.showCommentField })
  }


                               // LIKES //

  handleLikes =(id,likes)=>{
    const {likedPosts } = this.state
    if(likedPosts.includes(id)){
      this.deleteLike(id, likes)
        const likesArr = likedPosts.filter(pId => pId !== id)
        this.setState( {likedPosts: likesArr } )

    }
    else {
      this.addLike(id, likes)
      const newLikes = [...likedPosts, id]
      this.setState( {likedPosts: newLikes } )
    }

  }

  addLike = (id, like) => {

    // this.setState({ liked: !this.state.liked })
    const numLikes = like + 1
    this.props.changeLike(id, numLikes, "add")
  }
  deleteLike = (id, like) => {
    // this.setState({ liked: !this.state.liked })
    const numLikes = like - 1
    this.props.changeLike(id, numLikes, "")
  }


                                  // POST STUFF  //


  thePost = () => {
    const { posts, users } = this.props
    const { comment, showCommentField, editingCaption, likedPosts, postToCommentOn,postRecieveingComment } = this.state
    return posts && posts.length > 0 ? posts.map(post => (

      <Postcard
        users={users}
        post={post}
        commentLen={comment.length}
        toggleCommentField={this.showCommentField}
        commentFieldStatus={showCommentField}
        yourField={postRecieveingComment}
        post2comment={this.postToCommentOn}
        id={post.id}
        resetComment={this.resetCommentLength}
        submitComment={() => this.submitComment(post.id, post.userId)}
        handleComment={this.handleComment}
        handleLikes={this.handleLikes}
        getCapEditField={this.getCapField}
        editCapStatus={editingCaption}
        submitCapEdit={this.handleEditSubmit}
        addLike={this.addLike}
        disLike={this.deleteLike}
        liked={likedPosts}
        commentors={this.theUsers}
        deleteComment={this.deleteComment}
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

  // LOGOUT //

  appLogout = () => {
    const { logout } = this.props
    logout()
    localStorage.clear()
    localStorage.length === 0 && this.returnToLogoutPage()

  }

  returnToLogoutPage = () => {
    const { requestedLogin, logout } = this.props
    logout()
    this.props.history.push('/')
  }
  theUsers = () => {
    const { users } = this.props
    const commentor = {}
    if (!!users) {
      this.props.users.forEach(user => commentor[user.id] = user.username)
      return commentor
    }
  }

  render() {
    // debugger
    console.log("Home Container props", this.props);

    const { fposts, user, userId, history, requestedLogin, picture } = this.props;
    const { requesting } = this.state
    this.theUsers()

    return (
      <div className="Home-Container">
        <Follows />
        <div className="Homepage-nav">

          <div id="jays-gram" onClick={() => this.returnToThePost()}><span >{this.props.user}s'taGram </span></div>

          <div>
            <p className="camera" id={this.state.id} onClick={() => this.setState({ page: "newPost" })}> 📸 </p>
          </div>

          <div className="thumb-and-button">
            <div className="thumbnail" onClick={() => this.setState({ page: "profile" })}><img src={picture} id='thumbnail' /> </div>
            <div className="logout"><p onClick={this.appLogout} id="logout-button" > logout  </p></div>



          </div>


        </div>

        <div className={!localStorage.token ? "loading " : "Home-Content"}>
          {}
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
    picture: state.users.picture,
    users: state.users.all,
    posts: state.post.posts,
    requestedPost: state.post.requested,
    requestedLogin: state.login.requested
  }
}

export default connect(mapStateToProps, { getFollows, getPost, fetchAllUsers, fetchUser, addComment, editCaption, changeLike, logout, notRequesting,deleteComment  })(HomeContainer);


