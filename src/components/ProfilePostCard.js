import React from 'react';
import '../css/ProfilePostCard.css';
import '../css/Profile.css';
import placeholder from '../img/placeHolder.png';









export default function ProfilePostCard(props) {


  const comments = (post) => {
  
    return post.comments.map(c => <p><strong>{props.name[c.followee_id +1] || c.followee_id}</strong> : {c.content}</p>)
  }
  console.log("profile post cards props",props)
  const { post, user, comment, picture, handleLike, likedPosts,pic } = props
  return (
    <>
      <div className="profile-post-card-div" id={`${post.id}`} onClick={(e) => console.log(e.target.id)}>
        <div id={post.id} className="profile-post-card">
          <div className="profile-card-header">

            {/* REPLACE WITH THE IMAGE ASSOCIATED WITH NAME */}
          <img
            className="profile-post-thumbnail"
            src={pic}
          />  

            {/* {areFriends(post.user_id)} */}

            {/* <span className="profile-name-span-style" onClick={(e) => { console.log(e) }} >{user}</span> */}
          </div>

          <div className="profile-img-div">
            <img className="profile-image" src={
              props.post.picture ? post.picture :
                placeholder
            } />
          </div>



          <div className="profile-comments-div" id={post.id} onClick={(e) => console.log(post.id)}>

            <div id='profile-comments-header'>
              {likedPosts.includes(post.id) ? <span key={post.id} className="profile-on-heart" onClick={()=> handleLike(post.id, post.likes)} >❤️</span>
                :
                <span className="profile-off-heart" onClick={()=> handleLike(post.id,post.likes)} key={post.id}>♡</span>}
            
              <span className="profile-likes" >Likes: {post.likes}</span>

            </div>
            <br />
            <div className='profile-ul-style'>

              {/* <p className='profile-post-caption'><span id="profile-name-cap"><strong>{user} : </strong></span> {'props.editCapStatus ? editCapInput(post.caption) : post.caption'} {'props.editCapStatus ? <span id="profile-submit-cap-edit" onClick={() => console.log("props.submitCapEdit",post.id)}>  ⬆️ </span> : <span id="profile-edit-caption" onClick={() => console.log("props.getCapEditField",post.id)}>🖋</span>'} </p> */}

              {comments(post)}
            </div>
            {<input
              size="sm"
              type="text"
              name="comment"
              value={props.caption}
              onChange={props.handleComment}
              placeholder="comment"
              className="profile-comment-input"
            />}  <span onClick={props.submitComment}
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
