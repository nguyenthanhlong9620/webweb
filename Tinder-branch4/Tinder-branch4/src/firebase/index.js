import firebase from "firebase/app"
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDV11QUlUoP96ZuW46w3mxyxxzhEAR_aIs",
    authDomain: "tinder-da0ff.firebaseapp.com",
    projectId: "tinder-da0ff",
    storageBucket: "tinder-da0ff.appspot.com",
    messagingSenderId: "314724104864",
    appId: "1:314724104864:web:c1f621ddef9ccc126167c5",
    measurementId: "G-HZ42V8FL59"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export {storage, firebase as default};

//   const handleUpload = () => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//       error => {
//         console.log(error);
//       },
//       () => {
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then(url => {
//             setUrl(url)
//           });
//       },
//       img.push(url),
//       console.log(url)
//     );
//   };