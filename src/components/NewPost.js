import React from "react";
import {Fragment, Label} from 'react'
import { InputGroup, FormControl, Jumbotron } from "react-bootstrap";

const divStyle = {
  marginLeft: "auto",
 marginRight: 'auto',
 marginTop:'25%',

  width: "36rem",
  color: "black"

}


const BlankCard = () => {
  return (
    <Jumbotron>
    
    <label htmlFor="basic-url" style={divStyle, {textAlign: "center"}}><h3>Post Your Latest Experience here! URL</h3></label>
    <InputGroup style={divStyle}>
    <InputGroup.Prepend>
      <InputGroup.Text>Upload</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" />
    </InputGroup>

    <InputGroup style={divStyle}>
    <InputGroup.Prepend>
      <InputGroup.Text>Caption</InputGroup.Text>
    </InputGroup.Prepend>
    <FormControl as="textarea" aria-label="With textarea" />
    </InputGroup>


    </Jumbotron>
  );
}
export default BlankCard;
