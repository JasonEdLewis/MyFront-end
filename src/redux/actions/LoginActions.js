import axios from 'axios';
import { REQUEST_LOGIN, SUCCESSFUL_LOGIN, FAILED_LOGIN, LOGGED_OUT } from './types'


export const fetchLogin = (info) =>  {
return function (dispatch){
  dispatch({ type: REQUEST_LOGIN })
  return axios.post("http://localhost:3000/login", info).then(user => {
   dispatch({type: SUCCESSFUL_LOGIN, payload: user.data.token }) 
  }
  )

}
}
export {
  fetchLogin as default
}