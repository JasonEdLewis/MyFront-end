import React from "react";
import '../css/PostCard.css';
import '../css/Profile.css';
import placeholder from '../img/placeHolder.png';
import { connect } from 'react-redux';
import { deleteFollow, createFollow } from '../redux/actions/FollowActions';
import Loader from '../components/loader';
import { TheUser, ThePic } from './TheUser';
import { Player } from 'video-react'




const PostCard = props => {



  const { post, user, users, deleteComment, showThisUser } = props;
  console.log("Profile card props:", props)

  const comment = () => {

    const text = post.comments;
    if (text) {
      return text.map(t => {
        // console.log("comments", t)
        return (<><br /> <span id="name-cap">{!!t.followee_id ?
          `${props.commentors()[t.followee_id.toString()]}:  ` :
          `${props.commentors()[props.userid]}:  `
        }</span><p className='the-content'><strong>
        </strong>{t.content}<span className="delete-x" onClick={() => deleteComment(t)}> ✘ </span></p></>);
      });
    } else {
      return <h6 style={{ color: "black" }}>Be the first to comment</h6>;
    }
  };

  const activeComment = (id) => {
    props.post2comment(id)

  }

  const whichUser = () => {
    return post.user_id !== props.userid ? TheUser(post.user_id, users) : user
  }
  const clearCommentBox = (e) => {
    const { resetComment, editCapStatus, getCapEditField, yourField } = props
    if (props.commentLen <= 0 && yourField && e.target.className !== "comment-input") {
      activeComment(e); resetComment()
    }
    else if (editCapStatus && e.target.id !== "edit-caption-input") {
      return getCapEditField()
    }
  }
  const editCapInput = (cap) => {

    return <input type='text' value={props.comment} onChange={props.handleComment} placeholder={` ${cap}`} id="edit-caption-input" name="comment" />
  }

  const nameOrpic = (id) => {
    if (!!ThePic(id, users) && ThePic(id, users).includes(".jpg")) {
      return (<img src={`${ThePic(id, users)}`} className="post-thumbnail" onClick={()=> showThisUser(post.user_id)} />)
    }
    else if (!!ThePic(id, users) && ThePic(id, users).includes('.mp4')) {
      return (<Player
        playsInline
        poster=""
        src={`${ThePic(id, users)}`} style={{ width: "5vw", float: "right", marginRight: "-60%" }} onClick={() => props.history.push('/profile')} />)
    }
    else {
      return TheUser(id, users)
    }

  }
  const areFriends = (postuser) => {

    const { follows, userid, deleteFollow, createFollow } = props
    if (follows && postuser !== userid) {

      const theFollow = follows.find(follow => follow.followee_id === postuser && follow.follower_id === userid);

      if (postuser === userid) {
        return <span>⭐️</span>
      }
      else if (theFollow) {
        return (<button id="were-friends" onClick={() => deleteFollow(theFollow.id)}> 🤝</button>)
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

          {areFriends(post.user_id)}

          <span className="name-span-style" onClick={() => { console.log("This is from the thumbnail", post.user_id) }} >{nameOrpic(post.user_id)}</span>
        </div>

        <div className="img-div">
          <img className="image" src={post.picture || require('../img/placeHolder.png')} />
        </div>



        <div className="comments-div" id={post.id} onClick={(e) => clearCommentBox(e)}>
          {props.liked.includes(post.id) ? <span id="on-heart" onClick={() => props.handleLikes(post.id, post.likes)}>❤️</span>
            :
            <span id="off-heart" onClick={() => props.handleLikes(post.id, post.likes)}>♡</span>}
          <div id='comments-header'>
            <span id={post.id} className="pen" onClick={() => activeComment(post.id)}
            >{props.yourField === post.id ? "💬" : "🖋 "}</span>
            <span className="likes" >Likes: {post.likes}</span>

          </div>
          <br />
          <p className='post-caption'><span id="name-cap"><strong>{` ${whichUser()}`}:</strong></span> {props.editCapStatus ? editCapInput(post.caption) : post.caption} {props.editCapStatus ? <span id="submit-cap-edit" onClick={() => props.submitCapEdit(post.id)}>  ⬆️ </span> : <span id="edit-caption" onClick={() => props.getCapEditField(post.id)}>🖋</span>} </p>
          <div className='ul-style'>
            {comment()}
          </div>
          {props.yourField === post.id ? <input
            size="sm"
            type="text"
            name="comment"
            value={props.comment}
            onChange={props.handleComment}
            placeholder="comment"
            className="comment-input"
          /> : <><br /></>}
          <br />

          <br />
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
    follows: state.follows.follows,
    status: state.post.requested
  }
}
export default connect(mapStateToProps, { deleteFollow, createFollow })(PostCard);

