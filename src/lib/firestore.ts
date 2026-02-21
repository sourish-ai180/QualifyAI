import { db } from './firebase';
import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    addDoc,
    query,
    where,
    getDocs,
    Timestamp,
    serverTimestamp
} from 'firebase/firestore';
import { UserProfile, Qualifier, Lead } from '@/types';

// User Operations
export const createUserProfile = async (user: UserProfile) => {
    const userRef = doc(db, 'users', user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        await setDoc(userRef, {
            ...user,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
    }
    return userRef;
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
        return snapshot.data() as UserProfile;
    }
    return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};

// Qualifier Operations
export const createQualifier = async (qualifier: Omit<Qualifier, 'id' | 'createdAt'>) => {
    const collectionRef = collection(db, 'qualifiers');
    const docRef = await addDoc(collectionRef, {
        ...qualifier,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    return docRef.id;
};

export const updateQualifier = async (qualifierId: string, data: Partial<Qualifier>) => {
    const qualifierRef = doc(db, 'qualifiers', qualifierId);
    await updateDoc(qualifierRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};

export const getUserQualifiers = async (userId: string): Promise<Qualifier[]> => {
    const q = query(collection(db, 'qualifiers'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (typeof data.createdAt === 'number' ? data.createdAt : Date.now()),
            updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : (typeof data.updatedAt === 'number' ? data.updatedAt : Date.now())
        } as unknown as Qualifier;
    });
};

export const getQualifier = async (qualifierId: string): Promise<Qualifier | null> => {
    const docRef = doc(db, 'qualifiers', qualifierId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (typeof data.createdAt === 'number' ? data.createdAt : Date.now()),
            updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : (typeof data.updatedAt === 'number' ? data.updatedAt : Date.now())
        } as unknown as Qualifier;
    }
    return null;
};

// Lead Operations
export const createLead = async (lead: Omit<Lead, 'id' | 'createdAt'>) => {
    const collectionRef = collection(db, 'leads');
    const docRef = await addDoc(collectionRef, {
        ...lead,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
    return docRef.id;
};

export const getQualifierLeads = async (qualifierId: string): Promise<Lead[]> => {
    const q = query(collection(db, 'leads'), where('qualifierId', '==', qualifierId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (typeof data.createdAt === 'number' ? data.createdAt : Date.now()),
            updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : (typeof data.updatedAt === 'number' ? data.updatedAt : Date.now())
        } as unknown as Lead;
    });
};

export const getUserLeads = async (userId: string): Promise<Lead[]> => {
    const q = query(collection(db, 'leads'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (typeof data.createdAt === 'number' ? data.createdAt : Date.now()),
            updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : (typeof data.updatedAt === 'number' ? data.updatedAt : Date.now())
        } as unknown as Lead;
    });
};

export const updateLead = async (leadId: string, data: Partial<Lead>) => {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
        ...data,
        updatedAt: serverTimestamp()
    });
};
