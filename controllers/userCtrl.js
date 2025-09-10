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
        showMessage('danger','Hiba','Nem adtál meg minden adatot!');
        return;
    }

    if (passwordField.value != confirmField.value) {
        showMessage('danger','Hiba','A két jelszó nem egyezik!');
        return;
    }

    if (!passwdRegExp.test(passwordField.value)) {
        showMessage('danger','Hiba','A megadott jelszó nem elég biztonságos!');
        return;
    }

    if (!emailRegExp.test(emailField.value)) {
        showMessage('danger','Hiba','Nem megfelelő e-mail cím!');
        return;
    }

    try {
        const res = await fetch(`${ServerUrl}/users`, {
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
        showMessage('info','Siker', data.msg);
        if (res.status == 200) {
            nameField.value = "";
            emailField.value = "";
            passwordField.value = "";
            confirmField.value = "";
        }
    } catch (err) {
        showMessage('danger','Hiba', err);
    }
}

async function login() {
    let emailField = document.getElementById('emailField');
    let passwordField = document.getElementById('passwordField');
    if (passwordField.value == '' || emailField.value == '') {
        showMessage('danger','Hiba','Nem adtál meg minden adatot!');
        return;
    }

    let users = [];

    try {
        const res = await fetch(`${ServerUrl}/users`);
        users = await res.json();
        users.forEach(user => {
            if (user.email == emailField.value && user.password == passwordField.value) {
                loggedUser = user;
                // return;
            }
        });

        if (!loggedUser) {
            showMessage('danger', 'Hiba', 'Hibás belépési adatok!');
            return;
        }

        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        await render('main');
        showMessage('success', 'Ok', 'Sikeres bejelentkezés');
        getLoggedUser();
    } catch (err) {
        showMessage('danger','Hiba', err);
    }

}

function logout() {
    sessionStorage.removeItem('loggedUser');
    getLoggedUser();
    render('login');
}

function getProfile(){}

function updateProfile(){}

function updatePassword(){}
