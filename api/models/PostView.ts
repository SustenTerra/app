/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostCategoryView } from './PostCategoryView';
import type { UserView } from './UserView';
export type PostView = {
    title: string;
    description: string;
    post_type: string;
    location: string;
    price: (number | null);
    category_id: number;
    user_id: number;
    id: number;
    created_at: string;
    updated_at: string;
    image_key: string;
    views: number;
    user: UserView;
    category: PostCategoryView;
    readonly image_url: (string | null);
};

