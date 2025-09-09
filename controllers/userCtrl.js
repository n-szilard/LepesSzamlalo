const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function registration() {
    /* await fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => console.log(data)) */

    let nameField = document.getElementById('nameField');
    let emailField = document.getElementById('emailField');
    let passwordField = document.getElementById('passwordField');
    let confirmField = document.getElementById('confirmPasswordField');


    if (nameField.value == '' || passwordField.value == '' || emailField.value == '' || confirmField.value == '') {
        alert('Nem adtál meg minden adatot!');
        return;
    }

    if (passwordField.value != confirmField.value) {
        alert('A két jelszó nem egyezik!');
        return;
    }

    if (!passwdRegExp.test(passwordField.value)) {
        alert('A megadott jelszó nem elég biztonságos!');
        return;
    }

    if (!emailRegExp.test(emailField.value)) {
        alert('Nem megfelelő e-mail cím!');
        return;
    }

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
        alert(data.msg);
    } catch (err) {
        console.log('Valami baj van: ', err)
    }
}

function login(){}

function logout(){}

function getProfile(){}

function updateProfile(){}

function updatePassword(){}
