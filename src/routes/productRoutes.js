import { Router } from "express";
import * as daos   from "../daos/index.js";

const routerProducts = Router();



routerProducts.route('/')
.get(daos.productDao.getProducts)
.post(daos.productDao.createProduct)

routerProducts.route('/:id')
.get(daos.productDao.getProducts)
.put(daos.productDao.updateProduct)
.delete(daos.productDao.deleteProduct);


export default routerProducts;