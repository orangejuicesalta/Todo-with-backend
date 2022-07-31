
const enterBtn = document.getElementById('login-btn')

document.querySelector('.eye').addEventListener('click', () => {
  const password = document.getElementById('password');
  password.type = password.type=='password' ? 'text' : "password";
})

function userLogin() {
  const user = {
    email: document.getElementById('login').value,
    password: document.getElementById('password').value,
    rememberCheck: document.getElementById('remember_me').checked
  }
  console.log(user.email);
  userSignIn(user);
}

enterBtn.addEventListener('click', userLogin);


