import {createDoc} from "./firestore";
import {collection, getDocs, limit, query, where} from "firebase/firestore";
import {db} from "../utils/firebase";

const MISSIONS = `missions`;

export const getMissionForUser = async ({userId, groupId}) => {
    if (userId) {
        try {
            const ref = collection(db, MISSIONS);
            const q = query(ref,
                where('assigneeId', '==', userId),
                where('groupId', '==', groupId),
                limit(1));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))[0];
        } catch (e) {
            console.error(e)
            throw e
        }
    }
};

export const getMissionByUser = async ({userId, groupId}) => {
    if (userId) {
        try {
            const ref = collection(db, MISSIONS);
            const q = query(ref,
                where('creatorId', '==', userId),
                where('groupId', '==', groupId),
                limit(1));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))[0];
        } catch (e) {
            console.error(e)
            throw e
        }
    }
};


export const createMission = async ({userId, missionText, groupId}) => {
    return createDoc(MISSIONS, {groupId, creatorId: userId, missionText});
};

