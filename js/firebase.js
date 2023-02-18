
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getDatabase  } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAzsdwIRaUR07kkfzP8JXrWIotyZivj_0c",
    authDomain: "petme-2d597.firebaseapp.com",
    databaseURL: "https://petme-2d597-default-rtdb.firebaseio.com",
    projectId: "petme-2d597",
    storageBucket: "petme-2d597.appspot.com",
    messagingSenderId: "273767543918",
    appId: "1:273767543918:web:ef8e672a1a2964f5efa27f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth();

  var password = document.getElementById("password")
  var email = document.getElementById("email")


window.login = function(e){
    e.preventDefault();
    var obj = {
        email: email.value,
        password: password.value,
    };
    signInWithEmailAndPassword(auth,obj.email,obj.password)
    .then(function(success){
        console.log(login.uid)
                alert("Login sucessfully")
            })
            .catch(function(err){
                alert("Error"+ err)
            });
            console.log(obj)
          };


//   window.login - function(e){

//     e.preventDefault();
//     var obj = {
//         user:user.value,
//         email:email.value,
//         password: password.value,
//     }
//     createUserWithEmailAndPassword(auth, obj.email, obj.password)
//     .then(function(success){
//         alert("Login sucessfully")
//     })
//     .catch(function(success){
//         alert("Error"+ err)
//     })
//     console.log(obj)
//   };
