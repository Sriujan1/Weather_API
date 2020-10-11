console.log("Client side JS file is loaded")

const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent =''
            msg2.textContent = data.error
        }else{
            
            msg1.textContent =data.location
            msg2.textContent = data.forecastData
        }
    })
})
})