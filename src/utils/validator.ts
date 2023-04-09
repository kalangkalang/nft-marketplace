import { body } from 'express-validator';


const forbiddenWordsRegex = /(gay|lesbian|sex)/i;
const allowedCategoriesRegex = /(photo|sketch|cartoon|animation)/i;

const createProductValidator = [
    body('product_name').notEmpty().isString().trim().isLength({min: 10}).custom((value) => {
        if (forbiddenWordsRegex.test(value)) {
            throw new Error('Text contains forbidden words');
          }
        return true;
    }),
    body('rating').notEmpty().isInt({ min: 0, max:5 }).withMessage('Rating value mustbe an integer and must be between 0 and 5'),
    body('category').notEmpty().isString().trim().custom((value) => {
        if (!allowedCategoriesRegex.test(value)) {
            throw new Error('Category must be one of this value : ');
          }
        return true;
    }),
    body('image_url').notEmpty().isURL().withMessage('Url is invalid'),
    body('reputation').notEmpty().isInt({ min: 0, max:1000}),
    body('price').notEmpty().isInt().withMessage('Price value must be an integer')
];


export default {
    createProductValidator
}