async function registration() {
    /* await fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data)) */

    let nameField = document.getElementById("nameField");
    let emailField = document.getElementById("emailField");
    let passwordField = document.getElementById("passwordField");


    try {
        const res = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameField.value,
                email: emailField.value,
                password: passwordField.value
            })
        });

        const data = await res.json();
        console.log(data)
    } catch (err) {
        console.log('Valami baj van: ', err)
    }
}

function login(){}

function logout(){}

function getProfile(){}

function updateProfile(){}

function updatePassword(){}
