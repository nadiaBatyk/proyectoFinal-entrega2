import { Router } from "express";
import productDao   from "../daos/index.js";

const routerProducts = Router();



routerProducts.route('/')
.get(productDao.productDao.getProducts)
.post(productDao.productDao.createProduct)

routerProducts.route('/:id')
.get(productDao.productDao.getProducts)
.put(productDao.productDao.updateProduct)
.delete(productDao.productDao.deleteProduct);


export default routerProducts;