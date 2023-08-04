'use strict'
const btn = document.querySelector('.btn-primary')

btn.addEventListener('click', handleLogin)

// Завантаження користувача з localStorage за унікальним ключем (ідентифікатором)
function loadUserFromLocalStorage(userId) {
  const valuesFromLocalStorage  = Object.values(localStorage)
  const objectUser = valuesFromLocalStorage.map((str) => JSON.parse(str))
  const existingUser = objectUser.find(user => user.numId === userId && user.name)
  return existingUser
}


function handleLogin() {
  const name = document.getElementById('firstName');
  const numId = document.getElementById('employeeId');

  const success = document.getElementById('success');
  const danger = document.getElementById('danger');

  const nameUser = name.value;
  const numIdUser = numId.value;

  const checkUser = loadUserFromLocalStorage(numIdUser)
  
  if(!checkUser ){
    danger.textContent = `Користувач не знайдений`
    danger.style.display = 'block'
    // setTimeout(()=> window.location.href ='sign_up.html', 1500)
    return;
  }else{

    //отримали користувача
    const key = "user_" + checkUser.id;
    const storedUserData = localStorage.getItem(key)
    const userConvert = JSON.parse(storedUserData)

    //встановили статус авторизованого користувача
    userConvert.aut = true;
    console.log(userConvert)

    //зберегли в localStorage
    localStorage.setItem(key, JSON.stringify(userConvert))
    setTimeout(() => window.location.href = "user_account.html?id=" + checkUser.id, 1000)
  }
  
  if (nameUser === ""  || numIdUser === "") {
    danger.textContent = `Будь ласка, заповніть всі поля форми!`
    danger.style.display = 'block'
    return;
  }else{
    success.textContent = `Ви успішно увійшли! ${nameUser} `
    success.style.display = 'block'
  }
  
}
