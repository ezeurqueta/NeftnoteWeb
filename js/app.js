// funciones

function loader(carga) {
    if (carga == "series"){
        $("#el_contenedor").load(carga + '.html',  function(response, status) {
              if ( status != "error" ) {
                  loadList("series");
              }
          });
        deleteBackground(carga);
    } else if (carga == "movies"){
        $("#el_contenedor").load(carga + '.html',  function(response, status) {
              if ( status != "error" ) {
                  loadList("movies");
              }
          });
        deleteBackground(carga);
    } else if (carga == "profile") {
        $("#el_contenedor").load(carga + '.html',  function(response, status) {
              if ( status != "error" ) {
                  showProfile(user);
              }
          });
    } else if (carga == "help"){
        $("#el_contenedor").load(carga + '.html');
        deleteBackground(carga);
    } else {
        $("#el_contenedor").load(carga + '.html');
        deleteBackground(carga);
    }
}

function search() {
    if ($("#searchbar").val() != "") {
        $("#el_contenedor").load('search.html', function(res, status) {
            if (status != "error") {
                deleteBackground();
                searchX("series")
                searchX("movies");
            }
        });
    }
}

function searchX(x) {
    let value = $("#searchbar").val();
    let search = $(`#${x}_search`);
    const fbdb = firebase.database().ref(`/${x}/`);
    fbdb.on("value", snapshot => {
        snapshot.forEach(snap => {
            if (snap.val().name.toLowerCase().includes(value)) {
                let div = document.createElement('div');
                let input = document.createElement('input');
                div.classList = "col-lg-2 portfolio-item";
                input.type = "image";
                input.src = snap.val().photoURL;
                input.classList.add("list-cont");
                input.onclick = e => {loadInfo(x, snap.key)};
                div.append(input);
                search.append(div);
                $(`#${x}_title`).attr("class", "");
                $(`#${x}_line`).attr("class", "");
            }
        })
    });
}

function searchBar(x, val) {
    let fbdb = firebase.database().ref(`/${x}/`);
    fbdb.on('value', snapshot => {
        snapshot.forEach(snap => {
            if (snap.val().name.toLowerCase().includes(val.toLowerCase()) && val != '') {
                console.log(snap.val().name);
            }
        });
    });
}

$('#searchbar').keyup( e => {
    let val = $('#searchbar').val();
    searchBar('series', val);
});

function deleteBackground(carga) {
    let navbar_values = ["home", "series", "movies", "help"];
    for (let i = 0; i < navbar_values.length; i++) {
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
    $('.ulist').append('<li><a><input type="image" src="img/google.png" onclick="logGoogle();" width="30" height="30"></input></a></li>' +
    `<li><a><button onclick="loader('signUp')">Register</button></a></li>` +
    '<li><a><button>Log In</button></a></li>' +
    '<li><a style="color:white">Password: <input type="password" style="width: 120px"></a></li>'+
    '<li><a style="color: white">Username: <input style="width: 120px"></a></li>')
}

function logMenu() {
    hideOptions();
    showLogMenu();
}

function register() {
    let usr_name = $('#txt_usr_name').val();
    let f_name = $('#txt_f_name').val();
    let l_name = $('#txt_l_name').val();
    let e_mail = $('#txt_e_mail').val();
    let phone = $('#txt_phone').val();
    let re_pass = $('#txt_re_pass').val();
    let re_cpass = $('#txt_re_cpass').val();

    let db_register = firebase.database();

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
    let usr = document.getElementById('usr').value;
    let pass = document.getElementById('pass').value;
    console.log(usr + " " + pass);
}

function logGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;

        let name = user.displayName;
        let email = user.email;
        let photo = user.photoURL;

        let emails = [];
        let keys = [];

        firebase.database().ref('/users/').once('value', snap => {
            snap.forEach(s => {
                emails.push(s.val().e_mail);
                console.log(s.key);
                keys.push(s.key);
            })
            if (emails.includes(email)) {
                alert("Logged");
                console.log(keys);
            } else {
                firebase.database().ref('/users/').push({
                    'name': name,
                    'e_mail': email,
                    'profile': {

                    }
                });
                alert("Account created");
console.log(keys);
            }
        });

        // $('.ulist').html('').append("<li><a class='photo_href' href='#'><img id='photo'></img></a></li>" +
        // "<li><a href='#'><button id='usr_name' class='btn btn-secondary dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'></button></a></li>" +
        // "<div class='dropdown-menu' aria-labelledby='dropdownMenuButton'><a class='dropdown-item'>Action</a><a class='dropdown-item'>Action</a><a class='dropdown-item'>Action</a></div>" +
        // "</a></li>");

        const li_img = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const btn = document.createElement('button');
        const div_items = document.createElement('div')
        const a1 = document.createElement('a');
        const a2 = document.createElement('a');

        $(a).attr('class', 'photo_href');
        $(img).attr('id', 'photo');
        $(div).attr('class', 'dropdown');
        $(btn).attr('onclick', 'showDDMenu()');
        $(btn).attr('class', 'dropbtn');
        $(btn).text(`${name} 🡻`);
        $(a1).text("Profile");
        $(a1).attr('href', "#");
        $(a1).attr('onclick', "loader('profile')");
        $(a2).text("Log Out");
        $(a2).attr('href', "#");
        $(a2).attr('onclick', "logOutGoogle()");
        $(div_items).attr('id', 'myDropdown');
        $(div_items).attr('class', 'dropdown-content');

        $(a).append(img);
        $(li_img).append(a);
        $(div).append(btn);
        $(div_items).append(a1);
        $(div_items).append(a2);
        $(div).append(div_items);
        $('.ulist').html('').append(li_img);
        $('.ulist').append(div);

        $('#usr_name').css('display', 'block');
        $('#usr_name').text(name);
        $('#photo').css('display', 'block');
        $('#photo').attr('src', photo);
        $('.photo_href').attr('onclick', "loader('profile')");
        loader("home");

    }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // ...
    });
}

function logOutGoogle() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        resetProfile();
        user = undefined;
        loader('index');
        alert("Logged out");
    }).catch(function(error) {
        // An error happened.
    });
}

function showProfile(user) {
    console.log(user);
    $('#profile_img').attr('src', user.photoURL);
    $('#profile_img').css('width', '100px');
    $('#profile_img').css('height', '100px');
    $('#profile_img').css('border-radius', '20px');
    $('#profile_name').text('Profile name: ' + user.displayName)
}

function showDDMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function resetProfile() {
    const liL = document.createElement('li');
    const aL = document.createElement('a');
    const liS = document.createElement('li');
    const aS = document.createElement('a');

    $(aL).attr('id', 'login');
    $(aL).attr('onclick', 'logMenu()');
    $(aL).attr('href', '#');
    $(aL).text("Log In");
    $(aS).attr('id', 'signUp');
    $(aS).attr('onclick', "loader('signUp')");
    $(aS).attr('href', '#');
    $(aS).text("Sign Up");

    $(liL).append(aL);
    $(liS).append(aS);
    $('.ulist').html('').append(liL);
    $('.ulist').append(liS);
}

function loadList(x) {
    let dbSeries = firebase.database().ref(`/${x}/`);
    dbSeries.on('value', snapshot => {
        snapshot.forEach(snap => {
            let div = document.createElement('div');
            let input = document.createElement('input');
            div.classList = "col-lg-2 portfolio-item";
            input.type = "image";
            input.src = snap.val().photoURL;
            input.classList.add("list-cont");
            input.onclick = e => {loadInfo(x, snap.key)};
            div.append(input);
            $(`#${x}_list`).append(div);
        })
    });
}

function loadInfo(x, key) {
    $("#el_contenedor").load("info.html", function( response, status ) {
        if ( status != "error" ) {
            const dbX = firebase.database().ref(`/${x}/` + key);
            dbX.on('value', snap => {
                let info = document.getElementById("info");
                let input = document.createElement("input");
                input.type = "image";
                input.src = snap.val().photoURL;
                input.classList.add("info");
                info.append(input);
                $("#name").text("Title: " + snap.val().name);
                $("#director").text("Director: " + snap.val().director);
            })
            $("#btn_back").attr("onclick", `loader('${x}')`);
            smkey = key;
            loadInfoUser(key);
        }
    });
}

function loadInfoUser(key) {
    const db_user = firebase.database().ref('/users/-Kys7TX0xQy6DVKRFNCl/profile/' + key);
    db_user.on('value', snap => {
        $(`#sm_status option:contains(${snap.val().status})`).attr('selected', true);
    });
}

function updateProfile() {
    if (user != undefined) {
        console.log("updated");
        let sm_status = $("#sm_status option:selected").text();
        console.log(smkey);
        const db_user = firebase.database().ref('/users/-Kys7TX0xQy6DVKRFNCl/profile');
        db_user.update({
            [smkey]: {
                'status': sm_status
            }
        });
    } else {
        console.log("nope");
    }
}

$( document ).ready(function() {
    let config = {
       apiKey: "AIzaSyCkN2-SkpibvX6T2bvB5ZtUWZLaQSqNqB0",
       authDomain: "neftnoteweb.firebaseapp.com",
       databaseURL: "https://neftnoteweb.firebaseio.com",
       projectId: "neftnoteweb",
       storageBucket: "neftnoteweb.appspot.com",
       messagingSenderId: "117793164770"
     };
    firebase.initializeApp(config);

    let user;
    let userkey;
    let smkey;

    loader("home");

    $("#searchbar").keypress((e) => {
        if (e.keyCode == 13) {
            search();
        }
    });

    $('.carousel').carousel({
        interval: 100
    });
});
