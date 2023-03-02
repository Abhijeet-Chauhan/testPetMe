const caretakerDetails = document.querySelector('.caretakerDetails')
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
        phone:"",
        role:"caretaker"
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
            caretakerDetails.innerHTML = `
            <a class="dropdown-item">${userInfo.name}</a>
                    <a class="dropdown-item" href="#">${userInfo.email}</a>
                    <a class="dropdown-item" href="#">${userInfo.phone}</a>
                    <a class="dropdown-item" href="#">${userInfo.role}</a>
                    <button type="button" href="#editModal" class="btn btn-secondary btn-block" data-mdb-toggle="modal" data-mdb-target="#editModal">
                    Edit
</button>
            `
          }
    } else {
            caretakerDetails.innerHTML = `<a class="dropdown-item" href="#" data-mdb-toggle="modal"
      data-mdb-target="#owner"
      data-mdb-whatever="@mdo">Please Login</a> `
    }

}
 // <a class="dropdown-item" href="#">${userInfo.email}</a>
async function getuserInfoRealtime(userID){
    if(userID){
        const userdocRef = await firebase.firestore()
        .collection('users')
        .doc(userID)
        userdocRef.onSnapshot((doc)=>{
            if(doc.exists){
                const userInfo = doc.data()
                if(userInfo){
                    caretakerDetails.innerHTML = `
                    <a class="dropdown-item">${userInfo.name}</a>
                    <a class="dropdown-item">${userInfo.phone}</a>
                    <button type="button" href="#editModal" class="btn btn-secondary btn-block" data-mdb-toggle="modal" data-mdb-target="#editModal">
                    Edit Profile
</button>
                    `
                     editProfile["email"].value = userInfo.email
                     editProfile["profilename"].value = userInfo.name
                     editProfile["phone"].value = userInfo.phone
                     
                    //  editProfile["petname"].value = userInfo.petname
                    //  editProfile["pettype"].value = userInfo.pettype
                }
            } 
        })
} else {
    caretakerDetails.innerHTML = `
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
        phone:editProfile["phone"].value,
        // petname:editProfile["petname"].value,
        // pettype:editProfile["pettype"].value
    })

}