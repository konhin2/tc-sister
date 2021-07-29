const { faSignOutAlt } = require("@fortawesome/free-solid-svg-icons");

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/google');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        console.log('Signed in as: ' + xhr.responseText);
        // if(xhr.responseText == 'success') {
        //     signOut()
        //     location.assign('/agressors');
        // }
    };
    xhr.send(JSON.stringify({
        token: id_token
    }));
}