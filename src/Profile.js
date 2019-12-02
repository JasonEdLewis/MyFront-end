import React, { Component } from "react";
import { Navbar, Button, Card } from "react-bootstrap";
import PostCard from "./components/PostCard";
import Loader from './components/loader';
import { connect } from 'react-redux';
import { getPost, changeLike } from './redux/actions/PostActions';
import { deleteUser, editUser } from './redux/actions/UserActions' 
import './css/Profile.css';
import ProfilePostCard from './components/ProfilePostCard'

class Profile extends Component {
  state = {
    promiseReturned: false,
    likedPosts: [],
    comment: "",
    deleteAccountRequested: null,
    edit:true,

  }
componentDidMount() {

  !localStorage.token && this.props.history.push('/')
  const { getPost, post, changeLike } = this.props
  getPost()

  post && this.setState({ promiseReturned: true })
  console.log("Promise ", this.state.promiseReturned)
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
    const { comment,edit } = this.state
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

  handleComment = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  preDelete=()=>{
    this.setState( {deleteAccountRequested: true } )
  }
  deleteProfile=(id)=>{
    localStorage.clear()
    const { deleteUser, history } = this.props
    this.setState( {deleteAccountRequested: false } )
    deleteUser(id)
     .then(()=> {localStorage.clear()
      history.push('/')
     }
     )
  }
confirmDelete=()=>{
  const {id,pic } = this.props
  return <div className="confirm-delete-div">
    <p>Are you sure you want to delete your account?</p>
    {pic && <><img src={pic} className="pic-in-delete-option"/><br/></>}
    <button className="yes-btn" onClick={()=> this.deleteProfile(id)}>Yes</button>
    <button className="no-btn" onClick={()=> this.setState( { deleteAccountRequested:false } )}>No</button>
  </div>
}
needEdit =()=>{
  this.setState({ edit: !this.state.edit})
}

editForm =()=>{
  const { history,pic,bio, state, user, city,email,zip,id} = this.props;
  return  (<form className="edit-profile-form">
  <input value={user} type="text" row="6" cols ="60" onChange={this.handleEdit} name="username" placeholder={user}/>
      
<input name="email" value={email} onChange={this.handleEdit} placeholder={email} />
<input name="city" value={city} onChange={this.handleEdit} placeholder={city} />
<input name="state" value={state} onChange={this.handleEdit} placeholder={state} />
<input name="zip" value={zip} onChange={this.handleEdit} placeholder={zip} />
            <br/>
      <textarea value={bio} type="text" onChange={this.handleEdit} name="bio" placeholder={bio} className="edit-bio"/>
      <input type="file" value={pic} name="picture" onChange={this.handleEdit} placeholder={pic}/>
            
    <input type="submit" onClick={console.log(id)}/>
    </form>)
}
handleEdit=(e)=>{
this.setState({ [e.target.name]: e.targer.value})
}



  render() {

    const { history,pic, city, bio, state, requested} = this.props;
    const { deleteAccountRequested, edit} = this.state
    const dlt = deleteAccountRequested
    const user = localStorage.currentUser

    // const { pathname } = this.props.history.location
    // console.log("Pathname:", pathname);
    // this.props.history.location.pathname

    console.log("Profile props:", this.props)
    return (
      <div>
       
        <div class={dlt? " parent delete-requested" :"parent"}>

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
          { !edit &&
            <> <h3 className="hi-im"><strong>Hi I'm {user}</strong></h3>
            <img src={pic} className="profile-pic"/> 
      
           
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
        {dlt && requested && <Loader/>}
        <span className="edit-profile-text" onClick={()=> this.needEdit()}>Edit Profile</span>
      {dlt && this.confirmDelete()}
      <span onClick={this.preDelete} className={dlt? "dont-show-delete" : "delete-profile-text"}>Delete Profile</span>
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
    city:state.users.city,
    state:state.users.state,
    users: state.users.all,
    name: state.users.usersObj,
    requested:state.users.requested
  }
}
export default connect(mapStateToProps, { getPost, changeLike, deleteUser, editUser  })(Profile)
{
  /* <Col xs={6} md={4}>
      <Image src="holder.js/171x180" roundedCircle />
    </Col> from https://react-bootstrap.github.io/components/images/ */
}
