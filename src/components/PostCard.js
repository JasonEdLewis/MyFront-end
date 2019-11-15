import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.jpg";
import '../css/PostCard.css'



const PostCard = props => {

  const { post, user } = props;
  console.log("Post Card props: ", props);
  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        return <li className='li-style'>{t.content}</li>;
      });
    } else {
      return <h6 style={{ color: "light-grey" }}>Be the first to comment</h6>;
    }
  };
 
  return (
    <div className="post-card-div">
      <div id={post.id} className="post-card">
        <div className="card-header">
        {/* REPLACE WITH THE IMAGE ASSOCIATED WITH NAME
        <img
          className="post-thumbnail"
          src={require("../img/jack.jpg")}
        />  */}
        <button id="add-friend" onClick={()=> {console.log(post.user.id)}}>🤝</button>

        <span className="name-span-style" onClick={()=> {console.log(post.user.id)} }>{post.user.username}</span>
        </div>

        <div className="img-div">
        <img  src={require('../img/pic_placeholder.png')} />
        </div>
        
         
           
          <div className="comments-div">
          <h5 className="caption">{post.user.username}: {post.caption}</h5>
          <ul className='ulStyle'>{comment()}</ul>
          <input
            size="sm"
            type="text"
            name="comment"
            value={props.comment}
            onChange={props.handleComment}
            placeholder="comment"
          />
          </div>
            
       
        
      
        <span variant="link" onClick={props.submitComment} id="post-span">
          Post
      </span>
      </div>
     
    </div>
  );
};

export default PostCard;
