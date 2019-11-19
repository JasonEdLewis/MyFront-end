import React from "react";
import HomeContainer from "./HomeContainer";


export default class Homepage extends React.Component {

  componentDidMount() {
    console.log("Home Page MOUNTED")

  }

  render() {
    return (
      <>
        <HomeContainer
          history={this.props.history}
        />
      </>
    );
  }
}
