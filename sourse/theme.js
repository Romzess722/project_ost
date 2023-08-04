//add theme dark
document.querySelector('.themetoggle').addEventListener('click', (event) =>{
  event.preventDefault()
  if(localStorage.getItem('theme') === 'dark'){
    localStorage.removeItem('theme')
  }else{
    localStorage.setItem('theme', 'dark')
  }
  addDarkTheme()
})

function addDarkTheme(){
  try {
    if (localStorage.getItem('theme') === 'dark'){
      document.querySelector('html').classList.add('dark')
      document.querySelector('.themetoggle span').textContent = 'dark_mode'
    }else{
      document.querySelector('html').classList.remove('dark')
      document.querySelector('.themetoggle span').textContent = 'clear_day'
    }
  }catch (err) {} 
}
addDarkTheme()