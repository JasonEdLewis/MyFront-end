import React from "react";
import LoginForm from './components/LoginForm';
import './css/Login.css';
import { Form, Navbar, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { fetchLogin } from './redux/actions/LoginActions';
import { fetchUser, fetchAllUsers } from './redux/actions/UserActions';
import Loader from './components/loader';


{
  /* <Spinner animation="grow" variant="info" /> */
}
// Where I got the components from : https://react-bootstrap.github.io/components/alerts/

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    errorMessage: `Please enter valid username & or password`,
    showError: false,
  };


  componentDidMount() {
    localStorage.clear();
    this.props.fetchAllUsers()
  }
  handleChage = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const { fetchLogin, login, history, fetchUser } = this.props
    e.preventDefault();
    fetchLogin(this.state).then(() => {
      if (localStorage.token) {
        fetchUser(localStorage.token)
          .then(() => {

            localStorage.currentUser && localStorage.token && history.push('/home')
          }
          )
      }
      else {
        this.setState({ showError: true })
      }


    }
    )

    this.setState({ username: '', password: "" })
  };



  render() {
    const { login } = this.props
    const { showError, errorMessage } = this.state

    console.log("Login props", this.props)
    return (
      <div>


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
          <Form className='signInForm' onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label alt="username-field"></Form.Label>
              <Form.Control
                type="text"
                value={this.state.username}
                placeholder="Username"
                name="username"
                onChange={this.handleChage}
                required
                id={showError && "Wrong-user-input"}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label alt="password-field"><p id="error-message">{showError && errorMessage}</p></Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChage}
                placeholder="Password"
                id={showError && "Wrong-user-input"}
                required
              />

            </Form.Group>
            {!!login.requested && localStorage.token ? <Loader /> : <><Button variant="primary" type="submit" className="submit-btn">
              Login
  </Button>
              <p className="stars-under-signup">º º º º º   </p>
              <a href="/signup" className="signup-text">
                signup{" "}
              </a> </>}
          </Form>
        </div>
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    users: state.users.all
  }
}


export default connect(mapStateToProps, { fetchLogin, fetchUser, fetchAllUsers })(Login);

