import { AppClient } from '@/api';

export const client = new AppClient({ BASE: process.env.EXPO_PUBLIC_API_URL });
