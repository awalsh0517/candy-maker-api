const models = require('../models')

const getAllManufacturers = async (request, response) => {
  const manufacturers = await models.Manufacturers.findAll({
    include: [{ model: models.Products }]
  })

  return response.send(manufacturers)
}

const getManufacturerByIdentifier = async (request, response) => {
  const { identifier } = request.params

  const manufacturer = await models.Manufacturers.findOne({
    include: [{ model: models.Products, attributes: ['id', 'name', 'yearIntroduced'] }],
    attributes: ['id', 'name', 'country'],
    where: {
      [models.Op.or]: [
        { id: { [models.Op.like]: `%${identifier}%` } },
        { name: { [models.Op.like]: `%${identifier}%` } },
      ],

    }
  })

  return manufacturer
    ? response.send(manufacturer)
    : response.sendStatus(404)
}

module.exports = { getAllManufacturers, getManufacturerByIdentifier }
