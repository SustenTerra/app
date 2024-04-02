/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponseChat } from '../models/ResponseChat';
import type { UpdateChat } from '../models/UpdateChat';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChatService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Update Chat
     * @param requestBody
     * @returns ResponseChat Successful Response
     * @throws ApiError
     */
    public updateChatChatPost(
        requestBody: UpdateChat,
    ): CancelablePromise<ResponseChat> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/chat',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
