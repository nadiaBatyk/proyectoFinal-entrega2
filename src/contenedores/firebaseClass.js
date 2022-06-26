import admin from "firebase-admin";
import config from "../config/config.js";
import { ErrorCustom } from "../error/errorCustom.js";


admin.initializeApp({credential:admin.credential.cert(config.firebase.serviceAcc)});

class FirebaseClass {
  constructor(colectionName) {
    this.db = admin.firestore();
    this.collectionRef = this.db.collection(colectionName);
    this.fieldValue=admin.firestore.FieldValue;
  }
  async getAll() {
    try {
      const snapshot = await this.collectionRef.get();
      const rawData = snapshot.docs;
      const response = rawData.map((doc) => ({ id: doc.id, ...doc.data() }));
      return response;
    } catch (error) {
      const err = new ErrorCustom(error, 500, "Error");
      throw err;
    }
  };
  async getById(id){
    try {
      const docRef = this.collectionRef.doc(id);
      const rawData = await docRef.get();
      if (rawData.exists) {
        return rawData.data();
      }
      const err = new ErrorCustom("Item no encontrado", 404, "Not found");
      throw err;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async create(item) {
    try {
      const newItem = await this.collectionRef.add(item);
      if (newItem) {
        return newItem;
      }
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async update(item,id){
    try {
      const docRef = this.collectionRef.doc(`${id}`);
      const rawData = await docRef.update({id:id,...item});
      if (rawData) {
        return rawData;
      }
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async deleteById(id) {
    try {
      const docRef = this.collectionRef.doc(`${id}`).delete();
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async getProductsInCart(idCart)  {
    try {
      const docRef = this.collectionRef.doc(idCart);
      const rawData = await docRef.get();
      if (rawData.exists) {
        return rawData.data().products
      }
      const err = new ErrorCustom("Item no encontrado", 404, "Not found");
      throw err;
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async deleteProductFromCart(idProduct, idCart) {
    try {
      const docRef = this.collectionRef.doc(idCart);
      const rawData = await docRef.update({products:this.fieldValue.arrayRemove({id:idProduct})})
      
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
  async addProductToCart(product, idCart)  {
    try {
      const docRef = this.collectionRef.doc(idCart);
      const rawData = await docRef.update({products:this.fieldValue.arrayUnion(product)})
      
    } catch (error) {
      if (error instanceof ErrorCustom) {
        throw error;
      } else {
        const err = new ErrorCustom(error, 500, "Error");
        throw err;
      }
    }
  };
}
export default FirebaseClass;