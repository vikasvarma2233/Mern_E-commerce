import {body,validationResult} from 'express-validator'




 export const addToCartValidator = [

    body("productId")
    .exists().withMessage("Product id is Required").bail()
    .isString().withMessage("Product ID must be String").bail()
    .isMongoId().withMessage("Product ID must be a mongo db Id"),


    body("quantity")
    .exists().withMessage("Quantity is required").bail()
    .isInt({min: 1}).withMessage("Quantity must be an integer greater than 0"),
    
    body("size")
    .exists().withMessage("Size is Required").bail()
    .isString().withMessage("Size must be string").bail()
    .isIn(["XS","S","M","L","XL","XXL"]).withMessage("size must be one XS S M L XL XXL"),


    (req,res,next)=>{
           const errors = validationResult(req);

           if(!errors.isEmpty){
              return res.status(400).json({
                message:"Validation failed",
                errors: errors.array()
              })
           }

           next()
    }
]