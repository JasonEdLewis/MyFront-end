import React from 'react';


export const fetchPost=()=>{
console.log("hello from the PostAdapter")
}

  export const submitNewPost = id => {
    console.log(id);
    const postUlr = "http://localhost:3000/posts";
    console.log(
      "The state we are submitting",
      this.state.Picture,
      this.state.caption,
      id
    );
    fetch(postUlr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: id,
        Picture: this.state.Picture,
        caption: this.state.caption,
        likes: 0
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          newPost: false
        });
      });
  };

    