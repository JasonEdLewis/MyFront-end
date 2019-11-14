import axios from 'axios';
import { REQUEST_LOGIN, SUCCESSFUL_LOGIN, FAILED_LOGIN, LOG_OUT } from './types'


export const fetchLogin = (info) => dispatch => {
  dispatch({ type: REQUEST_LOGIN })
  return axios.post("http://localhost:3000/login", info).then(user => {
    if(!!user.data.token){
      localStorage.setItem("token", user.data.token)
      dispatch({ type: SUCCESSFUL_LOGIN, payload: user.data.token }) 
      
    }
      else{
    dispatch({ type: FAILED_LOGIN, payload: user.data.message })}
  }).catch(err => {
    dispatch({ type: FAILED_LOGIN, errorMessage: err })
  })
}
export const logout = () => dispatch => {
  dispatch({ type: LOG_OUT })
}




export {
  fetchLogin as default
}