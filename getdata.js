function getaccesstoken() {
    let token = window.location.href.split("&")[1].split("=")[1]
    console.log(token)
}

function finddata() {
    console.log(document.cookie);
    let value = document.getElementById("org-id").value;
    console.log(value)

}