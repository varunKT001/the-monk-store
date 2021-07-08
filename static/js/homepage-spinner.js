let btn1 = document.getElementsByClassName('spinner-btn')[0]
let btn2 = document.getElementsByClassName('spinner-btn')[1]
let spinner = document.getElementsByClassName('spinner')[0]

btn1.addEventListener('click', initializeSpinner)
btn2.addEventListener('click', initializeSpinner)

function initializeSpinner(){
    console.log('working')
    spinner.style.display = 'flex' 
}