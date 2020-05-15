const models = require('../models')

const getAllProducts = async (request, response) => {
  const products = await models.Products.findAll({
    include: [{ model: models.Manufacturers }]
  })

  return response.send(products)
}

const getProductsByidentifier = async (request, response) => {
  const { identifier } = request.params

  const product = await models.Products.findOne({
    include: [{ model: models.Manufacturers, attributes: ['id', 'name', 'country'] }],
    attributes: ['id', 'name', 'yearIntroduced'],
    [models.Op.or]: [
      { id: { [models.Op.like]: `%${identifier}%` } },
      { name: { [models.Op.like]: `%${identifier}%` } },
    ]
  })

  return product
    ? response.send(product)
    : response.sendStatus(404)
}

module.exports = { getAllProducts, getProductsByidentifier }
