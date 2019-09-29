import React from 'react';


export default class PostPage extends React.Component{

    state ={
        id : '',
        picture: '',
        likes: 0,

    }

    handleChange=(e)=>{
console.log(e)
    }

    render(){

        return(
            <NewPost handleChange={this.handleChange}/>
        )
    }
}