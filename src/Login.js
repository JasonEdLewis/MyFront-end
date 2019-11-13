import React from "react";
import LoginForm from './components/LoginForm';
import './css/Login.css';
import { Form, Navbar, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import fetchLogin from './redux/actions/LoginActions';
import Loader from './components/loader'
// import Vid from './img/caliSkaters.mp4';

{
  /* <Spinner animation="grow" variant="info" /> */
}
// Where I got the components from : https://react-bootstrap.github.io/components/alerts/

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChage = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.fetchLogin(this.state)
    debugger
  
  };



  render() {
    console.log(this.props);
    const { login } = this.props
    return (
      //  <div className="video-div">
      //   <video  id="myVideo" loop autoplay >
      //   <source src="http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
      //       {/* <source src={ Vid } type="video/mp4"/> */}
      //     </video>
      //  </div>
      <div className="signindiv">

        <div className="header-div">
          <span className="sign-in-header" >Jays'taGram</span>
        </div>
        <div>
          <img
            src="https://www.jing.fm/clipimg/full/90-902599_camera-icons-transparent-background-ios-camera-logo-png.png"
            className="camera-logo"
          />
        </div>
        <Form className="signInForm" onSubmit={this.handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label alt="username-field"></Form.Label>
            <Form.Control
              type="text"
              value={this.state.username}
              placeholder="Username"
              name="username"
              onChange={this.handleChage}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label alt="password-field"></Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChage}
              placeholder="Password"
            />
          </Form.Group>
          {login.requested ? <Loader/> : <><Button variant="primary" type="submit" className="submit-btn"> 
            Login
  </Button> 
          <p className="stars-under-signup">º º º º º   </p>
          <a href="/signup" className="signup-text">
            signup{" "}
    </a> </>}
        </Form>
      </div>
    );
  }
  
}
const mapStateToProps = (state) =>{
    return {
      login: state.login
    }
}


export default connect(mapStateToProps, {fetchLogin})(Login);

