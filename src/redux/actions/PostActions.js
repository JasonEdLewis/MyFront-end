import { REQUESTING, POST_SUCCESS, POST_FAILURE, CREATE_POST, ADD_LIKE,EDIT_POST_CAPTION, DELETE_POST } from './types';
import axios from 'axios'

export const getPost = () => dispatch => {
    dispatch({ type: REQUESTING })
    axios.get('http://localhost:3000/posts')
    .then(post => {
        dispatch({ type: POST_SUCCESS, payload: post.data})
    }

    )

}
export const createPost = (info) => dispatch => {
    dispatch   ( { type: REQUESTING} )
    axios.post(`http://localhost:3000/posts`, info)
    .then(post => { dispatch( {type:CREATE_POST, payload:post.data } )
    console.log(post.data)
    })

}
export const editCaption = (id, info) => dispatch => {
    dispatch({ type: REQUESTING })
    axios.patch(`http://localhost:3000/posts/${id}`, { caption: info })
        .then(post => {  console.log(post.data)
   dispatch({ type: EDIT_POST_CAPTION, payload: post.data,id, request: false })
        }
        
    )

}
export const addLike = (id, numLikes) => dispatch =>{
    dispatch({ type: REQUESTING })
     axios.patch(`http://localhost:3000/posts/${id}`,{ likes: numLikes })
    .then(data => console.log( "From Likes action ",data),
    dispatch( { type: ADD_LIKE, id,likes: numLikes } )
    )
}