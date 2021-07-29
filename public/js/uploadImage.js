function cambiar(){
    const pdrs = document.getElementById('file-upload').files[0].name;
    document.getElementById('info').innerHTML = pdrs;
}
function cambiar2(){
    const camabio2 = document.getElementById('cambiar2')
    camabio2.addEventListener('click', () => {
        document.getElementById('gogl').click();
    })
}