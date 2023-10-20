const { check } = require('express-validator');

const newCategoryCheck = () => {
    return [
        check('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Category must not be empty')
            .isString()
            .withMessage('Category must be a string'),
    ]
}

module.exports = {
    newCategoryCheck
}