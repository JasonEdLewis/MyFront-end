import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import { connect } from 'react-redux';
import { getPost, changeLike } from './redux/actions/PostActions';
import './css/Profile.css';
import ProfilePostCard from './components/ProfilePostCard'

class Profile extends Component {
  state = {
    promiseReturned: false,
    likedPosts: [],
    comment: "",
  }


  handleLike = (id, likes) => {
    const { likedPosts } = this.state
    const { changeLike } = this.props
    if (likedPosts.includes(id)) {
      changeLike(id, likes, '')
      const newArr = likedPosts.filter(pId => pId !== id)
      this.setState({ likedPosts: newArr })

    }
    else {
      changeLike(id, likes, 'add')
      const newArr = [...this.state.likedPosts, id]
      this.setState({ likedPosts: newArr })
    }

  }

  postCard = () => {
    const { comment } = this.state
    const { post, user, id,pic,name } = this.props

    const { pathname } = this.props.history.location
    let resultsArr = []
    const myPost = post.filter(p => p.user_id == id)
    console.log("My Post", myPost)
    return myPost.map(p => <ProfilePostCard
      post={p}
      user={user}
      name={name}
      pic={pic}
      id={id}
      path={pathname}
      handleComment={this.handleComment}
      comment={comment}
      handleLike={this.handleLike}
      likedPosts={this.state.likedPosts}
    />)


  };

  componentDidMount() {
    const { getPost, post, changeLike } = this.props
    getPost()

    post && this.setState({ promiseReturned: true })
    console.log("Promise ", this.state.promiseReturned)

  }
  handleComment = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  render() {

    const { post, history,pic } = this.props;
    const user = localStorage.currentUser
    // const { pathname } = this.props.history.location
    // console.log("Pathname:", pathname);
    // this.props.history.location.pathname

    console.log("Profile props:", this.props)
    return (
      <div>
        <div class="parent">

          <div className="nav-div">
            <span className="user-gram" onClick={() => history.push('/home')}>{user}'taGram </span>
            <span className="camera" id={this.state.id} onClick={() => history.push('/home')}> 📸 </span>
            <button
              className="logout-btn"
              variant="outline-dark"
              onClick={() => this.props.history.push("/login")}
            >
              logout
                </button >
            <span className="dots-edit-profile" onClick={(e) => console.log(e.target.className)}>. . .</span>
          </div>
          <div className="profile-section">
            <h3 style={{color:"red", fontFamily:"cursive"}}><strong>{user}</strong></h3>
            <img src={pic} className="profile-pic"/>
            <div>
          <p style={{color:"red", fontFamily:"cursive"}}> Hi! Im {user} and I'm from {user.city}</p>
          </div>
            </div>

          <div className="post-cards-div">


            {/* <ProfilePostCard  post={post} user={user} /> */}
            {this.state.promiseReturned && this.postCard()}
          </div>

          <div className="non-friends">
            
            </div>

        </div>
      </div>




    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post.posts,
    user: state.users.username,
    pic: state.users.picture,
    id: state.users.id,
    users: state.users.all,
    name: state.users.usersObj
  }
}
export default connect(mapStateToProps, { getPost, changeLike })(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
