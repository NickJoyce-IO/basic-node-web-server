const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

const port = process.env.PORT || 3000

// Set up to use partials served from the folder /views/partials
hbs.registerPartials(__dirname + '/views/partials')

// set the view engine in express to use handlebars
app.set('view engine', 'hbs')

// logger functionality - prints the time HTTP method and route to both the console and server.log
app.use((req, res, next) => {
    const now = new Date().toString()
    const log = `${now} ${req.method} ${req.url}`
    
    console.log(log)
    
    fs.appendFile('server.log', log  + '\n', (err) => {
        if (err) {
        console.log('Unable to append to server.log')
    }})
    next()
})

// Use this when you want to put the site into maintenance mode. No next()
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         maintenanceMessage: 'Site is currently down for maintenance, please come back later'
//     })
// })

// Set up a public directory to serve static content
app.use(express.static(__dirname + '/public'))

// Sets up a helper to return the current year which can be used in hbs
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

// A helper that takes an arugment and prints it to the screen
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Nick!</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my wesbite using moustache!'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'You have hit an error'
    })
})

// Dynamic port set for Heroku
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
