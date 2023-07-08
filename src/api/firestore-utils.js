import { collection, doc, getDoc, getDocs, query, runTransaction, where } from 'firebase/firestore/lite';

import { db } from './firestore.conf';

const getQuestionsForUser = async (collectionName, userAddress) => {
    const response = await getDocs(query(collection(db, collectionName), where('userId', '==', userAddress)));
    let questions;
    if (!response.empty) {
        questions = response.docs.map((q) => {
            id: q.id;
            item: q.data();
        });
    } else {
        questions = [];
    }
    return questions;
};

const getDocument = async (collectionName, docName) => {
    return await getDoc(doc(db, collectionName, docName));
};

const getOrCreateUser = async (userAddress) => {
    const newUser = { reputation: 0, name: userAddress };

    // Create a reference to the user doc.
    const userDocRef = doc(db, 'users', userAddress);

    try {
        return await runTransaction(db, async (transaction) => {
            const user = await transaction.get(userDocRef);
            if (!user.exists()) {
                const newUserRef = doc(db, 'users', userAddress);
                transaction.set(newUserRef, newUser);
                return newUser;
            } else {
                return user.data();
            }
        });
    } catch (e) {
        // ABORTED: Too much contention on these documents. Please try again. --> error for contention scenario
        console.error(e);
        return Promise.reject(e);
    }
};

export { getQuestionsForUser, getDocument, getOrCreateUser };
