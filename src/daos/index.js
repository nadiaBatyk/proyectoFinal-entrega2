import MongoDBProducts from "./products/MongoDBProducts.js";
import dotenv from "dotenv";
import MongoDBCart from "./cart/mongoDBCart.js";
dotenv.config();

let productDao,cartDao;
    switch (process.env.DB_NAME){
        case 'MongoDB':
            productDao= new MongoDBProducts();
            cartDao= new MongoDBCart();
            break;
            
        case 'Firebase':
            break;
    }

    
export {productDao,cartDao};


