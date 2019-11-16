import React from "react";
import HomeContainer from "./HomeContainer";
import PostCard from "./components/PostCard";
import Profile from "./Profile";
import { getPost } from './redux/actions/PostActions'
import { connect } from 'react-redux';
import { fetchUser } from './redux/actions/UserActions';




class Homepage extends React.Component {

  componentDidMount() {
    console.log("Home Page MOUNTED")
  }

  render() {
    console.log("Home Page Props:", this.props)
    const { user, post } = this.props
    return (
      <>
     
        <HomeContainer
          history={this.props.history}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.login.token,
    user: state.users,
    post: state.post
  }
}



export default connect(mapStateToProps, { fetchUser, getPost  })(Homepage)
