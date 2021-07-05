let btn = document.getElementsByClassName('form__button')[0]
let spinner = document.getElementsByClassName('spinner')[0]
let checkbox = document.getElementsByClassName('checkbox')[0] != undefined ? document.getElementsByClassName('checkbox')[0].checked : true


btn.addEventListener('click', initializeSpinner)

function initializeSpinner(){
    let checkbox = document.getElementsByClassName('checkbox')[0] != undefined ? document.getElementsByClassName('checkbox')[0].checked : true
    if (checkbox){
    console.log('working')
    spinner.style.display = 'flex' 
    }   
}