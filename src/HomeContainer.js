import React from "react";
import "./components/HomeContainer.css";
import Postcard from './components/PostCard';
import NewPost from './components/NewPost';

import { Card, Form, Navbar, Button, NavbarBrand, Nav} from "react-bootstrap";


class HomeContainer extends React.Component {


  state ={
    comment:'',
    id : '',
    picture: '',
    caption: '',
    likes: 0,
    newPost: false,

  }

  
  // POST COMMENT FETCH POST
  postComment=(id,content,fId)=>{
    fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers:{
          'Content-Type': 'Application/json'
        },
        body :JSON.stringify({
            id,
            content,
            fId,
        })

    })
  }


  // HANDLER FOR COMMENTS
handleComment =(e)=>{
  this.setState({
    comment:  e.target.value,
   
  })
  
}

// SUBMIT THE COMMENT /FETCH POST
cameraClick=(e)=>{
this.setState({
  cameraClick: ! this.state.cameraClick
})

console.log(e)
}
// this.state.cameraClick ? NewPost() : 
submitComment=()=>{

}



  render(){
 
      
        const {fposts, user, userId} = this.props;
    const thePost = fposts.map(post => <Postcard post={post} id={post.id} submitComment={this.submitComment} handleComment={this.handleComment} />)
 
  
  console.log("Home Container Props:", this.props)
  return (
    <div className="Home-Container">
     
    <div className="Home-Content">
    <div className="signindiv">
        <Navbar  >
          <Navbar.Brand    href="/profile">
            <h3>Jays'taGram </h3>
            <Nav.Item>
            <Button variant="" href='/post' className="margin-auto" onClick={(e)=>this.submitComment(e)}><span id={userId}>📸</span></Button>
            </Nav.Item>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"> 
            <Navbar.Text>
              
            <Navbar.Brand href='/profile' >Welcome Back {user}</Navbar.Brand>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        </div>
      
      <div className="Home-main"> 
      
      </div>
        <h2 style={{ color:"black" }}>
            We've missed YOU...
        </h2>

        { thePost}
        
        </div>
      <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
    </div>
  );
}
};

export default HomeContainer;
