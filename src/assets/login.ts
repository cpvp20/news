var btn = document.getElementById('login_google').addEventListener('click', googleLoginMethod);

const urlGetLoginGoogles = "http://localhost:3000/users/google/"

function googleLoginMethod() {
    console.log('Google Login')
    return fetch(urlGetLoginGoogles)
        .then(response => {
            if(response.status == 200) {
                console.log(response)
                return response.json()
            }
        })
        .catch(err => {
            console.log("ERROR", err);
        })
}