const userDetails = document.querySelector('.userDetails')
const editProfile = document.querySelector('#editProfile')

function updated() {
    toastr.success(`Welcome ${result.user.email}, Please Login!`);
    alert("done")
}

function createUserCollection(user){
    firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
        uid:user.uid,
        name:user.displayName,
        email:user.email,
        petname:"",
        pettype:"",
        role: "owner"
    })
}


async function getuserInfo(userID){
    if(userID){
        const userInfoSnap = await firebase.firestore()
        .collection('users')
        .doc(userID)
        .get()
    
        const userInfo = userInfoSnap.data()
        if(userInfo){
            userDetails.innerHTML = `
            <a class="dropdown-item">${userInfo.name}</a>
                    <a class="dropdown-item" href="#">${userInfo.email}</a>
                    <a class="dropdown-item" href="#">${userInfo.phone}</a>
                    <button type="button" href="#editModal" class="btn btn-secondary btn-block" data-mdb-toggle="modal" data-mdb-target="#editModal">
                    Edit
</button>
            `
          }
    } else {
            userDetails.innerHTML = `<a class="dropdown-item" href="#" data-mdb-toggle="modal"
      data-mdb-target="#owner"
      data-mdb-whatever="@mdo">Please Login</a> `
    }

}

async function getuserInfoRealtime(userID){
    if(userID){
        const userdocRef = await firebase.firestore()
        .collection('users')
        .doc(userID)
        userdocRef.onSnapshot((doc)=>{
            if(doc.exists){
                const userInfo = doc.data()
                if(userInfo){
                    userDetails.innerHTML = `
                    <a class="dropdown-item">${userInfo.name}</a>
                    <a class="dropdown-item">${userInfo.role}</a>
                    <a class="dropdown-item" href="#">${userInfo.email}</a>
                    <a class="dropdown-item" href="#">PetName: ${userInfo.petname}</a>
                    <a class="dropdown-item" href="#">${userInfo.pettype}</a>

                    <button type="button" href="#editModal" class="btn btn-secondary btn-block" data-mdb-toggle="modal" data-mdb-target="#editModal">
                    Edit Profile
</button>
                    `
                     editProfile["email"].value = userInfo.email
                     editProfile["profilename"].value = userInfo.name
                     
                     editProfile["petname"].value = userInfo.petname
                     editProfile["pettype"].value = userInfo.pettype
                }
            } 
        })
} else {
    userDetails.innerHTML = `
    <a class="dropdown-item" href="#" data-mdb-toggle="modal"
              data-mdb-target="#owner"
              data-mdb-whatever="@mdo">Please Login </a>

    `
}
}


function updateUserProfile(e){
    e.preventDefault()
    const userDocRef = firebase.firestore()
    .collection('users')
    .doc(firebase.auth().currentUser.uid)


    userDocRef.update({
        email:editProfile["email"].value,
        name:editProfile["profilename"].value,
        petname:editProfile["petname"].value,
        pettype:editProfile["pettype"].value
    })

}


// function allUserDetails() {
//     document.getElementById('caretaker').style.display='flex'
//     const userRef = firebase.firestore().collection('users')

//     userRef.onSnapshot(querysnap=>{
//         querysnap.docs.forEach(doc=>{
//             const info = doc.data()
//             console.log(info)
//         })
//     })

// }
function allUserDetails(){
    document.getElementById('caretakers').style.display='flex'
    const userRef = firebase.firestore().collection("users")
.where("role", "==", "caretaker")
.get()
.then(snap => {
    snap.forEach(doc => {
        const info = doc.data()
        document.getElementById('caretakers').innerHTML += `
       
        <div class="col-sm-4"><div class="card">
<div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
<img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" class="img-fluid"/>
<a href="#!">
<div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
</a>
</div>
<div class="card-body">
  <h5 class="card-title">${info.name}</h5>
  <p class="card-text">${info.email}</p>
  <p class="card-text">${info.phone}</p>
  <a href="#!" class="btn btn-primary">Button</a>
  </div>
</div></div>
        `
        console.log(doc.data());
    });
});
}
