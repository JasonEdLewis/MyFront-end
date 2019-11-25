import React from "react";
import '../css/newPostCard.css';
import { storage } from '../firebase/index';
import Loader from '../components/loader';
import { connect } from 'react-redux';
import { createPost } from '../redux/actions/PostActions';





//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

class NewPostCard extends React.Component {

  state = {
    image: null,
    url: "",
    caption: "",
    loading: false
  }

  selectedFileHander = (e) => {
    if (e.target.files[0]) { this.setState({ image: e.target.files[0] }) };

  }
  handleSubmit = () => {
    const { image } = this.state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on('state_changed', (snapshot) => {
      this.setState({ loading: true })
    },
      (error) => {
        console.log(error);

      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          console.log(url)
          this.setState({ loading: false, url })

        }).then(()=> {
          debugger
          const {url, caption} =this.state
          const { userid, back } = this.props
          this.props.createPost({user_id: userid ,picture:url, likes:0, caption: caption})
          this.setState( {url:"", caption:"" })
          back()
        }
         )
      })

    //  this.props.submitPost(this.state.caption)
    //[funcName].on(progress, error, complete) these are the task for the arguments that '.on()' takes
  }
  handleTextChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {
    console.log("NewPost Card props:", this.props, "New card State", this.state);
    const { url } = this.state
    const { handleNewPost, state, submitPost, userId } = this.props;
    return (
      <><br />{this.state.loading ? <Loader /> : <p className="new-post-heading">Make New Post</p>}
        <div className="the-card">

          <input type="file" onChange={this.selectedFileHander} style={{ display: "none" }} ref={fileInput => this.fileInput = fileInput} />
          <div className="img-box" onClick={() => this.fileInput.click()}>

            <img src={url || require("../img/pic_placeholder.png")} style={{width:"286px", height:"180px"}} />
          </div>

          <div>
            <textarea className="post-text-area" rows="5" cols="30" placeholder="#litty #🔥 last night was mad trill" style={{ color: "light-blue" }} name="caption" value={this.state.caption} onChange={this.handleTextChange}></textarea>

            <span></span>
          </div>
          <span onClick={this.handleSubmit} id="post-submit-plus">
            ✚
          </span>


        </div>
      </>
    );
  }
}
const mapStateToProps = state =>{
  return {
    userid: state.users.id,
  }
}
export default  connect(mapStateToProps, { createPost })(NewPostCard);
