import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.jpg";
import '../css/PostCard.css';
import placeholder from '../img/placeHolder.png';
import { connect } from 'react-redux';



const PostCard = props => {
 console.log("Post card props", props)
  const { post, user } = props;

  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        console.log("comments", t, )
        return (<p className='li-style'><strong>{t.followee_id}: </strong>{t.content}</p>);
      });
    } else {
      return <h6 style={{ color: "light-grey" }}>Be the first to comment</h6>;
    }
  };

  const activeComment = (e) => {
    e.target.id === post.id.toString() && props.toggleCommentField()

  }
 const whichUser = () =>{
  return  post.user.id !== props.userid ? post.user.username : user
  }

  return (
    <div className="post-card-div" id={`${post.id}`} onClick={(e) => console.log(e.target.id)}>
      <div id={post.id} className="post-card">
        <div className="card-header">
          {/* REPLACE WITH THE IMAGE ASSOCIATED WITH NAME
        <img
          className="post-thumbnail"
          src={require("../img/jack.jpg")}
        />  */}
          <button id="add-friend" onClick={() => { console.log(post.user.id) }}>🤝</button>

          {/* <span className="name-span-style" onClick={() => { console.log(post.user.id) }}>{post.user.username}</span> */}
        </div>

        <div className="img-div">
          <img className="image" src={require('../img/placeHolder.png')} />
        </div>



        <div className="comments-div" id={post.id} onClick={(e) => console.log(e.target.id)}>
          <span id="heart" onClick={() => console.log(post.id)}>♡</span>

          <span id={post.id} className="comment-icon" onClick={(e) => activeComment(e)}
          >{props.commentFieldStatus ? "💬" : "🖋 "}</span>

          <br /><br />

          <div className='ul-style'>
            <p className='li-style'><span id="name-cap"><strong>{whichUser()} </strong></span>:{post.caption} </p>
            {comment()}
          </div>
          {props.commentFieldStatus ? <input
            size="sm"
            type="text"
            name="comment"
            value={props.comment}
            onChange={props.handleComment}
            placeholder="comment"
            className="comment-input"
          /> : <><br /></>}
          <br /><br />
          {props.commentLen === 0 ? <></> : <span onClick={props.submitComment}
            id="post-span">
            ⬆️
      </span>}
        </div>

      </div>

    </div>
  );
};
const mapStateToProps = state =>{
  return {
    user: state.users.username,
    userid: state.users.id,
    
  }
}
export default connect(mapStateToProps)(PostCard);
