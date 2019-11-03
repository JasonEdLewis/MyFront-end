import React from "react";
import { Container } from "react-bootstrap";
import Vid from '../img/caliSkaters.mp4';

const Layout = props => {
  console.log(props)
  return (
    <Container>
               <video autoplay="true" loop="true" id="myVideo">
          <source src={ Vid } type="video/mp4"/>
        </video>
          {props.children}
       
    </Container>
  );
};

export default Layout;
