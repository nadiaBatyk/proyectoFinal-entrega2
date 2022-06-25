import MongoDBProducts from "./products/MongoDBProducts.js";
import dotenv from "dotenv";
dotenv.config();

let productDao
    switch (process.env.DB_NAME){
        case 'MongoDB':
            productDao= new MongoDBProducts();
            break;
            
        case 'Firebase':
            break;
    }

    
export default{productDao};


