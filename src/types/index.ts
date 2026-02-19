
export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    businessName?: string;
    calendlyLink?: string;
}

export interface Qualifier {
    id: string;
    userId: string;
    name: string;
    description: string;
    criteria: QualificationCriteria;
    status: 'active' | 'draft';
    createdAt: number;
    leadsCount?: number; // Added for UI compatibility
    conversionRate?: string; // Added for UI compatibility
    createdAtFormatted?: string; // Added for UI compatibility
    calendlyLink?: string; // Added for per-qualifier booking link
}

export interface QualificationCriteria {
    minBudget: number;
    maxTimelineMonths: number;
    idealPersona: string;
    keyProblems: string[];
}

export interface Lead {
    id: string;
    qualifierId: string;
    userId: string;
    name: string;
    email: string;
    phone?: string;
    responses: Record<string, string>;
    score: number;
    status: LeadStatus;
    transcription?: string;
    createdAt: number;
    budget?: string; // Added for UI compatibility
    source?: string; // Added for UI compatibility
    date?: string; // Added for UI compatibility
}

export enum LeadStatus {
    HOT = 'HOT',
    WARM = 'WARM',
    COLD = 'COLD'
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
