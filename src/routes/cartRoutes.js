import { Router } from "express";
import * as daos   from "../daos/index.js";

const routerCart = Router();

routerCart.route("/").post(daos.cartDao.createCart);

routerCart.route("/:id").delete(daos.cartDao.deleteCart);

routerCart.route('/:id/productos')
.get(daos.cartDao.getAllProductsInCart)
.post(daos.cartDao.addProduct)

routerCart.route('/:id/productos/:id_prod').delete(daos.cartDao.deleteProductFromCart)

export default routerCart;