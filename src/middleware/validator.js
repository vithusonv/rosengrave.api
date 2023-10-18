const { body } = require('express-validator');

const newProductCheck = () => {
    return [
        body('name', 'Invalid product name').isString().trim().notEmpty().isLength({ min: 1 }),
        body('price', 'Invalid price').notEmpty().isNumeric(),
        body('description', 'Invalid description').isString().trim().notEmpty({ nullable: true })
    ]
}

module.exports = {
    newProductCheck,
}