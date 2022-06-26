import MongoDBProducts from "./products/MongoDBProducts.js";
import dotenv from "dotenv";
import MongoDBCart from "./cart/mongoDBCart.js";
import FirebaseProducts from "./products/firebaseProducts.js";
import FirebaseCart from "./cart/firebaseCart.js";
dotenv.config();

let productDao,cartDao;
    switch (process.env.DB_NAME){
        case 'MongoDB':
            productDao= new MongoDBProducts();
            cartDao= new MongoDBCart();
            break;
            
        case 'Firebase':
            productDao = new FirebaseProducts();
            cartDao = new FirebaseCart();
            break;
    }

    
export {productDao,cartDao};


