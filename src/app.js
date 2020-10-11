const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express Config 
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup Handlers engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req,res) => {
    res.render('index',{
        name: 'Sriujan Harihar',
        title: 'Weather App'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About me",
        name: "Sriujan Harihar"
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help Page",
        description: "No help as of now",
        name: "Sriujan Harihar"
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address!" 
        })
    }
    geocode(req.query.address,(error,data) => {
        if(error){
            res.send({
                error: error
            })
        }else{
            forecast(data.latitude,data.longitude,(error,fdata) => {
                if(error){
                    res.send({
                        error: error
                    })
                }else{
                    res.send({
                        location: data.location,
                        address: req.query.address,
                        forecastData: fdata
                    })
                }
            })
        }
    })
})

app.get('/help/*',(req,res) => {
    res.render('error404',{
        title:'404',
        message: 'Help article not found',
        name: 'Sriujan Harihar'
    })
})

app.get('*',(req,res) => {
    res.render('error404',{
        title: '404',
        message: '404: Page not found',
        name: "Sriujan Harihar"
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})