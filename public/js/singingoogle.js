const { faSignOutAlt } = require("@fortawesome/free-solid-svg-icons");

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log(profile)
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const userFromGoogle = {
        name: profile.getName(),
        email: profile.getEmail(),
        getImageUrl: profile.getImageUrl()
    }
    var id_token = googleUser.getAuthResponse().id_token;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login/google');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        token: userFromGoogle
    }));
    xhr.onload = function () {
        signOut()
        location.assign('/agressors')
    };
}