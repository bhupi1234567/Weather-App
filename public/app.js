console.log('client side java sript is loded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('#search')

const msg_one = document.querySelector('#message-1')

//const msg_two = document.querySelector('#message-2')
//msg_one.textContent = 'This is javaScript'

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    //prevent browser from reloading while submitting form
    const location = search.value
    //console.log(location)
    msg_one.textContent='Loading...'
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data)=> {
            if(data.error){
               // console.log(data.error)
                msg_one.textContent = data.error
            }else{

            const temperature = data.temperature
            const place = data.Place
            const summary = data.summary
            console.log(data.daily)
            //console.log(temperature,place)
            msg_one.textContent = temperature+' '+ place+', '+summary
            }
        })       
    })
    
})