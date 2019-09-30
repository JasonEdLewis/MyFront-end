
import React from "react";
import { Card, Form,Button,Col, Image,Container } from "react-bootstrap";



const divStyle= {
 marginLeft: "32%",
 marginRight: 'auto',
  width: "18rem",
  color: "black"
  
}
const spanStyle = {
  marginLeft: "auto",
  marginRight: 'auto',
  marginTop: "-15%",
   color: "pink",
   fontStyle: "italic",
   fontWeight: "bold",
   fontSize: "185%"
}
const thumbnailStyle = {
  height:"35px",
  marginRight:"15%",
  marginTop: "1%",
}



const  PostCard =(props)=>{
 
  const {post} = props
  console.log("Card props: ", props)
  
  const comment = ()=>{ 
    const text =  post.comments
    if (text.length > 0){
      return text.map(t=> {
       return( t.content )
      }
        )
    } 
    else{
    return
    }
  }
return(
<Card style={divStyle} className="post-card" id={post.id} >
      <Image className="thumbnal" style={thumbnailStyle} src={  require('../img/jack.png')}/>
  <span style={spanStyle}>{post.user.username}</span>
 
    <Card.Img
      variant="top"
      src={require('../img/allison-christine-8j-2d94Orlc-unsplash.jpg')}
    />
    <Card.Body>
      <Card.Title></Card.Title>
      <Card.Text>
       {comment()}
      </Card.Text>
      <Form.Control size="sm" type="text" name="comment" value={props.comment} onChange={props.handleComment} onEnter={props.submitComment(post.id)} placeholder="comment" />
      <Button variant="link">Post</Button>
    </Card.Body>
  </Card>
)
}

export default PostCard