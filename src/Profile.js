import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import Loader from './components/loader';
import { connect } from 'react-redux';
import { getPost, changeLike, deletePost } from './redux/actions/PostActions';
import { deleteUser, editUser } from './redux/actions/UserActions'
import './css/Profile.css';
import { storage } from './firebase/index';
import placepic from './img/placeHolder.png';
import ProfilePostCard from './components/ProfilePostCard';


class Profile extends Component {

  state = {
    promiseReturned: false,
    likedPosts: [],
    show_x: false,
    comment: "",
    postToComment: null,
    postToDelete: null,
    deleteAccountRequested: null,
    edit: false,
    file: "",
    username: "" || this.props.user,
    picture: "" || this.props.pic,
    email: "" || this.props.email,
    state: "" || this.props.state,
    city: "" || this.props.city,
    bio: "" || this.props.bio,
    zip: "" || this.props.zip,
    dotsClicked: false,
    editCaption: false,
    captionId: null


  }
  componentDidMount() {

    !localStorage.token && this.props.history.push('/')
    const { getPost, post } = this.props
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
  editCapInput = (cap) => {

    return <input type='text' value={this.props.comment} onChange={this.props.handleComment} placeholder={` ${cap}`} id="edit-caption-input" name="comment" />
  }
  postCard = () => {
    const { comment, edit, show_x, postToComment, postToDelete, editCaption, captionId } = this.state
    const { post, user, id, pic, name } = this.props

    const { pathname } = this.props.history.location

    const myPost = post.filter(p => p.user_id == id)

    return myPost.map(p => <ProfilePostCard
      post={p}
      user={user}
      name={name}
      pic={pic}
      id={id}
      path={pathname}
      post2Comment={this.postToCommentOn}
      postCommId={postToComment}
      handleComment={this.handleComment}
      comment={comment}
      handleLike={this.handleLike}
      likedPosts={this.state.likedPosts}
      show_x={show_x}
      setId={this.setIdForPostToBeDeleted}
      activate_Delete={this.showDelete_x}
      postToDelete={postToDelete}
      deletePost={this.deletePost}
      needEditCaption={this.needEditCaption}
      editCaption={editCaption}
      capId={captionId}

    />)


  };
  postToCommentOn = (id) => {
    this.setState({ postToComment: id })
  }
  handleComment = (e, id) => {
    this.postToCommentOn(id)
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
  showDelete_x = () => {
    this.setState({ show_x: !this.state.show_x })
  }
  setIdForPostToBeDeleted = (id) => {
    this.setState({ postToDelete: id })
    this.showDelete_x()
    console.log(this.state.postToDelete)

  }
  resetDeleting = () => {
    this.setState({ postToDelete: null, show_x: false })
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
  needEditCaption = (id) => {
    this.setState({ editCaption: !this.state.editCaption, captionId: id})
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
            this.setState({ picture: url })

          })
        })

    };

  }
  submitEdit = (e) => {
    e.preventDefault()
    const { id, editUser } = this.props
    const { username, picture, email, state, city, bio } = this.state
    const info = { username, picture, email, state, city, bio }
    editUser(id, info).then(() => {
      this.setState({ edit: false })
    })

  }

  editForm = () => {
    const { history, pic, bio, state, user, city, email, zip, id } = this.props;


    return (<>
      <p>Edit Profile Details </p>
      <img src={!!this.state.picture ? this.state.picture : pic} className="profile-pic" />
      <div onClick={() => this.fileInput.click()} className="update-pic-div" >
        update pic
          </div>
      <form className="edit-profile-form">
        <input value={this.state.username} type="text" onChange={this.handleEdit} name="username" placeholder={user} />

        <input name="email" value={this.state.email} onChange={this.handleEdit} placeholder={email} />
        <input name="city" value={this.state.city} onChange={this.handleEdit} placeholder={`City: ex.  ${city}`} />
        <input type="text" name="state" value={this.state.state} onChange={this.handleEdit} placeholder={`State: ex. ${state}`} />
        <input name="zip" value={this.state.zip} onChange={this.handleEdit} placeholder={`zip: ex. ${zip ? zip : '12345'}`} />
        <br />
        <textarea rows="12" cols="20" value={this.state.bio} type="text" onChange={this.handleEdit} name="bio" placeholder={bio} className="edit-bio" />

        <input type="file" ref={fileInput => this.fileInput = fileInput} onChange={(e) => this.selectedFileHander(e)} style={{ display: "none" }} />



        <input type="submit" onClick={this.submitEdit} />
        <br />
        <button className="cancel-in-edit-btn" onClick={() => {
          this.setState({ edit: false })
          this.state.dotsClicked && this.setState({ dotsClicked: false })
        }
        } >Cancel</button>
      </form>
    </>
    )
  }

  deletePost = (id) => {
    this.props.deletePost(id)
  }

  showLogoutEditDelete = () => {
    this.setState({ dotsClicked: !this.state.dotsClicked })
  }
  render() {

    const { history, pic, city, bio, state, requested } = this.props;
    const { deleteAccountRequested, edit, dotsClicked } = this.state
    const dlt = deleteAccountRequested
    const user = localStorage.currentUser

    // const { pathname } = this.props.history.location
    // console.log("Pathname:", pathname);
    // this.props.history.location.pathname




    console.log("Profile Props:", this.props)
    return (
      <div>

        <div class={dlt ? " parent delete-requested" : "parent"} onClick={(e) => {
          if ((e.target.className === "parent delete-requested" || "parent" || "profile-off-heart" || "delete-post-x") && e.target.className !== "dots-edit-profile") {
            this.setState({ dotsClicked: false })
          }
        }
        }>

          <div className="nav-div">
            <span className="user-gram" onClick={() => history.push('/home')}>{user}'taGram </span>
            <span className="camera" id={this.state.id} onClick={() => history.push('/home')}> 📸 </span>
            {dotsClicked ?
              <ul className="profile-edit-delete-logout-ul">
                <li onClick={() => this.needEdit()}>Edit Profile</li>
                <li onClick={this.preDelete}>Delete Profile</li>
                <li onClick={() => {
                  localStorage.clear()
                  this.props.history.push('/')

                }}>Logout</li>
                <li onClick={() => {
                  this.setState({ edit: false, dotsClicked: false })
                }}>Cancel</li>
              </ul>
              : <span className="dots-edit-profile" onClick={() => this.setState({ dotsClicked: !this.state.dotsClicked })}>. . .</span>}

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
    zip: state.users.zip,
    users: state.users.all,
    name: state.users.usersObj,
    requested: state.users.requested
  }
}
export default connect(mapStateToProps, { getPost, changeLike, deleteUser, editUser, deletePost })(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
