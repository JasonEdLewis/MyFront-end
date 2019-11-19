import React from 'react'

export default function ProfilePostCard(props) {
    const {post } = props
    return (
        
        <div className="post-card-div" id={`${post.id}`} onClick={(e) => console.log(e.target.id)}>
        <div id={post.id} className="post-card">
          <div className="card-header">
  
            {/* REPLACE WITH THE IMAGE ASSOCIATED WITH NAME
          <img
            className="post-thumbnail"
            src={require("../img/jack.jpg")}
          />  */}
  
            {/* {areFriends(post.user_id)} */}
  
            <span className="name-span-style" onClick={(e) => { console.log(e) }}>USERNAME</span>
          </div>
  
          <div className="img-div">
            <img className="image" src="" />
          </div>
  
  
  
          <div className="comments-div" id={post.id} onClick={(e) => console(e)}>
            <span id="on-heart" onClick={() => console.log("post.id, post.likes")}>❤️</span>
              :
              <span id="off-heart" onClick={() => console.log("post.id, post.likes")}>♡</span>
            <div id='comments-header'>
              <span id={post.id} className="pen" onClick={(e) => console.log("activeComment",e)}
              >{"props.commentFieldStatus ? 💬  :  🖋 "}</span>
              <span className="likes" >Likes: {post.likes}</span>
  
            </div>
            <br />
            <div className='ul-style'>
  
              <p className='post-caption'><span id="name-cap"><strong>{' ${whichUser()}'} : </strong></span> {'props.editCapStatus ? editCapInput(post.caption) : post.caption'} {'props.editCapStatus ? <span id="submit-cap-edit" onClick={() => console.log("props.submitCapEdit",post.id)}>  ⬆️ </span> : <span id="edit-caption" onClick={() => console.log("props.getCapEditField",post.id)}>🖋</span>'} </p>
  
              {/* {comment()} */}
            </div>
            {props.commentFieldStatus ? <input
              size="sm"
              type="text"
              name="comment"
              value={"props.comment"}
              onChange={"props.handleComment"}
              placeholder="comment"
              className="comment-input"
            /> : <><br /></>}
            <br />
            {'props.status && <Loader />'}
            <br />
            {'props.commentLen > 0 && !props.editCapStatus &&' }
            <span onClick={props.submitComment}
              id="post-span">
              ⬆️
        </span>
        
  
          </div>
  
        </div>
  
      </div>
    )
}
