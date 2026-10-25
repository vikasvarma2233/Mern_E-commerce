import {json, Router} from 'express'
import { authenticate } from '../middlewares/auth.middleware.js';
import { createProduct, listAllProducts } from '../controller/product.controller.js';
import multer from 'multer'
import  {createProductValidator}  from '../validator/product.validator.js';

const upload = multer({storage : multer.memoryStorage(),
    limits:{
        files: 5,
        fileSize: 5 * 1024 * 1024
    }
})




const router = Router();



router.post("/",authenticate, (req,res,next)=>{

    if(req.user.role !== "seller"){
        return res.status(400).json({
            message:"user is not authorize to create products"
        })
    }
    next()
},upload.array("images"),(req,res,next)=>{

    req.body.price = JSON.parse(req.body.price)
    req.body.sizes = JSON.parse(req.body.sizes)

    next()

},createProductValidator,createProduct)


router.get("/",authenticate,listAllProducts)



export default router