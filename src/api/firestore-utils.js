import { and, collection, doc, getDoc, getDocs, limit, orderBy, query, runTransaction, where } from 'firebase/firestore/lite';

import { db } from './firestore.conf';

const getShortAddress = (userAddress) => {
    if (userAddress) {
        return userAddress
            .substring(2, 4)
            .concat('..')
            .concat(userAddress.substring(userAddress.length - 2));
    } else {
        return '-';
    }
};

const getLatestQuestions = async () => {
    const q = query(getCollection('questions'), orderBy('createdOn', 'desc'), limit(10));
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

const getDocument = (collectionName, docName) => {
    return getDoc(doc(db, collectionName, docName));
};

const getCollection = (collectionName) => {
    return collection(db, collectionName);
};

const getOrCreateUser = async (userAddress) => {
    const newUser = {
        reputation: 0,
        name: getShortAddress(userAddress)
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
                const userData = user.data();
                return Promise.resolve({ ...userData, ...{ name: getShortAddress(userAddress) } });
            }
        });
    } catch (e) {
        // ABORTED: Too much contention on these documents. Please try again. --> error for contention scenario
        console.error(e);
        return Promise.reject(e);
    }
};

export { getLatestQuestions, getSolvedQuestions, getQuestionsForUser, getDocument, getOrCreateUser };
