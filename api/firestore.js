// src/api/firestore.js
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import FoodItem from "../models/FoodItem";

const inventory = collection(db, "inventory");
console.log(inventory)

/**
 * Fetches food items which are now in the fridge (i.e. where the "in_fridge" field is true).
 * 
 * @returns {Promise<Array<FoodItem>>} A promise that resolves to an array of food item objects.
 */
export const fetchInFridgeItems = async () => {
    const q = query(inventory, where("in_fridge", "==", true));
    const snapshot = await getDocs(q);
    // doc_id, name, quantity, danger, category, expiration_date, user_defined, in_fridge
    return snapshot.docs.map(doc => new FoodItem(
        doc.id,
        doc.data().name,
        doc.data().quantity,
        doc.data().danger,
        doc.data().category,
        doc.data().expiration_date,
        doc.data().user_defined,
        doc.data().in_fridge,
        // doc.data().createdAt.toDate() // Convert Firestore timestamp to Date object
    ));
};

/**
 * Add a food item in the collection.
 * 
 * @param {FoodItem} item Food item storing to the database.
 * @returns {string} Document id of the food item in collection.
 */
export const addFoodItem = async (item) => {
    const docRef = await addDoc(inventory, item);
    return docRef.id;
};

/**
 * Update food item in the collection.
 * 
 * @param {string} id Document id of the food item in collection to update.
 * @param {FoodItem} updatedData Food item updating to the database.
 * @returns {string} Document id of the food item in collection.
 */
export const updateFoodItem = async (id, updatedData) => {
    const docRef = doc(inventory, id);
    await updateDoc(docRef, updatedData);
};

/**
 * Delete food item in the collection.
 * 
 * @param {string} id Document id of the food item in collection to delete.
 */
export const deleteFoodItem = async (id) => {
    try {
        const docRef = doc(inventory, id);
        await deleteDoc(docRef);
        console.log(`Food item with id ${id} has been deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting food item ${id}: ${error}`);
    }
};
