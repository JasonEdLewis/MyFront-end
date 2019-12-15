import React from "react";
import { match } from 'react'
import "./css/HomeContainer.css";
import Postcard from "./components/PostCard";
import NewPostCard from "./components/NewPostCard";
import Follows from './components/Follows';
import { getFollows, createFollow, deleteFollow } from './redux/actions/FollowActions';
import { connect } from 'react-redux';
import { getPost, editCaption } from './redux/actions/PostActions';
import { fetchUser, fetchAllUsers } from './redux/actions/UserActions';
import { addComment, deleteComment } from './redux/actions/CommentsActions';
import { changeLike } from './redux/actions/PostActions';
import { logout, notRequesting } from './redux/actions/LoginActions';
import ProfileCard from './components/ProfilePostCard'
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
    likedPosts: [],
    postRecieveingComment: null,
    requesting: false,
    showingUserId: null,


  };

  componentDidMount() {

    console.log("HOME CONTAINER")
    const { history } = this.props

    !localStorage.token && history.push('/')

  }

  // COMMENTS //


  submitComment = (postId) => {
    const { userid, addComment, user, requestedPost } = this.props
    const { userId } = this.state
    const body = {
      post_id: postId,
      content: this.state.comment,
      followee_id: userid
    }
    addComment(body)
    debugger
    this.resetCommentLength()

  };


  postToCommentOn = (id) => {
    this.setState({ postRecieveingComment: id })
  }

  resetCommentLength = () => {
    this.setState({ comment: "", postRecieveingComment: null })
  }

  handleComment = e => {
    // console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  deleteComment = (com) => {
    const { deleteComment } = this.props

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

  handleLikes = (id, likes) => {
    const { likedPosts } = this.state
    if (likedPosts.includes(id)) {
      this.deleteLike(id, likes)
      const likesArr = likedPosts.filter(pId => pId !== id)
      this.setState({ likedPosts: likesArr })

    }
    else {
      this.addLike(id, likes)
      const newLikes = [...likedPosts, id]
      this.setState({ likedPosts: newLikes })
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
    const { posts, users, history } = this.props
    const { comment, showCommentField, editingCaption, likedPosts, postToCommentOn, postRecieveingComment } = this.state
    return posts && posts.length > 0 ? posts.map(post => (

      <Postcard
        users={users}
        post={post}
        history={history}
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
    const { showingUserId } = this.state
    switch (this.state.page) {
      case "thePost":
        return this.thePost()
      case "newPost":
        return this.theNewPostCard()
      case "profile":
        return this.myProfile()
      case "show one":
        return this.showOneUser(showingUserId)
    }
  }

  startShowingOneUser=(id)=>{
      this.setState( { showingUserId: id, page:"show one"})
  }
  showOneUser = (id) => {
    const { users, posts,name } = this.props
    const theId = users.find(user => user.id === id).id
    const userPost = posts.filter(post => post.user_id === theId)
  return this.showOneUsersPost(userPost)


  }
  showOneUsersPost=(post)=>{
    const { likedPosts, comment } = this.state
    const {name } = this.props
    debugger
    return post.map(p => <ProfileCard
      post={p}
      user={p.user_id}
      name={name}
      pic={p.pic}
      id={p.id}
      likedPosts={likedPosts}
      comment={comment}
    />
    )
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

  // FREINDS
  followeeIds = () => {
    // EVERYONE WHO IS FOLLOWED
    const foll = this.props.follows.map(f => f.followee_id)
    const followees = [...new Set(foll)] // deletes/ filters duplicates out of arrays
    return followees
  }
  theFollow = (ErId, EeId) => {

    return this.props.follows.find(f => f.follower_id === ErId && f.followee_id === EeId).id
  }
  whoImFollowing = () => {
    const { follows, userid, users } = this.props
    const peepsImFollowing = users.filter(u => follows.filter(f =>
      f.follower_id === userid && f.followee_id === u.id))
    return peepsImFollowing
  }
  whoImNotFollowing = () => {
    const { follows, userid, users } = this.props
    const peepsImFollowing = users.filter(u => follows.map(f =>
      f.follower_id !== userid && f.followee_id === u.id))
    return peepsImFollowing
  }

  friends = () => {
    const { follows, userid, users, deleteFollow } = this.props
    const friendsArr = follows.filter(f => f.follower_id === userid).map(f => f.followee_id)

    const theFriends = friendsArr.map(f => users.find(user => user.id === f))
 
    return (!theFriends[0] === undefined || theFriends.length > 0 ? theFriends.map(f => <div> <img src={f.picture} className="friends-or-not-image" onClick={() => {
      
      this.startShowingOneUser(f.id)
      }} /> <br /><span className="friends-or-not-name" id={f.id} onClick={() => deleteFollow(this.theFollow(userid, f.id))}>{`${f.username} 𝚡`}</span> </div>) : <div className="make-some-friends">
      <p > Welcome!!</p>
      <p> Make Some New Friends </p>
      <p>⬅️ ⬅️</p>
    </div>)

  }
  Suggestedfriends = () => {
    const { createFollow, userid, users, follows } = this.props
    const allButMe = users.filter(user => user.id !== userid)
    const nonfriendsArr = follows.filter(f => f.follower_id !== userid).map(f => f.followee_id)
    const friendsArr = follows.filter(f => f.follower_id === userid).map(f => f.followee_id)
    const usersSinFollowers = allButMe.filter(u => !this.followeeIds().includes(u.id))
    const nonFollowers = allButMe.filter(u => nonfriendsArr.includes(u.id) && !friendsArr.includes(u.id))
    const tempArr = [...nonFollowers, ...usersSinFollowers]
    const whoImNotFollowing = [...new Set(tempArr)]



    return whoImNotFollowing.map(f => <div> <img src={f.picture} className="friends-or-not-image" onClick={() => this.showOneUser(f.id)} /> <br /><span className="friends-or-not-name" onClick={() => createFollow(f.id, userid)} id={f.id}>{` ${f.username} ✓`}</span></div>)

  }

  render() {
    // debugger
    // console.log("Home Container props", this.props);

    const { fposts, user, userId, history, requestedLogin, picture } = this.props;
    const { requesting } = this.state
    this.theUsers()
    this.followeeIds()
    this.whoImFollowing()

    return (
      <div className="Home-Container">
        <Follows />
        <nav className="Homepage-nav">
          <ul>
            <li id="jays-gram" onClick={() => this.returnToThePost()}><span >{this.props.user}s'taGram </span>
              <p onClick={this.appLogout} className="logout" > logout  </p></li>

            <li>
              <p className="camera" id={this.state.id} onClick={() => this.setState({ page: "newPost" })}> 📸 </p>
            </li>


            <li className="thumbnail" onClick={() => this.setState({ page: "profile" })}><img src={picture} id='thumbnail' /> </li>

          </ul>
        </nav>

        <div className={!localStorage.token ? "loading " : "Home-Content"}>

          <div className="sugested-friends">
            <span className="friends-and-suggested-headers"> Suggested</span>
            {this.Suggestedfriends()}
          </div>

          <div className="friends">
            <span className="friends-and-suggested-headers">Friends</span>
            {this.friends()}
          </div>

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
    requestedLogin: state.login.requested,
    follows: state.follows.follows,
    name: state.users.usersObj,
  }
}

export default connect(mapStateToProps, { getFollows, getPost, fetchAllUsers, fetchUser, addComment, editCaption, changeLike, logout, notRequesting, deleteComment, createFollow, deleteFollow })(HomeContainer);


