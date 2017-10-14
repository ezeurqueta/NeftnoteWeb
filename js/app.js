// Script para que el carousel se mueva a determinado tiempo
$('.carousel').carousel({
    interval: 1000
});

function cargador(carga) {
    $("#el_contenedor").load(carga + '.html');
}

function submit() {
    var usr = document.getElementById('usr').value;
    var pass = document.getElementById('pass').value;
    console.log(usr + " " + pass);
}

var config = {
   apiKey: "AIzaSyCkN2-SkpibvX6T2bvB5ZtUWZLaQSqNqB0",
   authDomain: "neftnoteweb.firebaseapp.com",
   databaseURL: "https://neftnoteweb.firebaseio.com",
   projectId: "neftnoteweb",
   storageBucket: "neftnoteweb.appspot.com",
   messagingSenderId: "117793164770"
 };

var provider = new firebase.auth.GoogleAuthProvider();

function logGoogle() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        var name = user.displayName;
        var photo = user.photoURL;
        var email = user.email;

        document.getElementById('signup').style.display = "none";
        document.getElementById('login').style.display = "none";
        document.getElementById('usr_name').style.display = "block";
        // document.getElementById('photo').style.display = "block";
        document.getElementById('usr_name').innerHTML = name;
        document.getElementById('photo').src = photo;

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

$( document ).ready(function() {
    cargador("home");
    firebase.initializeApp(config);
    document.getElementById('usr_name').style.display = "none";
    document.getElementById('photo').style.display = "none";
});
// function cargador(el){
//
//     console.log(el);
//     $("#el_contenedor").load(el + '.html');
//     var list = document.getElementById('menu_left').children[0];
//     for(var i=0; i<list.children.length; i++){
//         var cur = list.children[i];
//         if(el==cur){
//             cur.classList.add("activate");
//             cur.firstChild.onclick = (function(){
//                 cargador(this.parentElement);
//                 return false;
//             });
//         } else {
//             if(cur.classList.contains("activate")){
//                 cur.classList.remove("activate");
//             }
//             cur.firstChild.onclick = (function(){
//                 cargador(this.parentElement);
//             });
//         }
//     }
//     console.log(document.getElementById(el));
// }
