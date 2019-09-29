import React from "react";
import "./components/HomeContainer.css";
import Postcard from './components/PostCard';
import BlankCard from './components/NewPost';
import { Card, Form, Navbar, Button, NavbarBrand, Nav} from "react-bootstrap";


class HomeContainer extends React.Component {


  state ={
    comment:""
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
submitComment=(e)=>{
console.log(e)
}



  render(){
        const {fposts, user, handleComment} = this.props
  const thePost = fposts.map(post => <Postcard post={post} id={post.id} comments={post.comments} key={post.id} handleComment={this.handleComment} comment={this.state.comment} submitComment={this.submitComment}/>)
  
  console.log("Home Container Props:", this.props)
  return (
    <div className="Home-Container">
     
    <div className="Home-Content">
    <div className="signindiv">
        <Navbar className="ml-auto" >
          <Navbar.Brand href="/profile">
            <Nav.Item className="sign-in-header">Jays'taGram </Nav.Item>
            <Nav.Item>
            <Button variant="" href='/post' className="margin-auto"><span>📸</span></Button>
            </Nav.Item>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end"> 
            <Navbar.Text>
              
            <Navbar.Brand href='/profile'>Welcome Back {user}</Navbar.Brand>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        </div>
      
      <div className="Home-main"> 
      
      </div>
        <h2 style={{ color:"black" }}>
            We've missed YOU...
        </h2>

        {thePost}
        
        </div>
      <div className="Home-footer">Copyright &copy; 2019 Jaystagram</div>
    </div>
  );
}
};

export default HomeContainer;
