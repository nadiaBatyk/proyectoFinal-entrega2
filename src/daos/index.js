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

 async function daosCarrito(){
    switch (process.env.DB_NAME){
        case 'MongoDB':
            const {MongoDBProducts} = await import("./products/MongoDBProducts");
            return new MongoDBProducts();
            
        case 'Firebase':
            break;
    }
}
