const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', ({ restaurants: restaurantList }))
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  if(!req.query.keyword) {
    return res.redirect('/')
  }
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.filter(function (restaurant) {
    const searchByName = restaurant.name.trim().toLowerCase().includes(keyword)
    const searchByCategory = restaurant.category.trim().toLowerCase().includes(keyword)
    return searchByName || searchByCategory
  })
  res.render('index', { restaurants, keyword })
})

app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})