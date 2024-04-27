/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderAddressView } from './OrderAddressView';
import type { PostView } from './PostView';
import type { UserView } from './UserView';
export type OrderView = {
    user_id: number;
    post_id: number;
    order_address_id: number;
    total: number;
    id: number;
    created_at: string;
    updated_at: string;
    user: UserView;
    post: PostView;
    address: OrderAddressView;
};

