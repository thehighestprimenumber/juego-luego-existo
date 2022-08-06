import {createDoc, getDocument, updateDocument} from "./firestore";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../utils/firebase";
import {toJsTime} from "./date.js";

const GROUPS = 'groups'
export const getGroups = async () => {
    try {
        const ref = collection(db, GROUPS);
        const q = query(ref)
            // where('dateEnd', '==', false));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), dateEnd: toJsTime(doc.data().dateEnd)}));
    } catch (e) {
        console.error(e)
        throw e
    }
};

export const getGroup = async (groupId) => {
    const {dateEnd, ...group} = await getDocument(`${GROUPS}/${groupId}`);
    return {...group, dateEnd: toJsTime(dateEnd)}
}

export const createGroup = ({description, userId}) => createDoc(GROUPS, {
    description,
    ownerId: userId,
});

export const updateGroup = ({dateEnd, groupId}) => updateDocument(GROUPS, {
    dateEnd: dateEnd.toDate()
}, groupId);
