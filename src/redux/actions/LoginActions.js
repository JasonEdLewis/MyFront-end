import axios from 'axios';
import { REQUESTING, FINISHED_REQUESTING, SUCCESSFUL_LOGIN, FAILED_LOGIN, LOG_OUT } from './types'


export const fetchLogin = (info) => dispatch => {
  dispatch({ type: REQUESTING })
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
 const logout = () =>  dispatch => {
 dispatch({ type: LOG_OUT })
}
 const notRequesting = ()=> dispatch => {
  dispatch({ type: FINISHED_REQUESTING})
}



export {
  notRequesting,logout,
  fetchLogin as default
}