import dotenv from "dotenv";
dotenv.config();
switch (process.env.DB_NAME){
    case 'MongoDB':
        break;
    case 'Firebase':
        break;
}