function getaccesstoken() {
    let token = window.location.href.split("&")[1].split("=")[1]
    console.log(token)
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };
    let url = "https://accounts.zoho.com/oauth/v2/token?code=" + token + "&client_id=1000.PF8JGZXK1FCVWWC4RU19YH85D965XI&client_secret=024704c524fdb8d210626f25be966d7200ea333d6c&redirect_uri=https://www.google.com&grant_type=authorization_code";
    console.log(url)
    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function finddata() {
    console.log(document.cookie);
    let value = document.getElementById("org-id").value;
    console.log(value)

}