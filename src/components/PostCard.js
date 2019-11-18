import React from "react";
import { Card, Form, Button, Col, Image, Container } from "react-bootstrap";
import Jack from "../img/jack.jpg";
import '../css/PostCard.css';
import placeholder from '../img/placeHolder.png';
import { connect } from 'react-redux';
import { deleteFollow, createFollow } from '../redux/actions/FollowActions'


const PostCard = props => {

  const { post, user } = props;

  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        // console.log("comments", t, )
        return (<p className='li-style'><strong>{t.followee_id}: </strong>{t.content}</p>);
      });
    } else {
      return <h6 style={{ color: "light-grey" }}>Be the first to comment</h6>;
    }
  };

  const activeComment = (e) => {
    e.target.id === post.id.toString() && props.toggleCommentField()

  }
  const whichUser = () => {
    return post.user.id !== props.userid ? post.user.username : user
  }
  const clearCommentBox = (e) => {
    const { commentFieldStatus, resetComment, editCapStatus, getCapEditField } = props
    if (props.commentLen || commentFieldStatus) {
      activeComment(e); resetComment()
    }
    else if (editCapStatus && e.target.id !== "edit-caption-input") {
      return getCapEditField()
    }
  }
  const editCapInput = (cap) => {

    return <input type='text' value={props.comment} onChange={props.handleComment} placeholder={` ${cap}`} id="edit-caption-input" name="comment" />
  }


  const areFriends = (postuser) => {

    const { follows, userid, deleteFollow, createFollow } = props
    if (follows && postuser !== userid) {

      const theFollow = follows.find(follow => follow.followee_id === postuser && follow.follower_id === userid);

      if(postuser === userid){
        return ""
    }
      else if (theFollow)
     {
      return (<button id="add-friend" onClick={() => deleteFollow(theFollow.id)}> 🤝</button>)
     }
    else {
      return <button id="add-friend" onClick={() => { createFollow(postuser, userid) }}

      > 🤜🏽💥🤛🏻</button>
    }

  }
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
          {areFriends(post.user_id)}
          {/* <button id="add-friend" onClick={() => { console.log(post.user.id) }}

          > 🤜🏽💥🤛🏻</button> */}

          <span className="name-span-style" onClick={() => { console.log(post.user.id) }}>{post.user.username}</span>
        </div>

        <div className="img-div">
          <img className="image" src={post.picture || require('../img/placeHolder.png')} />
        </div>



        <div className="comments-div" id={post.id} onClick={(e) => clearCommentBox(e)}>
          {props.liked ? <span id="on-heart" onClick={() => props.addLike(post.id, post.likes)}>❤️</span>
            :
            <span id="off-heart" onClick={() => props.addLike(post.id, post.likes)}>♡</span>}
          <div id='comments-header'>
            <span id={post.id} className="pen" onClick={(e) => activeComment(e)}
            >{props.commentFieldStatus ? "💬" : "🖋 "}</span>
            <span id="likes" >Likes: {post.likes}</span>

          </div>
          <br />
          <div className='ul-style'>
            <p className='post-caption'><span id="name-cap"><strong>{` ${whichUser()}`} : </strong></span> {props.editCapStatus ? editCapInput(post.caption) : post.caption} {props.editCapStatus ? <span id="submit-cap-edit" onClick={() => props.submitCapEdit(post.id)}>  ⬆️ </span> : <span id="edit-caption" onClick={() => props.getCapEditField(post.id)}>🖋</span>} </p>
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
          {props.commentLen > 0 && !props.editCapStatus && <span onClick={props.submitComment}
            id="post-span">
            ⬆️
      </span>}
        </div>

      </div>

    </div>
  );
};
const mapStateToProps = state => {
  return {
    user: state.users.username,
    userid: state.users.id,
    follows: state.follows.follows

  }
}
export default connect(mapStateToProps, { deleteFollow, createFollow })(PostCard);
