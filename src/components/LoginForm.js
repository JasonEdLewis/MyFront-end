import React from "react";
import { Form, Navbar, Button } from "react-bootstrap";



const headerStyle = {
  margin:"35%",
   
 }
const LoginForm =(props)=>{

  const {handleChange, username, password, handleSubmit} = props
return(
    <div>
    <div>
      <div className="signindiv">
        <h1 style={headerStyle}>Jays'taGram </h1>
    </div>
      <img
        src="https://www.jing.fm/clipimg/full/90-902599_camera-icons-transparent-background-ios-camera-logo-png.png"
        className="camera-logo"
      />
    </div>
    <Form className="signInForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupEmail">
        <Form.Label alt="username-field"></Form.Label>
        <Form.Control
          type="text"
          value={username}
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label alt="password-field"></Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="submit-btn">
        Login
      </Button>
    </Form>
    </div>
)

}

export default LoginForm