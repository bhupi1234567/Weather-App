const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const request = require('request')
// console.log(path.join(__dirname,'../public'))

//defined path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials') 


// Setup handlebar engine
app.set('view engine','hbs')

// setting path of view, By default the name of handlebar shall be views but now its templates/views so we have to specify it

app.set('views',viewsPath)

hbs.registerPartials(partialsPath)
//It is a npm module Used for creating dynamic templates, it's a teamplate engine (handlebars)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// console.log(__dirname)
// console.log(__filename)
// above are the two default variables that provide current path and filename

app.get('',(req,res) =>{
    res.render('index', {
        title:'Weather App',
        name:'bhupendra'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'provide some address'
        })
    }
    const Lan = req.query.lang
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,place})=>{
       // const latitude = data.latitude
       // const longitude = data.longitude
        //const place = data.place
       // console.log(latitude,longitude)
       // console.log(req.query.lan)
        const url= 'https://api.darksky.net/forecast/ba93847a0f16538a756efd55cbcf9809/'+longitude+','+latitude+'?units=si'
        request({ url: url , json:true},(error,response)=>{
           // console.log(data)
           if(error){
               res.send({
                   error: 'unable to connect to server!'})
           }else if(response.body.code){
               res.send(response.body.error)
           }else{
               console.log(place,response.body.currently.temperature)
           res.send({
               temperature:response.body.currently.temperature+'˚C',
               Place: place,
               summary:response.body.currently.summary,
               daily:response.body.daily
             })
           }
           //console.log(response.body)
        })
        
        })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        name:'Bhupendra'
    })
})
app.get('/help',(req,res) =>{
    res.render('help',{
        helptext:'We are here to help you'
    })
})

app.get('/products',(req,res) =>{

    if(!req.query.search){
        return res.send({
            error: 'please provide some search '
        })
    }
    //console.log(req.query)

   res.send({
       products:[1,2,3]
   })

})
app.get('/help/*',(req,res) =>{
    res.render('404.hbs',{
        errormessage:'Help article not found'
    })
})
 
// * is used to everything 
app.get('*',(req,res) =>{
    res.render('404.hbs',{
        errormessage:'Page Not Found'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})


// index.hbs is searched in views directory so it is necessery to set path
// if it is not public