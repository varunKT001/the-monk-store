let btn = document.getElementsByClassName('form__button')[0]
let spinner = document.getElementsByClassName('spinner')[0]

btn.addEventListener('click', initializeSpinner)

function initializeSpinner(){
    console.log('working')
    spinner.style.display = 'flex'    
}