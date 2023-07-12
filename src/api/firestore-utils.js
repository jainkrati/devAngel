import { and, collection, doc, getDoc, getDocs, query, runTransaction, where } from 'firebase/firestore/lite';

import { db } from './firestore.conf';

const getSolvedQuestions = async (keywords) => {
    const q = query(collection(db, 'questions'), and(where('isSolved', '==', true), where('tags', 'array-contains-any', keywords)));
    const response = await getDocs(q);
    if (!response.empty) {
        return response.docs.map((q) => {
            return {
                id: q.id,
                ...q.data()
            };
        });
    } else {
        return [];
    }
};

const getQuestionsForUser = async (userAddress) => {
    const response = await getDocs(query(collection(db, 'questions'), where('askedBy', '==', userAddress)));
    let questions;
    if (!response.empty) {
        questions = response.docs.map((q) => {
            return {
                id: q.id,
                ...q.data()
            };
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
    const newUser = {
        reputation: 0,
        name: userAddress
            ? userAddress
                  .substring(2, 4)
                  .concat('..')
                  .concat(userAddress.substring(userAddress.length - 3))
            : '-'
    };

    // Create a reference to the user doc.
    const userDocRef = doc(db, 'users', userAddress);

    try {
        return runTransaction(db, async (transaction) => {
            const user = await transaction.get(userDocRef);
            if (!user.exists()) {
                transaction.set(userDocRef, newUser);
                return Promise.resolve(newUser);
            } else {
                return Promise.resolve(user.data());
            }
        });
    } catch (e) {
        // ABORTED: Too much contention on these documents. Please try again. --> error for contention scenario
        console.error(e);
        return Promise.reject(e);
    }
};

export { getSolvedQuestions, getQuestionsForUser, getDocument, getOrCreateUser };
