/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PostCategoryView } from '../models/PostCategoryView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PostCategoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List All Post Categories
     * List all post_categories
     * @returns PostCategoryView Successful Response
     * @throws ApiError
     */
    public listAllPostCategoriesPostCategoriesGet(): CancelablePromise<Array<PostCategoryView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/post_categories',
        });
    }
}
