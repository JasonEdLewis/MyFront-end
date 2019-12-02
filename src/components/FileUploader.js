import { storage } from 'firebase';


export const selectedFileHander = (e) => {
    const image = e.target.files[0]
    if (image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);

    return uploadTask.on('state_changed', (snapshot) => {

      },
        (error) => {
          console.log(error);

        },
        () => {
          storage.ref('images').child(image.name).getDownloadURL().then(url => {
            this.setState({ picture: url })

          })
        })

    };

  }
