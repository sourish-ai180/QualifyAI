"use client";

import { useState, useEffect } from 'react';
import {
    collection,
    query,
    where,
    onSnapshot,
    doc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Qualifier, Lead } from '@/types';
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

        setLoading(true);

        const q = query(
            collection(db, 'leads'),
            where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const d = doc.data();
                    return {
                        id: doc.id,
                        ...d,
                        createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : (typeof d.createdAt === 'number' ? d.createdAt : Date.now()),
                        updatedAt: d.updatedAt?.toMillis ? d.updatedAt.toMillis() : (typeof d.updatedAt === 'number' ? d.updatedAt : Date.now())
                    };
                }) as unknown as Lead[];

                // Client-side sort (descending)
                data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

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
            where('userId', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const d = doc.data();
                    return {
                        id: doc.id,
                        ...d,
                        createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : (typeof d.createdAt === 'number' ? d.createdAt : Date.now()),
                        updatedAt: d.updatedAt?.toMillis ? d.updatedAt.toMillis() : (typeof d.updatedAt === 'number' ? d.updatedAt : Date.now())
                    };
                }) as unknown as Qualifier[];

                // Client-side sort (descending)
                data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

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
            where('qualifierId', '==', qualifierId)
        );

        const unsubscribe = onSnapshot(q,
            (snapshot) => {
                const data = snapshot.docs.map(doc => {
                    const d = doc.data();
                    return {
                        id: doc.id,
                        ...d,
                        createdAt: d.createdAt?.toMillis ? d.createdAt.toMillis() : (typeof d.createdAt === 'number' ? d.createdAt : Date.now()),
                        updatedAt: d.updatedAt?.toMillis ? d.updatedAt.toMillis() : (typeof d.updatedAt === 'number' ? d.updatedAt : Date.now())
                    };
                }) as unknown as Lead[];

                // Client-side sort (descending)
                data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

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

export const useQualifier = (qualifierId: string | null | undefined) => {
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
