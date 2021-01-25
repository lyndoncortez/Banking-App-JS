const users = {
    username: 'admin@avionbank.com',
    password: 'test'
};

const loginBtn = document.getElementById('login');
const userEmail = document.getElementById('inputEmail');
const userPassword = document.getElementById('inputPassword');

loginBtn.addEventListener('click', () => {
    logIn();
})

function logIn() {
    if (userEmail.value === users.username && userPassword.value === users.password) {
        console.log('correct')
        window.open('./dashboard.html', '_self');
    } else {
        alert("Error Password or Username");
    }
}
