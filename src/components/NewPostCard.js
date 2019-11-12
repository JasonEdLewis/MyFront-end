import React from "react";
import moduleName from '../css/newPostCard.css'


//  SET UP FETCH POST FOR NEW POST AND CREATE MIGRATTION FOR CAPTION FOR POST AND SET UP TO GO BACK THE HOME PAGE AFTER POST IS FINISHED POSTING

class NewPostCard extends React.Component {

  state ={
    selectedFile: null,
  }

  selectedFileHander = (e) => {
    this.setState({selectedFile: e.target.files[0]})
  }
  uploadFileHandler =(e)=>{
    e.preventDefault()
   
  }
  render() {
    console.log("NewPost Card props:", this.props);
    const { handleNewPost, state, submitPost, userId } = this.props;
    return (
      <div className="the-card">
        <input type="file" onChange={this.selectedFileHander} style={{display:"none"}} ref={fileInput => this.fileInput = fileInput}/>
        <div className="img-box" onClick={()=> this.fileInput.click()}>
          
          <img src={require("../img/pic_placeholder.png")} />
        </div>

        <div>
          <textarea className="post-text-area" rows="5" cols="30" placeholder="#litty #🔥 last night was mad trill" style={{ color: "light-blue" }}></textarea>

          <span></span>
        </div>
        <span onClick={() => submitPost(userId)} id="post-submit-plus">
          ✚
          </span>


      </div>
    );
  }
}
export default NewPostCard;
