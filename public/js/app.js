console.log('client side JS is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const successMessage= document.querySelector('#success')
const errorMessage= document.querySelector('#error')



weatherForm.addEventListener('submit',(e)=>{  //e: event
    e.preventDefault()  // prevents browser from reloading page after user clicks on search button (default behaviour)
    const location = search.value
    console.log(location)
    successMessage.textContent='Loading...'
    errorMessage.textContent=''
    const url='http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{

    response.json().then((data)=>{
    if (data.error){
        console.log(data.error)
        successMessage.textContent=data.error
    }else {
    successMessage.textContent='Weather Info for location:'+data.location + 'is Temperature: '+data.temperature+ '& Feels like: '+data.feelslike
    }
})
})
})