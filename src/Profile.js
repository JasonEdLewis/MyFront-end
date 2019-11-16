import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import { connect } from 'react-redux';
import { getPost } from './redux/actions/PostActions';
import './css/Profile.css'

class Profile extends Component {
  state = {
    promiseReturned: false
  }


  postCard = () => {

    const { post, user } = this.props
    const id=3
    const { pathname } = this.props.history.location
    let resultsArr = []
    const myPost = post.filter(p => {
    return p.user_id == id && resultsArr.push(p)
   }
     )
     console.log("My Post",myPost)
      return myPost.map( p => <PostCard post={p} user="Corey" id={id} path={pathname} /> )

  };

  componentDidMount() {
    this.props.getPost().then(() => {
      this.setState({ promiseReturned: true })
      console.log("Promise returned")
    })
  }


  render() {

    const { user } = this.props;
    // const { pathname } = this.props.history.location
    // console.log("Pathname:", pathname);
    // this.props.history.location.pathname
    console.log("Profile props:", this.props)
    return (
      <div>
        <div className="main-div">
          <h1 className="header">{user}'taGram </h1>
          <button
            variant="outline-dark"
            onClick={() => this.props.history.push("/login")}
            className="logout-btn">
            logout
                </button >
          <span className="signed-in-as">Signed in as: {user}</span>
          <div>
          {this.state.promiseReturned && this.postCard()}
          </div>

        </div>
        
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post.post.data,
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
