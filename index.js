const express = require('express')
const { getAllManufacturers, getManufacturerByIdentifier } = require('./controllers/manufacturers')
const { getAllProducts, getProductsByidentifier } = require('./controllers/products')

const app = express()

app.get('/manufacturers', getAllManufacturers)

app.get('/manufacturers/:identifier', getManufacturerByIdentifier)

app.get('/products', getAllProducts)

app.get('/products/:identifier', getProductsByidentifier)

app.listen(1337, () => {
  console.log('Listening on port 1337...') // eslint-disable-line no-console
})
