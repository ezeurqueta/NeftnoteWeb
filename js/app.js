// funciones

function cargador(carga) {
    if (carga == "series"){
        $("#el_contenedor").load(carga + '.html' ,  function( response, status ) {
              if ( status != "error" ) {
                  loadSeries();
              }
          });
        deleteBackground(carga);
    } else if (carga != "search") {
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
    "<li><a><button onclick='cargador()'>Register</button></a></li>" +
    '<li><a><button>Log In</button></a></li>' +
    '<li><a style="color:white">Password: <input type="password" style="width: 120px"></a></li>'+
    '<li><a style="color: white">Username: <input style="width: 120px"></a></li>')
}

function logMenu() {
    hideOptions();
    showLogMenu();
}

function register() {
    var usr_name = $('#txt_usr_name').val();
    var f_name = $('#txt_f_name').val();
    var l_name = $('#txt_l_name').val();
    var e_mail = $('#txt_e_mail').val();
    var phone = $('#txt_phone').val();
    var re_pass = $('#txt_re_pass').val();
    var re_cpass = $('#txt_re_cpass').val();

    var db_register = firebase.database();

    db_register.ref('/users/').push({
        'f_name':f_name,
        'l_name':l_name,
        'e_mail':e_mail,
        'phone':phone,
        'pass':re_pass
    });
    // db_register.ref('/users/' + usr_name + '/f_name').set(f_name);
    // db_register.ref('/users/' + usr_name + '/l_name').set(l_name);
    // db_register.ref('/users/' + usr_name + '/e_mail').set(e_mail);
    // db_register.ref('/users/' + usr_name + '/phone').set(phone);
    // db_register.ref('/users/' + usr_name + '/pass').set(re_pass);
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

function loadSeries() {
    var series = $('#series_list');

    var dbSeries = firebase.database().ref('/series/');
    dbSeries.on('value', snapshot => {
        snapshot.forEach(snap => {
            var div = document.createElement('div');
            var input = document.createElement('input');
            div.classList = "col-lg-3 col-md-4 col-sm-6 portfolio-item";
            input.type = "image";
            input.src = snap.val().photoURL;
            input.style.width = "320px";
            input.style.height = "400px";
            input.style.marginLeft = "10px";
            input.onclick = e => {loadInfoSerie(snap.key)};
            div.append(input);
            series.append(div);
        })
    })
}

function loadInfoSerie(series) {
    $("#el_contenedor").load("serie.html", function( response, status ) {
          if ( status != "error" ) {
              const dbX = firebase.database().ref("/series/" + series);
              dbX.on('value', snap => {
                  let info = document.getElementById("info");
                  let input = document.createElement("input");
                //   let h2 = document.createElement("h2");
                //   h2.innerText = "Title" + snap.val().name;
                //   info.append(h2);

                  input.type = "image";
                  input.src = snap.val().photoURL;
                  input.style.width = "320px";
                  input.style.height = "400px";
                  info.append(input);

                  $("#name").text("Title: " + snap.val().name);
                  $("#director").text("Director: " + snap.val().director);
              })
          }
      });
}

$( document ).ready(function() {
    var config = {
       apiKey: "AIzaSyCkN2-SkpibvX6T2bvB5ZtUWZLaQSqNqB0",
       authDomain: "neftnoteweb.firebaseapp.com",
       databaseURL: "https://neftnoteweb.firebaseio.com",
       projectId: "neftnoteweb",
       storageBucket: "neftnoteweb.appspot.com",
       messagingSenderId: "117793164770"
     };
    firebase.initializeApp(config);

    cargador("home");

    $('.carousel').carousel({
        interval: 1000
    });
});
