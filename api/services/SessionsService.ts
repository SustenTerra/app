/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginPayload } from '../models/LoginPayload';
import type { LoginView } from '../models/LoginView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class SessionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Make Login
     * Return JWT Token and User information
     * @param requestBody
     * @returns LoginView Successful Response
     * @throws ApiError
     */
    public makeLoginSessionsPost(
        requestBody: LoginPayload,
    ): CancelablePromise<LoginView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/sessions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
