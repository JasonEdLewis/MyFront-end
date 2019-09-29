import React from "react";
import "./components/HomeContainer.css";
import Postcard from './components/PostCard';
import BlankCard from './components/BlankCard';
import { Card, Form, Navbar, Button} from "react-bootstrap";


class HomeContainer extends React.Component {


  state ={
    comment:""
  }


handleComment =(e)=>{
  this.setState({
    comment:  e.target.value,
   
  })
  
}
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
        <Navbar className="login-nav">
          <Navbar.Brand href="#home">
            <Navbar.Text>
            <h6 className="sign-in-header">Jays'taGram </h6>
            </Navbar.Text>
            <Button variant="link" onClick='/post' style={{marginLeft: "auto", marginRight: "auto"}}>📸</Button>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Welcome Back <a href="/profile">{user}</a>
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
