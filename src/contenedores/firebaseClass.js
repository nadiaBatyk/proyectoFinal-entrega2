import admin from "firebase-admin";
import config from "../config/config.js";
import { ErrorCustom } from "../error/errorCustom.js";


admin.initializeApp({credential:admin.credential.cert({"type": "service_account",
"project_id": "ecommercecoder-3f826",
"private_key_id": "9e5e2cea11d3bed6f1fdeb73bfc273cd32e5f864",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCxdcfV4GlvrzHx\nurv7fSLR/gDEWOjYE/yWkxHwwEp6xEk6OD5uLCcim86Em2962mKbvrxFnLIUhfNg\nqCZZoJ2waSYwOZvujagsGv7B+rP6bL/hCAWWCWImBLlH1cEAO3cmdYQ6iZvYkvRZ\nEpolT2WNy9XzJmcSnPetVjmCNo/ePDOFAe4/65zysjUxP48ue2EJ/eS7KS0NpqDF\nTJZWzoPbhdSuTan3oz+VEF2Uug52vXQNuP8oE3oRqiuSQvQrCa/XlxAlY8FMknOm\nPLR/5cL5PmxKggTbE3YqiWGfcpmYPoMso0JxMr78Fs28G8a96g5ehhvrCWBrRZsC\n/lCw+6I1AgMBAAECggEAK4wZ1RHsBbhiAu3+Nc1kJ1BTu1sPDoE/FWszNpdVX5F9\n37/QECSdGOjPkap7/ZOMKahxVorIh3FEg0ZYHNvlflYbRS/J5E0WRPZ96DefhVc8\n8dmQV1xnnalAl1Bsu2QcTc9+OogsuoV7WUVPltLIOrbXwoJ8vixPOhXD6IB/pvrJ\nkgsOleRfGdwWVM6BScTiH0xpzCDx/h6irH4hkugrT51DhtnsjLLRqIDjqhge6h97\n2R0A06sJ+bfJ7spYN0FT1Q9gR8KaA8+SdkfUyP7u+gM8Q3IUsrVgLuBYZiv90Ifk\nT7mzuxcHItJ2YopAArxsZQ7AJR5bHmSViWuZfoW50QKBgQDkwEIdEJIoHOOisl0F\nrYVpOOj/hAvwZxR2ssfZU5J0eTUpauYulKtFKCZIKmuyc4S/zpKd7hCssVNbBrjw\nw6e4/3eoayNDgTz0v1ea82AMtL6EIwLcdy5lVI1a/ZQ0wiO9+WLhNxIycoVTtAij\ncuVPVER+rehi4ogyzUhW+d5AJQKBgQDGmWj4Mn1vf7jxwnbRPhoNYgkwpJNcGJIk\nzSd6CEfhPZ9ew0F6msqzhlbEKkplSfu973EqED1lDnW1mzXKR6cw4zz6zifOTkiN\nyq/um8GqCxRU2T/bXI8vWt5xC4T1NruHyj46QTXpWsmEbRLKdDY60vRK3knUIYkA\naEfb3+700QKBgQCM749MTPtfz3zIrs/1QZWi4LddRkP81+WZxEixM3ZWYJ9KZ1xu\ncpabQ0NizxAPoHC3pFRdDWIkpBRRTvD/FezuZCebEndljei6enFFPJF/ApUm4FNQ\n9fUV5WQ6HWYEo2BWGaK8U6vYfQp8Kb3wxkdV+vtAeXFmC2ASvLvHKqeuKQKBgQCN\narIngnR1kAJXDL1k1A7jFrsqixZvjwOJ9xg0Om9MwX+Zj/oxXsYWPgPM3bxqEduT\n7UuswzGkoz5IWkRcTNeN5VIH2gLYUkAxz3Glu/2Uox0QKj7hajB/bPpWjvhXUGkL\nEYVsIAFOsJoslSq7RTNUgeD46v6xckvHIXqB5ByY8QKBgQDJlruMEUt2L7vvRUy4\nkJBt4CeRIh3lYpptV+tOE+doYW1J2swA5AYMy9WggbEOERGrJKFH5o+9IscNUmfL\n4laG4vLwgVvxbyrym9dOVxu+ElOIxtXaJo8vlxTxPIdu9cYXEtNgZ8CrYMtOwceZ\nIwqfrEZrC8r1pq4kt+MzRotTsw==\n-----END PRIVATE KEY-----\n",
"client_email": "firebase-adminsdk-iehys@ecommercecoder-3f826.iam.gserviceaccount.com",
"client_id": "108222584188883471150",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iehys%40ecommercecoder-3f826.iam.gserviceaccount.com"})});

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