const ukr = document.querySelector('.language_ukr')
const brt = document.querySelector('.language_brt')
const arrLanguage = ['brt', 'ukr', 'pl']

//отримуємо кнопку мови
const ukrElement = document.querySelector('.language_ukr a');
const brtElement = document.querySelector('.language_brt a');
const plElement = document.querySelector('.language_pl a');

//при натиску на кнопку викликаємо функцію
ukrElement.addEventListener('click', getLangueage)
brtElement.addEventListener('click', getLangueage)
plElement.addEventListener('click', getLangueage)


//в цій функції отримуємо користувача по ідентифікатору, і значення з посилання язика з атрибута value
//і додаємо до url параметра 
function getLangueage(event) {
  event.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  const languageValue = event.target.closest('a').getAttribute('value');
  location.href = window.location.href = "user_account.html?id=" + userId + '#' + languageValue
  
}

window.addEventListener('hashchange', changeLanguage);

function changeLanguage(){
  let getHash = window.location.hash
  getHash = getHash.substring(1)//код язика

  if(!arrLanguage.includes(getHash)){
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    location.href = window.location.href = "user_account.html?id=" + userId + '#brt'
  }
  const pageTitle = document.querySelector('title').innerHTML = langArr['title'][getHash]
  const date = document.querySelector('.lng_date').textContent = langArr['date'][getHash]
  const numid = document.querySelector('.lng_numid').textContent = langArr['numid'][getHash]
  const hour = document.querySelector('.lng_hour').textContent = langArr['hour'][getHash]
  const sum = document.querySelector('.lng_sum').textContent = langArr['sum'][getHash]
  const name = document.querySelector('.lng_name').textContent = langArr['name'][getHash]
  const login = document.querySelector('.lng_login').textContent = langArr['login'][getHash]

}

changeLanguage()
