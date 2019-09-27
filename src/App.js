import React from "react";
import Login from "./Login";
import "./App.css";
import Profile from "./Profile";
import Signup from "./Signup";

class App extends React.Component {
  state = {
    page: "login"
  };

  redirect = page => {
    this.setState({ page: page });
  };

  componentDidMount() {
    if (localStorage.token) {
      this.redirect("profile");
    } else {
      this.redirect("login");
    }
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      page: "login"
    });
    
    this.componentDidMount()
   
    console.log(localStorage.token);
  };
  render() {
    console.log(this.state.page);
    switch (this.state.page) {
      case "profile":
        return <Profile logout={this.logout} />;
      case "login":
        return <Login redirect={this.redirect} logout={this.logout}/>;
    }
  }
}

export default App;
