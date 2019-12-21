import React from 'react';
import '../css/ProfilePostCard.css';
import '../css/Profile.css';
import placeholder from '../img/placeHolder.png';
import TheUser from './TheUser'




export default function ProfilePostCard(props) {

  const { users, name } = props
  const comments = (post) => {
    return post.comments && post.comments.map(c => <p className="commentor-name"><strong>{props.name[c.followee_id] || c.followee_id}</strong> : {c.content}</p>)
  }

  const whichUser = () => {
    return post.user_id !== props.userid ? name[post.user_id] : user
  }
  console.log("Profile card for bio props:", props)
  const { post, user, comment, picture, handleLike, likedPosts, pic, setId, show_x, deletePost, postCommId, postToDelete, id } = props
  return (
    <>
      <div className="profile-post-card-div" onClick={() => setId(post.id)}>
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

              <p className='profile-post-caption'><span id="profile-name-cap"><strong>{whichUser()} : </strong></span> {post.caption}

                {/* {'props.editCapStatus ? <span id="profile-submit-cap-edit" onClick={() => console.log("props.submitCapEdit",post.id)}>  ⬆️ </span> : <span id="profile-edit-caption" onClick={() => console.log("props.getCapEditField",post.id)}>🖋</span>'}  */}

              </p>

              {comments(post)}
            </div>
            {<input
              size="sm"
              type="text"
              name="comment"
              value={props.caption}
              onChange={(e) => props.handleComment(e, post.id)}
              placeholder="comment"
              className="profile-comment-input"
            />} {comment.length > 0 && postCommId === post.id && <span onClick={props.submitComment}
              id="profile-post-span" id={post.id}>
              ⬆️
      </span>}
            <br />
            {/* {'props.status && <Loader />'} */}
            <br />




          </div>

        </div>

      </div>
    </>
  )
}
