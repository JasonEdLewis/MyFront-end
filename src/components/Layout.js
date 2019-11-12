import React from "react";



const Layout = props => {
  console.log(props)
  return (
    <>
             
          {props.children}
       
    </>
  );
};

export default Layout;
