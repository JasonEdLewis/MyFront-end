import { storage } from 'firebase';


 const processFile =(image)=>{
    if (image) {
      debugger
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

    return uploadTask.on('state_changed', (snapshot) => {

      },
        (error) => {
          console.log(error);

        },
        () => {
         return storage.ref('images').child(image.name).getDownloadURL().then(url => { 
           return url}
           )

          })
      

    };

  }
  export default processFile
