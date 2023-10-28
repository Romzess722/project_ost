'use strict'

let selectedHour = ''


//отримання id  з url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

// get of the user by his/her ID
const key = "user_" + userId;


// Отримання даних поточного користувача в JSON. з localStorage за допомогою ідентифікатора "userId"
const storedUserData = localStorage.getItem(key);

//обєкт користувача в JS
const userProfile = JSON.parse(storedUserData)

function sumObjectselectedHour(hoursArray) {
  const res = []
  res.push(hoursArray)
  return res.reduce((total, hour) => total + parseInt(hour), 0);
}

//user info view name, login
const infoUser = document.querySelector('.info-user')
infoUser.textContent = userProfile.name + ' ' + userProfile.login


// Перевірка, чи є збережені дані користувача в localStorage
if (!storedUserData) {
  setTimeout(() => {
    alert('Користувач не знайдено, ви повертаєтесь на головну сторінку');
    // Перенаправлення на головну сторінку після показу повідомлення
    window.location.href = "/"
  }, 1000)
}

//перевірка статусу авторизації aut = true/false якщо false відправляємо назад. 
if(userProfile.aut !== true){
  window.location.href = 'log_in.html'
}else {
  // Створення таблиці та додавання даних користувачів
  const tableBody = document.getElementById("tableBody");
  updateTable(userProfile)
}

const buttons = document.querySelectorAll('.buttons');
buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('button');
    if (!clickedButton) {
      return;
    }

    selectedHour = parseInt(clickedButton.textContent);
    userProfile.selectedHour = selectedHour;
    

    // Отримуємо єдиний рядок з класом .user-row
    const row = document.querySelector('.user-row');

    // Отримуємо комірку з класом .hour
    const hourCell = row.querySelector('.hour');
    // Оновлюємо поле годин і зберігаємо зміни в localStorage
    if (hourCell) {
      const existingHour = hourCell.textContent = selectedHour;
      
      if (existingHour !== "" && existingHour !== selectedHour) {
        hourCell.textContent = selectedHour;
        localStorage.setItem(key, JSON.stringify(userProfile));

      }
    }

    // const res = document.querySelector('.sumHour')
    // res.textContent = hourCell.textContent
    
  });
})


//отримуємо кнопку виходу
const buttonOut = document.querySelector('.button_out')

buttonOut.addEventListener('click', (event) => {
  event.preventDefault();
  // const getButton =  event.target.closest('button_out')

  
  userProfile.aut = false
  localStorage.setItem(key, JSON.stringify(userProfile))

  //при виході з свого кабінету удаляє тему
  localStorage.removeItem('theme')
  
  window.location.href ='/
'
})

function updateTable(userProfile){
  const newRow = document.createElement("tr");
  newRow.classList.add('user-row')

    const dataCell = document.createElement("td");
    dataCell.textContent = userProfile.createDate;
    newRow.appendChild(dataCell);

    const numId = document.createElement("td");
    numId.textContent = userProfile.numId;
    newRow.appendChild(numId);

    const hour = document.createElement("td");
    hour.classList.add('hour');
    hour.textContent = userProfile.selectedHour;
    newRow.appendChild(hour);

    const sumHour = document.createElement("td");
    sumHour.classList.add('sumHour')
    sumHour.textContent = userProfile.sumHour;
    newRow.appendChild(sumHour);

    const userName = document.createElement("td");
    userName.textContent = userProfile.name;
    newRow.appendChild(userName);

    const userLogin = document.createElement("td");
    userLogin.textContent = userProfile.login;
    newRow.appendChild(userLogin);

    tableBody.appendChild(newRow);
}

