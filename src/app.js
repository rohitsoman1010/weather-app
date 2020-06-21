const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
//
console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))

const app = express()
//Manage path
staticDirPath=path.join(__dirname,'../public')
viewPath=path.join(__dirname,'../templates/views')
partialsPath=path.join(__dirname,'../templates/partials')
//manage handlebars config
app.set('view engine','hbs') //handlebars for express
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(staticDirPath))

app.get('/',(req,res)=>{   //load index.hbs


    res.render('index',{title:'Weather App', name:'Rohit Soman'})

})


app.get('/about',(req,res)=>{

    res.render('about',{title:'About Me', name:'Rohit Soman'})

})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
  return res.send({error:'Please provide an address!!'})

    }
    const address = req.query.address
    geocode.getgeocode(address,(err,{location,longitude,lattitude}={} )=>{
        if (err){
            return res.send({error:err})
        } else {
            //console.log(location)
            var coordinate=lattitude + ","+ longitude
            console.log(coordinate)
    
            forecast.getforecast(coordinate,(err,{temperature, feelslike}={})=>{ //ES6 default parameter= {}
                if (err){
                    return res.send({error:err})
                }else {
                    return res.send({location: location,
                              temperature:temperature, 
                              feelslike:feelslike
                            })
                }

            
            })
        }
    
})

})

app.get('/help/*',(req,res)=>{

    res.render('404',{title:'404', name:'Rohit Soman',errorMsg:'Help Article Not Found!!'})

})

app.get('/help',(req,res)=>{

    res.render('help',{title:'Help', name:'Rohit Soman'})

})

app.get('*',(req,res)=>{

    res.render('404',{title:'404', name:'Rohit Soman',errorMsg:'Page Not Found!!'})

})
app.listen(3000,()=>{
    console.log('Server up and running on port 3000')
})