function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}
(() => {
    const signOutButton = document.getElementById('btn-logout');
    signOutButton.addEventListener('click', () => {
        console.log('deslogeado de google')
        signOut();
    })
})()