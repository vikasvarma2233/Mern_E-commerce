import productModel from "../model/product.model.js"



export const createProduct = (req,res)=>{


    console.log(req.body)

    return res.status(201).json({
        message:"user product created successfully.."
    })

}