import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import Loader from './components/loader';
import { connect } from 'react-redux';
import { getPost, changeLike } from './redux/actions/PostActions';
import { deleteUser, editUser } from './redux/actions/UserActions'
import './css/Profile.css';
import { storage } from './firebase/index';
import placepic from './img/placeHolder.png';
import ProfilePostCard from './components/ProfilePostCard';


class Profile extends Component {
  state = {
    promiseReturned: false,
    likedPosts: [],
    comment: "",
    deleteAccountRequested: null,
    edit: true,
    file: "",
    username: "",
    picture: "",
    email: "",
    state: "",
    city: "",
    bio: ""


  }
  componentDidMount() {

    !localStorage.token && this.props.history.push('/')
    const { getPost, post, changeLike } = this.props
    getPost()

    post && this.setState({ promiseReturned: true })

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
    const { comment, edit } = this.state
    const { post, user, id, pic, name } = this.props

    const { pathname } = this.props.history.location
    let resultsArr = []
    const myPost = post.filter(p => p.user_id == id)

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

  handleComment = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  preDelete = () => {
    this.setState({ deleteAccountRequested: true })
  }
  deleteProfile = (id) => {
    localStorage.clear()
    const { deleteUser, history } = this.props
    this.setState({ deleteAccountRequested: false })
    deleteUser(id)
      .then(() => {
        localStorage.clear()
        history.push('/')
      }
      )
  }
  confirmDelete = () => {
    const { id, pic } = this.props
    return <div className="confirm-delete-div">
      <p>Are you sure you want to delete your account?</p>
      {pic && <><img src={pic} className="pic-in-delete-option" /><br /></>}
      <button className="yes-btn" onClick={() => this.deleteProfile(id)}>Yes</button>
      <button className="no-btn" onClick={() => this.setState({ deleteAccountRequested: false })}>No</button>
    </div>
  }
  needEdit = () => {
    this.setState({ edit: !this.state.edit })
  }


  handleEdit = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  selectedFileHander = (e) => {
    const image = e.target.files[0]
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on('state_changed', (snapshot) => {

      },
        (error) => {
          console.log(error);

        },
        () => {
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({
              ...this.state,
              picture: url

            })

          })
        })

    };

  }
  submitEdit = () => {
    const { id, editUser } = this.props
    const { username, picture, email, state, city, bio } = this.state
    const info = { username, picture, email, state, city, bio }
    editUser(id, info)

  }

  editForm = () => {
    const { history, pic, bio, state, user, city, email, zip, id } = this.props;


    return (<>
      <p>Edit Profile Details </p>
      <form className="edit-profile-form">
        <input value={this.state.username} type="text" onChange={this.handleEdit} name="username" placeholder={user} />

        <input name="email" value={this.state.email} onChange={this.handleEdit} placeholder={email} />
        <input name="city" value={this.state.city} onChange={this.handleEdit} placeholder={`City: ex.  ${city}`} />
        <input type="text" name="state" value={this.state.state} onChange={this.handleEdit} placeholder={`State: ex. ${state}`} />
        <input name="zip" value={this.state.zip} onChange={this.handleEdit} placeholder={`zip: ex. ${zip ? zip : '12345'}`} />
        <br />
        <textarea rows="12" cols="20" value={this.state.bio} type="text" onChange={this.handleEdit} name="bio" placeholder={bio} className="edit-bio" />

        <input type="file" ref={fileInput => this.fileInput = fileInput} onChange={(e) => this.selectedFileHander(e)} style={{ display: "none" }} />

        <div onClick={() => this.fileInput.click()} className="update-pic-div" >
          update pic
          </div>

        <input type="submit" onClick={this.submitEdit} />
      </form>
    </>
    )
  }




  render() {

    const { history, pic, city, bio, state, requested } = this.props;
    const { deleteAccountRequested, edit } = this.state
    const dlt = deleteAccountRequested
    const user = localStorage.currentUser

    // const { pathname } = this.props.history.location
    // console.log("Pathname:", pathname);
    // this.props.history.location.pathname

    console.log("Profile state:", this.state)
    return (
      <div>

        <div class={dlt ? " parent delete-requested" : "parent"}>

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
            {!edit &&
              <> <h3 className="hi-im"><strong>Hi I'm {user}</strong></h3>
                <img src={pic} className="profile-pic" />


                <div>
                  <p className="bio"><strong>Bio:</strong> {bio}</p>
                  <p><strong className="location">Location:</strong></p>
                  <p className="city-state"><strong></strong> {city}, {state}</p>



                </div>
              </>
            }
            {edit && this.editForm()}
            <span className={edit ? " live" : "edit-profile-text"} onClick={() => this.needEdit()}>Edit Profile</span>
          </div>



          <div className="post-cards-div">


            {/* <ProfilePostCard  post={post} user={user} /> */}
            {this.state.promiseReturned && this.postCard()}
          </div>

          <div className="non-friends">

          </div>

        </div>


        <div>
          {dlt && requested && <Loader />}

          {dlt && this.confirmDelete()}
          {!edit && <span onClick={this.preDelete} className={dlt ? "dont-show-delete" : "delete-profile-text"}>Delete Profile</span>}
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
    bio: state.users.bio,
    email: state.users.email,
    city: state.users.city,
    state: state.users.state,
    users: state.users.all,
    name: state.users.usersObj,
    requested: state.users.requested
  }
}
export default connect(mapStateToProps, { getPost, changeLike, deleteUser, editUser })(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
