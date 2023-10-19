const { check } = require('express-validator');

const newEngravingCheck = () => {
    return [
        check('label')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Name must not be empty')
            .isString()
            .withMessage('Name must be a string'),
        check('image_url')
            .trim()
            .optional({ values: 'falsy' })
            .isString()
            .withMessage('Image url must be a string'),
    ]
}

module.exports = {
    newEngravingCheck,
}