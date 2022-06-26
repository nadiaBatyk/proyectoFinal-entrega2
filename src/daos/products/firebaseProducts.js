import FirebaseClass from "../../contenedores/firebaseClass.js";

class FirebaseProducts extends FirebaseClass{
    constructor(){
        super('Products')
    }
    isAdmin=true;
    getProducts= (req, res, next)=> {
      //muestro todos los productos disponibles o si me pasan id, solo ese prod
      let { id } = req.params;
      if (id) {
        super.getById(id).then(
          (product) => {
            return res.json(product);
          },
          (error) => {
            console.log(error);
            return next(error);
          }
        );
      } else {
        super.getAll().then(
          (lista) => {
            return res.json(lista);
          },
          (error) => next(error)
        );
        //pasa todo el array de productos en el json
      }
    }
    createProduct = (req, res, next) => {
      
      if (!this.isAdmin) {
        return res.status(401).json({
          error: 401,
          description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
        });
      }
      let body = req.body;
      
      super.create(body).then(
        (item) => {
          return res.json(item);
        },
        (error) => next(error)
      );
    }
  
    updateProduct =(req, res, next) => {
      let isAdmin=true;
      if (!isAdmin) {
        return res.status(401).json({
          error: 401,
          description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
        });
      }
      let { id } = req.params;
      let body = req.body;
      if (id) {
        //si pasa el id actualiza el producto y pasalo al json
        super.update(body).then(
          (item) => {
            return res.status(200).json(item);
          },
          (error) => next(error)
        );
      }
    }
    deleteProduct=(req, res, next) =>{
      let isAdmin=true;
      if (!isAdmin) {
        return res.status(401).json({
          error: 401,
          description: `Route: ${req.url}, Method: ${req.method} Unauthorized`,
        });
      }
      let { id } = req.params;
      if (id) {
        //si pasa el id borra el producto y pasalo al json
        super.deleteById(parseInt(id)).then(
          (item) => {
            return res.status(200).json(item);
          },
          (error) => next(error)
        );
      }
    }
  }
  export default FirebaseProducts;