import FirebaseClass from "../../contenedores/firebaseClass.js";

class FirebaseCart extends FirebaseClass{
    constructor(){
        super('Carts')
    }
    createCart = (req, res, next) => {
        let body = req.body;
    
        super.create(body).then(
          (item) => {
            return res.json(item);
          },
          (error) => next(error)
        );
      };
      deleteCart = (req, res, next) => {
        let { id } = req.params;
        if (id) {
          super.deleteById(id).then(
            (item) => {
              return res.status(200).json(item);
            },
            (error) => next(error)
          );
        }
      };
      getAllProductsInCart = (req, res, next) => {
        let { id } = req.params;
        if (id) {
          super.getProductsInCart(id).then(
            (item) => {
              return res.status(200).json(item);
            },
            (error) => next(error)
          );
        }
      };
      addProduct = (req, res, next) => {
        let { id } = req.params;
        let body = req.body;
        super.addProductToCart(body, id).then(
          (item) => {
            return res.json(item);
          },
          (error) => next(error)
        );
      };
      deleteProductFromCart = (req, res, next) => {
        let { id: idCart, id_prod: idProduct } = req.params;
        if (idCart) {
          super.deleteProductFromCart(idProduct,idCart).then(
            (item) => {
              return res.status(200).json(item);
            },
            (error) => next(error)
          );
        }
      };
    }
    export default FirebaseCart;