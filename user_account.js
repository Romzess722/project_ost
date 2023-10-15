"use strict";

let selectedHour = "";

//отримання id  з url
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");

// get of the user by his/her ID
const key = "user_" + userId;

// Отримання даних поточного користувача з localStorage за допомогою ідентифікатора "userId"
const storedUserData = localStorage.getItem(key);
const userProfile = JSON.parse(storedUserData);

console.log(userProfile);
console.log(storedUserData);

// Перевірка, чи є збережені дані користувача в localStorage
if (!storedUserData) {
  setTimeout(() => {
    alert("Користувач не знайдено, ви повертаєтесь на головну сторінку");
    // Перенаправлення на головну сторінку після показу повідомлення
    window.location.href = "/";
  }, 1000);
}

//перевірка статусу авторизації aut = true/false якщо false відправляємо назад.
if (userProfile.aut !== true) {
  window.location.href = "log_in.html";
} else {
  // Створення таблиці та додавання даних користувачів
  const tableBody = document.getElementById("tableBody");
  updateTable(userProfile);
}

//user info view name, login
const infoUser = document.querySelector(".info-user");
infoUser.textContent = userProfile.name + " " + userProfile.login;

const buttons = document.querySelectorAll(".buttons");
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clickedButton = event.target.closest("button"); //отримуємо конкретну натиснуту кнопку
    if (!clickedButton) {
      return;
    }

    selectedHour = clickedButton.textContent;
    const userData = JSON.parse(storedUserData);
    userData.selectedHour = selectedHour;

    console.log(parseInt(userData.selectedHour));
    console.log(userData.selectedHour);

    console.log(userData);
    updateTable(userData);
    localStorage.setItem(key, JSON.stringify(userData));
  });
});

//отримуємо кнопку виходу
const buttonOut = document.querySelector(".button_out");

buttonOut.addEventListener("click", (event) => {
  event.preventDefault();
  // const getButton =  event.target.closest('button_out')

  console.log(userProfile);
  userProfile.aut = false;
  localStorage.setItem(key, JSON.stringify(userProfile));
  console.log(userProfile);
  window.location.href = "/";
});

function updateTable(userData) {
  const tableBody = document.getElementById("tableBody");
  const tableRows = tableBody.querySelectorAll("tr");

  let rowToUpdate = null;

  for (let i = 0; i < tableRows.length; i++) {
    const row = tableRows[i];
    const userIdCell = row.querySelector("td:nth-child(2)");

    if (userIdCell && userIdCell.textContent === userData.numId) {
      rowToUpdate = row;
      break;
    }
  }

  if (rowToUpdate) {
    const hourCell = rowToUpdate.querySelector("td:nth-child(3)");
    if (hourCell) {
      hourCell.textContent = userData.selectedHour;
    }
  } else {
    const newRow = document.createElement("tr");

    const dataCell = document.createElement("td");
    dataCell.textContent = userData.createDate;
    newRow.appendChild(dataCell);

    const numId = document.createElement("td");
    numId.textContent = userData.numId;
    newRow.appendChild(numId);

    const hour = document.createElement("td");
    hour.textContent = userData.selectedHour;
    newRow.appendChild(hour);

    const sumHour = document.createElement("td");
    sumHour.textContent = userData.sumHour;
    newRow.appendChild(sumHour);

    const userName = document.createElement("td");
    userName.textContent = userData.name;
    newRow.appendChild(userName);

    const userLogin = document.createElement("td");
    userLogin.textContent = userData.login;
    newRow.appendChild(userLogin);

    tableBody.appendChild(newRow);
  }
}
