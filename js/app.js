// variables y constantes

var config = {
   apiKey: "AIzaSyCkN2-SkpibvX6T2bvB5ZtUWZLaQSqNqB0",
   authDomain: "neftnoteweb.firebaseapp.com",
   databaseURL: "https://neftnoteweb.firebaseio.com",
   projectId: "neftnoteweb",
   storageBucket: "neftnoteweb.appspot.com",
   messagingSenderId: "117793164770"
 };

const preObeject = document.getElementById('serie');
const ulList = document.getElementById('serie-list');

// funciones

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

function hideOptions() {
    $('#login').css('display', 'none');
    $('#signup').css('display', 'none');
}

function showLogMenu() {
    $('.ulist').html('').append('<li><a><input type="image" src="img/google.png" onclick="logGoogle();" width="30" height="30"></input></a></li>' +
    '<li><a><button>Log In</button></a></li>' +
    '<li><a style="color:white">Password: <input type="password" style="width: 120px"></a></li>'+
    '<li><a style="color: white">Username: <input style="width: 120px"></a></li>')
}

function logMenu() {
    hideOptions();
    showLogMenu();
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

function logGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);

        var name = user.displayName;
        var photo = user.photoURL;
        var email = user.email;

        $('.ulist').html('').append("<li><a class='photo_href' href='#'><img id='photo'></img></a></li>" +
        "<li><a href='#'><button id='usr_name' class='btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button></a></li>" +
        "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'><a class='dropdown-item'>Action</a><a class='dropdown-item'>Action</a><a class='dropdown-item'>Action</a></div>" +
        "</a></li>");

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


    const dbRefObject  = firebase.database().ref().child('series');

    // dbRefObject.on('value', snap => console.log(snap.val()));
    dbRefObject.on('value', snap => {
        preObeject.innerText = JSON.stringify(snap.val(), null, 4);
    });

    dbRefObject.on('child_added', snap => {
        const li = document.createElement('li');
        li.innerText = snap.val();
        li.id = snap.key;
        ulList.appendChild(li);
    });

    dbRefObject.om('child_changed', snap => {
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
    });

    dbRefObject.om('child_remove', snap => {
        const liToRemove = document.getElementById(snap.key);
        liChanged.remove();
    });

    $('.carousel').carousel({
        interval: 1000
    });
});
