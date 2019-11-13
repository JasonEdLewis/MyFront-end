import React from "react";
import '../css/newPostCard.css';
import { storage } from '../firebase'



//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

class NewPostCard extends React.Component {

  state ={
    image: null,
    url: "",
    caption: ""
  }

  selectedFileHander = (e) => {
   if(e.target.files[0]){ this.setState({image: e.target.files[0]}) };
  
  }
 handleSubmit =(e)=>{
    e.preventDefault()


  //  this.props.submitPost(this.state.caption)
  }
  handleTextChange = e =>{
    this.setState({ [e.target.name]: e.target.value  })
  }
  render() {
    console.log("NewPost Card props:", this.props, "New card State", this.state);
    const { handleNewPost, state, submitPost, userId } = this.props;
    return (
      <><br/><p className="new-post-heading">Make New Post</p>
      <div className="the-card">
        
        <input type="file" onChange={this.selectedFileHander} style={{display:"none"}} ref={fileInput => this.fileInput = fileInput}/>
        <div className="img-box" onClick={()=> this.fileInput.click()}>
          
          <img src={require("../img/pic_placeholder.png")} />
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
export default NewPostCard;
