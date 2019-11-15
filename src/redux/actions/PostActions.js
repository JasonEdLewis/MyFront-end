import { REQUEST_POST, POST_SUCCESS, POST_FAILURE, CREATE_POST , EDIT_POST , DELETE_POST } from './types'
import axios from 'axios'

export const getPost =()=> dispatch =>{
    dispatch({type: REQUEST_POST })
   return axios.get('http://localhost:3000/posts').then(data => {
    dispatch({type: POST_SUCCESS, payload: data })
  
}
   
    )

}