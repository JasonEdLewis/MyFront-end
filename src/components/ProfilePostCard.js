import React from 'react';
import '../css/ProfilePostCard.css';
// import '../css/Profile.css';
import placeholder from '../img/placeHolder.png';
import TheUser from './TheUser'




export default function ProfilePostCard(props) {

  const { users, name } = props
  const comments = (post) => {
    return post.comments && post.comments.map(c => <p className="commentor-name"><strong>{props.name[c.followee_id] || c.followee_id}</strong> : {c.content}</p>)
  }
  const editCapInput = (cap) => {

    return <input type='text' value={props.comment} onChange={props.handleComment} placeholder={` ${cap}`} id="edit-caption-input" name="comment"  />
  }
  const whichUser = () => {
    return post.user_id !== props.userid ? name[post.user_id] : user
  }
 
 
  const { post, user, comment, picture, handleLike, likedPosts, pic, setId, show_x, deletePost, postCommId, postToDelete, currentUserId, user_id, editCaption, needEditCaption, capId, showHideEditCaption, activate_Delete} = props


  const clearAll = (id,e)=>{
    // if show_x is true and edit caption is false 
    if (show_x && id === postToDelete && !editCaption ){
      return activate_Delete()
    }
    else if (!show_x && editCaption && post.id && e.target.id !== "edit-caption-input" ){
      showHideEditCaption()
    }
    
  
  }
  return (
    <>
      <div className="profile-post-card-div" onClick={(e) => clearAll(post.id,e)
      
    
    }>
        <div className="profile-post-card">
          <div className="profile-card-header">
            {show_x && post.id === postToDelete ? <span className="delete-post-x" onClick={() => deletePost(post.id)}>✘</span> : <span className="dots-to-delete" onClick={() => setId(post.id)}>...</span>
            }
            <span className="star">⭐️</span>
          </div>

          <div className="profile-img-div">
            <img className="profile-image" src={
              props.post.picture ? post.picture :
                placeholder
            } />
          </div>



          <div className="profile-comments-div" id={post.id} onClick={(e) => console.log(post.id)}>

            <div id='profile-comments-header'>
              {likedPosts.includes(post.id) ? <span key={post.id} className="profile-on-heart" onClick={() => handleLike(post.id, post.likes)} >❤️</span>
                :
                <span className="profile-off-heart" onClick={() => handleLike(post.id, post.likes)} key={post.id}>♡</span>}

              <span className="profile-likes" >Likes: {post.likes}</span>

            </div>
            <br />
            <div className='profile-ul-style'>

              <p className='profile-post-caption'><span id="profile-name-cap"><strong>{whichUser()} : </strong></span> { editCaption && capId === post.id ? editCapInput(post.caption) : post.caption}

                {editCaption && capId === post.id ? <span id="profile-submit-cap-edit" onClick={() => props.handleCapSubmit(post.id)}>  ⬆️ </span> : <span id="profile-edit-caption" onClick={() => props.needEditCaption(post.id)}> 🖋</span>}

              </p>

              {comments(post)}
            </div>
            {<input
              size="sm"
              type="text"
              name="comment"
              value={currentUserId === user_id ? props.caption : props.commentState}
              onChange={(e) => props.handleComment(e, post.id)}
              placeholder="comment"
              className="profile-comment-input"
            />} {currentUserId === user_id ? (props.comment.length > 0 && postCommId === post.id && <span onClick={props.submitComment}
              id="profile-post-span" id={post.id}>
              ⬆️
            </span>) : (<span onClick={() => {
                props.submitComment(post.id)
                props.resetComment()
              }}
                id="profile-post-span" id={post.id}>
                ⬆️
            </span>)}
            <br />
            {/* {'props.status && <Loader />'} */}
            <br />




          </div>

        </div>

      </div>
    </>
  )
}
