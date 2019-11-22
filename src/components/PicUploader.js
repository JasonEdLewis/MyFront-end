
import React from 'react';
import { storage } from '../firebase/index';


 const PicUploader= (image)=> {
    console.log("Pic to Upload from Sign-Up",image)

    if(image){
     const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on( snapshot => {
     
    },
      (error) => {
        console.log(error);

      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
         return url

        })
    })
}
    }
export default PicUploader





