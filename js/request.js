const firebaseConfig = {
    apiKey: "AIzaSyACe8io_fbZbmDixzKNJwcValA-NMfYfVw",
    authDomain: "requestform-7c969.firebaseapp.com",
    databaseURL: "https://requestform-7c969-default-rtdb.firebaseio.com",
    projectId: "requestform-7c969",
    storageBucket: "requestform-7c969.appspot.com",
    messagingSenderId: "46430917327",
    appId: "1:46430917327:web:eacdb46e68a779bc40ddba"
  };

  firebase.initializeApp(firebaseConfig);

//   reference your DB
var requestFormDB = firebase.database().ref.('requestForm');

document.getElementById('requestForm').addEventListener('submit', submitform)

function submitform(e) {
    e.preventDefault();

    var cat = getElementVal("cat");
    var dog = getElementVal("dog");
    var city = getElementVal("city");
    var comment = getElementVal("comment");


    console.log(cat, dog, city, comment);
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}
