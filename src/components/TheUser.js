

export const  TheUser = (id, users)=> {

   let user =  users.find( u => u.id === id)
 return  !!user ? user.username : false
   
}
export const  ThePic = (id, users) =>{

    let pic =  users.find( u => u.id === id)
  return  !!pic ? pic.picture : false
    
 }

export default{
  TheUser, ThePic
}
