


// authentication
async function signup(e) {
    e.preventDefault()
    // const name = document.querySelector('#name')
    const email = document.querySelector('#newemail')
    const password = document.querySelector('#newpwd')
    console.log(email.value,password.value);

    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        await result.user.updateProfile({
            displayName: "User"
            // `${result.user.email}`
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
          })
          createUserCollection(result.user)

          await result.user.sendEmailVerification()
        toastr.success(`Welcome ${result.user.email}, Please Login!`);
      
    console.log(result)
    }catch(err){
        console.log(err)
        toastr.error(err.message);

        
    }
    email.value = ""
    password.value = ""

}

// function loginRedirect() {
//     window.location.assign("https://www.google.com")
//   }


async function login(e) {
    e.preventDefault()
    // const name = document.querySelector('#name')
    const email = document.querySelector('#email')
    const password = document.querySelector('#pwd')
    console.log(email.value,password.value);
    try{
        const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        toastr.success(`Welcome ${result.user.email}`);
        toastr.info('Please Wait, Redirecting...');
    console.log(result)
    // const myTimeout = setTimeout(loginRedirect, 3000);
        
    

    }catch(err){
        console.log(err)
         toastr.error(err.message);   // Make custom message

        
    }
    email.value = ""
    password.value = ""


}


// function logout(){
//     firebase.auth().signOut()
// }

// const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user)
//         getuserInfo(user.uid)
//     } else {
//         getuserInfo(null)
//         console.log("Signed Out");

//     }
// });

function OnState(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user)
            // getuserInfo(user.uid)
            getuserInfoRealtime(user.uid)
        } else {
            getuserInfoRealtime(null)
            console.log("Signed Out");
    
        }
    });
}


function logout(){

    firebase.auth().signOut().then(() => {
      console.log("Signed Out");
      toastr.success("Signed Out Successfully");
      userDetails.innerHTML = `
      <a class="dropdown-item" href="#" data-mdb-toggle="modal"
      data-mdb-target="#owner"
      data-mdb-whatever="@mdo">Please Login</a>
            `
    //   alert("Logged Out!")
      
    }).catch((error) => {
      // An error happened.
    });
    }
    


    

// function logout(){
//     firebase.auth().signOut()
// }

// const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         console.log(user)
//     } else {
//       console.log("Signed Out");
//       toastr.success(`${result.user.email} Signed Out Successfully`);
//     }
//   });