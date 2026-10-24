import {body, validationResult} from 'express-validator'



export const createProductValidator = [
    body("title")
    .exists().withMessage("Title is Required").bail()
    .isString().withMessage("Title must be a String").bail()
    .trim()
    .isLength({min:2,max:100}).withMessage("Title length must be between 2 to 100 characters")
    .isAlpha("en-US",{ignore:" -"}).withMessage("Title can only have english small case and capital case characters"),

    body("description")
    .exists().withMessage("Description is Required").bail()
    .isString().withMessage("Description must be String").bail()
    .trim()
    .isLength({min:20, max:500}).withMessage("Description length must be between 20 to 500 characters").bail(),

    body("price.amount")
    .exists().withMessage("price amount is Required").bail()
    .isFloat({min:0}).withMessage("Price amount must be a floating number and must be greater than 0"),

    body("price.currency")
    .exists().withMessage("Currency is Required")
    .isString().withMessage("Currency must be a string value")
    .isIn(["INR","USD"]).withMessage("Currency either be INR or USD"),

    body("sizes")
    .exists().withMessage("Sizes are required").bail()
    .isArray().withMessage("Sizes must be an array of object"),
    body("sizes.*.size")
    .exists().withMessage("size must be present in every entry of sizes array").bail()
    .trim()
    .isString().withMessage("size musst be a string value").bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("size can be one of these XS, S, M, L, XL, XXL"),

    body("sizes.*.stock")
    .exists().withMessage("stock must be present in every entry of the sizes array ").bail()
    .isInt({min : 0}).withMessage("Stock must be a integer value").bail(),

    (req,res,next)=>{

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message: "invalid Request",
                errors: errors.array()
            })
        }
        next()
    }
    


    
]

