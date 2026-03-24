export * from '../../registry/new-york-v4/lib/types';

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
    permissions?: string[];
};
