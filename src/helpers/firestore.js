import {addDoc, collection, doc, updateDoc, getDoc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "../utils/firebase";

export async function getCollection(path) {
    try {
        const ref = collection(db, path);
        const q = query(ref);
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
    } catch (e) {
        console.error(e)
        throw e
    }
}

export async function getDocument(path) {
    try {
        const ref = doc(db, path);
        const docSnapshot = await getDoc(ref);
        if (docSnapshot.exists()) {
            return ({...docSnapshot.data(), id: docSnapshot.id})
        } else {
            return undefined;
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const createDoc = async (path, data, id) => {
    try {
        const docData = {...data};
        Object.entries(data).forEach(([k, v]) => {
            if (v === undefined || v === null)
                delete docData[k];
        });

        if (!!id) {
            await setDoc(doc(db, `${path}/${id}`), docData, id);
            return id;
        } else {
            const docRef = await addDoc(collection(db, path), docData);
            return docRef.id;
        }
    } catch (e) {
        console.error(e)
        throw e
    }
};

export const updateDocument = async (path, data, id) => {
    const ref = doc(db, path, id);
    await updateDoc(ref, data);
}
