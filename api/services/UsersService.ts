/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserCreate } from '../models/UserCreate';
import type { UserUpdate } from '../models/UserUpdate';
import type { UserUpdatePassword } from '../models/UserUpdatePassword';
import type { UserView } from '../models/UserView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create User
     * Create a new user
     * @param requestBody
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public createUserUsersPost(
        requestBody: UserCreate,
    ): CancelablePromise<UserView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public getUserUsersMeGet(): CancelablePromise<UserView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/me',
        });
    }
    /**
     * Delete User
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteUserUsersMeDelete(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/me',
        });
    }
    /**
     * Update User
     * @param requestBody
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public updateUserUsersMePatch(
        requestBody: UserUpdate,
    ): CancelablePromise<UserView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/me',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Specific User
     * @param userId
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public getSpecificUserUsersUserIdGet(
        userId: number,
    ): CancelablePromise<UserView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update User Password
     * @param requestBody
     * @returns UserView Successful Response
     * @throws ApiError
     */
    public updateUserPasswordUsersMeUpdatePasswordPatch(
        requestBody: UserUpdatePassword,
    ): CancelablePromise<UserView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/me/update_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
