/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_post_posts_post } from '../models/Body_create_post_posts_post';
import type { PostUpdate } from '../models/PostUpdate';
import type { PostView } from '../models/PostView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PostsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create Post
     * Create a new post
     * @param formData
     * @returns PostView Successful Response
     * @throws ApiError
     */
    public createPostPostsPost(
        formData: Body_create_post_posts_post,
    ): CancelablePromise<PostView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/posts',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List All Posts
     * List all posts
     * @param searchTerm
     * @param userId
     * @param categoryName
     * @returns PostView Successful Response
     * @throws ApiError
     */
    public listAllPostsPostsGet(
        searchTerm?: (string | null),
        userId?: (number | null),
        categoryName?: (string | null),
    ): CancelablePromise<Array<PostView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts',
            query: {
                'search_term': searchTerm,
                'user_id': userId,
                'category_name': categoryName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Post By Id
     * Get one post by id
     * @param postId
     * @returns PostView Successful Response
     * @throws ApiError
     */
    public getPostByIdPostsPostIdGet(
        postId: number,
    ): CancelablePromise<PostView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Post
     * @param postId
     * @param requestBody
     * @returns PostView Successful Response
     * @throws ApiError
     */
    public updatePostPostsPostIdPatch(
        postId: number,
        requestBody: PostUpdate,
    ): CancelablePromise<PostView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/posts/{post_id}',
            path: {
                'post_id': postId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Post
     * @param postId
     * @returns any Successful Response
     * @throws ApiError
     */
    public deletePostPostsPostIdDelete(
        postId: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/posts/{post_id}',
            path: {
                'post_id': postId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List Highlight Posts
     * List top 5 viewed posts
     * @returns PostView Successful Response
     * @throws ApiError
     */
    public listHighlightPostsPostsHighlightsGet(): CancelablePromise<Array<PostView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/posts/highlights/',
        });
    }
}
