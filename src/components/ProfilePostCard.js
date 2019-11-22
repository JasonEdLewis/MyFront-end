import React from 'react';
import '../css/ProfilePostCard.css';
import '../css/Profile.css';
import placeholder from '../img/placeHolder.png';





const comments =(post)=>{
   return  post.comments.map(c => <p>{c.content}</p>)
}


export default function ProfilePostCard(props) {
  const { post, user,comment, picture } = props
  return (
<>
    <div className="profile-post-card-div" id={`${post.id}`} onClick={(e) => console.log(e.target.id)}>
      <div id={post.id} className="profile-post-card">
        <div className="profile-card-header">

          {/* REPLACE WITH THE IMAGE ASSOCIATED WITH NAME
          <img
            className="post-thumbnail"
            src={require("../img/jack.jpg")}
          />  */}

          {/* {areFriends(post.user_id)} */}

          <span className="profile-name-span-style" onClick={(e) => { console.log(e) }} >{user}</span>
        </div>

        <div className="profile-img-div">
          <img className="profile-image" src={
            props.post.picture ? post.picture :
            placeholder
            } />
        </div>



        <div className="profile-comments-div" id={post.id} onClick={(e) => console.log(e)}>
         
          <div id='profile-comments-header'>
          <span id="profile-on-heart" onClick={() => console.log("post.id, post.likes")}>❤️</span>
          :
              <span id="profile-off-heart" onClick={() => console.log("post.id, post.likes")}>♡</span>
            <span id={post.id} className="profile-pen" onClick={(e) => console.log("activeComment", e)}
            // "props.commentFieldStatus ? 💬  :  🖋"
            > 🖋 </span>
            <span className="profile-likes" >Likes: {post.likes}</span>

          </div>
          <br />
          <div className='profile-ul-style'>

            {/* <p className='profile-post-caption'><span id="profile-name-cap"><strong>{user} : </strong></span> {'props.editCapStatus ? editCapInput(post.caption) : post.caption'} {'props.editCapStatus ? <span id="profile-submit-cap-edit" onClick={() => console.log("props.submitCapEdit",post.id)}>  ⬆️ </span> : <span id="profile-edit-caption" onClick={() => console.log("props.getCapEditField",post.id)}>🖋</span>'} </p> */}

            {comments(post)}
          </div>
          { <input
            size="sm"
            type="text"
            name="comment"
            value={props.caption}
            onChange={props.handleComment}
            placeholder="comment"
            className="profile-comment-input"
          /> }  <span onClick={props.submitComment}
          id="profile-post-span" id={post.id}>
          ⬆️
      </span>
          <br />
          {/* {'props.status && <Loader />'} */}
          <br />
         
        


        </div>

        </div>
      
    </div>
    </>
  )
}
