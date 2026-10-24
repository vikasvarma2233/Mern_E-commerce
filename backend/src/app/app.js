import express from 'express';
import router from '../router/auth.router.js';
import cookieParser from 'cookie-parser'
import products from '../router/product.router.js'


const app = express();

app.use(express.json())
app.use(cookieParser())



app.use("/api/auth", router)
app.use("/api/products",products)


export default app;