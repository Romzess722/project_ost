'use strict'

const button = document.querySelector('.button');

class User {
  constructor(name, login, numId) {
    this.name = name;
    this.login = login;
    this.numId = numId;
    this.selectedHour = '';
    this.sumHour = '';
    this.aut = false;
    this.createDate = getCurrentDateTime();
  }
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTimeString = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return dateTimeString;
}


function generateUniqueId() {
  return  Date.now() + Math.floor(Math.random() * 1000);
} 


// Завантаження користувача з localStorage за унікальним ключем (ідентифікатором)
function loadUserFromLocalStorage(userId) {
  const valuesFromLocalStorage  = Object.values(localStorage)
  const objectUser = valuesFromLocalStorage.map((str) => JSON.parse(str))
  const existingUser = objectUser.find(user => user.numId === userId)
  return existingUser

}


//створення користувача і перевірки
function handleButtonClick() {
  const name = document.getElementById('firstName');
  const login = document.getElementById('lastName');
  const numId = document.getElementById('employeeId');

  const success = document.getElementById('success');
  const danger = document.getElementById('danger');
  const info = document.getElementById('info')

  const nameUser = name.value;
  const loginUser = login.value;
  const numIdUser = numId.value;
  
  let selectedHour = ''//перезапис значення для кнопки


  if (nameUser === "" || loginUser === "" || numIdUser === "") {
    danger.textContent = `Будь ласка, заповніть всі поля форми!`
    danger.style.display = 'block'
    return;
  }

  const existingUser = loadUserFromLocalStorage(numIdUser);
  
  if (existingUser) {
    info.textContent = `Користувач з таким ідентифікатором вже існує! ${numIdUser}`
    info.style.display = 'block'
    return;
  }else{
    success.textContent = `Ви успішно зареєструвалсь! ${nameUser} ${loginUser}`
    success.style.display = 'block'
  }
  
  const newUser = new User(nameUser, loginUser, numIdUser);
  const id = generateUniqueId()
  newUser.id = id;
  newUser.selectedHour = selectedHour
  
  addUserToLocalStorage(newUser)
  
  // const totalUsers = users.length;
  // console.log(`Загальна кількість користувачів: ${totalUsers}`);
  
  name.value = '';
  login.value = '';
  numId.value = '';
  
 setTimeout(() =>  window.location.href = "check_user.html", 1000)
}

// Функція для додавання користувача і корвертація його в рядок
function addUserToLocalStorage(newUser) {
  const key = "user_" + newUser.id;
  localStorage.setItem(key, JSON.stringify(newUser));
}

button.addEventListener('click', handleButtonClick);
