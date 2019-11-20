import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions';
import './css/Profile.css';
import ProfilePostCard from './components/ProfilePostCard'

class Profile extends Component {
  state = {
    promiseReturned: false
  }


  postCard = () => {

    const { post, user } = this.props
    const id = 3
    const { pathname } = this.props.history.location
    let resultsArr = []
    const myPost = post.filter(p => {
      return p.user_id == id && resultsArr.push(p)
    }
    )
    console.log("My Post", myPost)
    return myPost.map(p => <PostCard post={p} user="Corey" id={id} path={pathname} />)

  };

  componentDidMount() {
    const { getPost, post } = this.props
    // getPost()

    post && this.setState({ promiseReturned: true })
    console.log("Promise ", this.state.promiseReturned)

  }


  render() {

    const { post, history } = this.props;
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
            <div className="friends">
              friends
            </div>

            <div className="cards-div">
                where cards will go
                
              <ProfilePostCard  post={post} user={user} />
              {/* {this.state.promiseReturned && this.postCard()} */}
            </div>

            <div className="non-friends">
              non-friends
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
    id: state.users.id
  }
}
export default connect(mapStateToProps, { getPost })(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
