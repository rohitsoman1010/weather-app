const request = require('request')
const getforecast= (geocode,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=50d0cc388c0719688ecb2032d1dce16d&query='+geocode
    request({url,json:true},(err,{body})=>{
        if(err){
            callback('Unable to connect to weather API!!',undefined)
        } else if (body.error){
            callback('Please specify a valid location!!',undefined)
        } else {
            response={ 
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            }
            callback(undefined,response)
        }

    })
}

module.exports={
    getforecast:getforecast
}