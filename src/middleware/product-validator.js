const { check } = require('express-validator');

const newProductCheck = () => {
    return [
        check('description')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Description must not be empty')
            .isString()
            .withMessage('Description must be a string'),
        check('price')
            .isNumeric()
            .withMessage('Price must be a number')
            .custom((value) => {
                if (value < 0) {
                    throw new Error('Price must not be a negative number');
                }
                return true;
            }),
        check('name')
            .trim()
            .exists({ values: 'falsy' })
            .withMessage('Name must exist')
            .isString()
            .withMessage('Name must be a string'),
    ]
}

module.exports = {
    newProductCheck,
}