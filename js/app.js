// Script para que el carousel se mueva a determinado tiempo


function cargador(carga) {
    if (carga != "search") {
        $("#el_contenedor").load(carga + '.html');
        deleteBackground(carga);
    } else {
        if (document.getElementById('searchbar').value != ""){
            $("#el_contenedor").load(carga + '.html');
            // var what = document.getElementById('searchbar').value;
        }
    }
}

function deleteBackground(carga) {
    let navbar_values = ["home", "series", "movies", "help"];
    for (var i = 0; i < navbar_values.length; i++) {
        if (navbar_values[i] == carga) { $("#" + carga).addClass("activate"); }
        else { $("#" + navbar_values[i]).removeClass("activate"); }
    }
    $('#login').removeClass("activate");
}

function register() {
    var f_name = document.getElementById('f_name').value;
    var l_name = document.getElementById('l_name').value;
    var e_mail = document.getElementById('e_mail').value;
    var re_pass = document.getElementById('re_pass').value;
    var re_cpass = document.getElementById('re_cpass').value;
    // falta parseJSON()
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

        $('#signup').css('display', 'none');
        $('#login').css('display', 'none');
        $('#usr_name').css('display', 'block');
        $('#usr_name').text(name);
        $('#photo').css('display', 'block');
        $('#photo').attr('src', photo);
        $('.photo_href').attr('href', photo);
        cargador("home");

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
    $('.carousel').carousel({
        interval: 1000
    });
});
