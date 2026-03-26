export * from '../../registry/craft/lib/types';

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
