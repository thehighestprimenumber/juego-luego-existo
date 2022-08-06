const firebaseAdmin = require("firebase-admin");
const functions = require("firebase-functions")
const shuffle = require("lodash.shuffle");

firebaseAdmin.initializeApp()
const doAssign = async (context, data) => {
    const db = firebaseAdmin.firestore();
    if (!context.auth || !context.auth.uid) {
        throw new functions.https.HttpsError("unauthenticated", "The function must be called with a logged in user");
    }
    const {groupId} = data;
    if (!groupId) {
        throw new functions.https.HttpsError("not-found", "No groupId found");
    }
    const snapshot = await db.collection("missions").where("groupId", "==", groupId).get();
    if (snapshot.empty) {
        console.log("No matching documents.");
        return;
    }
    const missions = []
    snapshot.forEach((doc) => missions.push({id: doc.id, ...doc.data()}));

    const shuffled = shuffle(missions)
    const eventUserIds = shuffled.map(({creatorId}) => creatorId)
    const first = eventUserIds.shift()
    const shiftedUserIds = [...eventUserIds, first]
    await Promise.all(shuffled.map((mission, i) =>
        db.collection("missions").doc(mission.id).update({assigneeId: shiftedUserIds[i]})
    ))
    return true;
}

exports.assignMissions =
    functions.https.onCall((data, context) => doAssign(context, data));
