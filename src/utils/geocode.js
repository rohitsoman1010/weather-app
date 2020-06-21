const request = require ('request')

const getgeocode = (address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?&limit=1&access_token=pk.eyJ1Ijoicm9oaXRzb21hbjEwMTAiLCJhIjoiY2tiaW80cHhwMGgxNDJ1cXZueTY1aHFldyJ9.j5Jl788-t7TyL7kG_QqDOg'
    request ({url,json:true},(err,{body})=>{
        if (err){
            callback('Unable to connect to the location service!!',undefined)
        } else if (body.features.length ===0) {
            callback('Unable to determine the location. Please try to modify the search',undefined)
        } else {
            response = { 
                location: body.features[0].place_name,
                lattitude: body.features[0].center[1],
                longitude: body.features[0].center[0]

            }
            callback(undefined,response)
        }

    })
}

module.exports= {
    getgeocode:getgeocode
}
