import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import "./css/Signup.css";
import { storage } from './firebase/index';
import Loader from './components/loader';
import { connect } from 'react-redux';
import { newUser, fetchUser } from './redux/actions/UserActions'

import axios from 'axios'

class Signup extends React.Component {
  // FROM API username, password, picture: URL ,bio,email,city,state,zip: INTEGER
  state = {
    file: "",
    username: "",
    password: "",
    picture: "",
    bio: "",
    email: "",
    city: "",
    state: "",
    zip: "",
  };

  handleChange = e => {
    console.log(e.target.name, ":", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewUser = async () => {
    const { newUser, fetchUser } = this.props
    newUser(this.state)
      .then(user => {
        const token = user.payload.token
        // debugger
        if (token) {
          localStorage.setItem("token", token)
          fetchUser(token)
            .then(() => this.props.history.push("/home")
            )
        }
        else {
          this.props.history.push("/");

          console.log("New User Token : ", localStorage.token);
        }
      }
      )
  };

  handleSubmit = e => {
    const { username, password, picture, bio, email, city, state, zip } = this.state
    const { } = this.props
    e.preventDefault();
    return this.submitNewUser();
  };
  selectedFileHander = (e) => {
    const image = e.target.files[0]
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

      uploadTask.on('state_changed', (snapshot) => {

      },
        (error) => {
          console.log(error);

        },
        () => {
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({ picture: url })

          })
        })

    };

  }



  render() {
    console.log("Signup Props:", this.props);
    const { username, password, file, bio, email, city, state, zip } = this.state
    return (
      <div className="form">
        <span><h3 className="sign-up-logo">Jays'taGram </h3></span>
        <div >
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Choose a Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Name"
                  value={username}
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*&*^W%^#"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder="" name="email" value={email} type="email" onChange={this.handleChange} />
            </Form.Group>
            {this.props.requesting && <Loader />}
            <Form.Group>
              <Form.Label>Describe Yourself</Form.Label>
              <Form.Control
                placeholder="What do you like to do...?"
                value={bio}
                name="bio"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control name="city" value={city} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" name="state" onChange={this.handleChange}>
                  <option>Choose...</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control name="zip" type="text" value={zip} onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
          </Button>
            <input type="file" hidden ref={fileInput => this.fileInput = fileInput} onChange={this.selectedFileHander} name="file" />
            <Button variant="info" inputType="file" onClick={() => this.fileInput.click()} className="pic-upload" >
              Photo
          </Button>

            <Button variant="secondary" type="submit" onClick={() => this.props.history.push('/')} className="cancel-btn">
              Cancel
          </Button>
          </Form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    requesting: state.users.requested
  }
}
export default connect(null, { newUser, fetchUser })(Signup);
