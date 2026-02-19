"use client";

import { useState, useEffect } from 'react';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Qualifier, Lead, UserProfile } from '@/types';
import { useAuth } from '@/context/AuthContext';

export const useUserLeads = () => {
    const { user } = useAuth();
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLeads([]);
            setLoading(false);
            return;
        }

        setLoading(true); // Reset loading when user changes

        const q = query(
            collection(db, 'leads'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Lead[];
                setLeads(data);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching user leads:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { leads, loading };
};

export const useQualifiers = () => {
    const { user } = useAuth();
    const [qualifiers, setQualifiers] = useState<Qualifier[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setQualifiers([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const q = query(
            collection(db, 'qualifiers'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Qualifier[];
                setQualifiers(data);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching qualifiers:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [user]);

    return { qualifiers, loading };
};

export const useLeads = (qualifierId: string) => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!qualifierId) {
            setLeads([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const q = query(
            collection(db, 'leads'),
            where('qualifierId', '==', qualifierId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Lead[];
                setLeads(data);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching leads:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [qualifierId]);

    return { leads, loading };
};

export const useQualifier = (qualifierId: string) => {
    const [qualifier, setQualifier] = useState<Qualifier | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!qualifierId) return;

        setLoading(true);

        const docRef = doc(db, 'qualifiers', qualifierId);
        const unsubscribe = onSnapshot(docRef,
            (doc) => {
                if (doc.exists()) {
                    setQualifier({ id: doc.id, ...doc.data() } as Qualifier);
                } else {
                    setQualifier(null);
                }
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching qualifier:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [qualifierId]);

    return { qualifier, loading };
};
