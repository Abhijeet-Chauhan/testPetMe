// document.getElementById("logout").style.display = "none"; 
function careTaker() {
    window.location.assign("caretaker.html")
  }

function service() {
    allUserDetails()
}


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
//     window.location.assign("owner.html")
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
        
        document.getElementById('caretakers').style.display='flex' //here is for showing
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
            getuserInfo(user.uid)
            getuserInfoRealtime(user.uid)
            service()
        } else {
            getuserInfo(null)
            getuserInfoRealtime(null)
            console.log("Signed Out");
    
        }
    });
}


function logout(){
     
    firebase.auth().signOut().then(() => {
      console.log("Signed Out");
      document.getElementById('caretakers').style.display='none'//here is for showing
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
    
    async function loginWithGoogle(){
        try{
            var provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth()
      .signInWithPopup(provider)
      console.log(result)
        }catch(err){
            console.log(err)
        }
        
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