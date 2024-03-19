/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressCreateWithoutUserId } from '../models/AddressCreateWithoutUserId';
import type { AddressUpdate } from '../models/AddressUpdate';
import type { AddressView } from '../models/AddressView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class AddressesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Address
     * Get Users Addresses
     * @returns AddressView Successful Response
     * @throws ApiError
     */
    public getAddressUsersMeAddressesGet(): CancelablePromise<AddressView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/me/addresses',
        });
    }
    /**
     * Create User Address
     * Create a new Address for user
     * @param requestBody
     * @returns AddressView Successful Response
     * @throws ApiError
     */
    public createUserAddressUsersMeAddressesPost(
        requestBody: AddressCreateWithoutUserId,
    ): CancelablePromise<AddressView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/me/addresses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Address
     * Update User Address
     * @param requestBody
     * @returns AddressView Successful Response
     * @throws ApiError
     */
    public updateAddressUsersMeAddressesPatch(
        requestBody: AddressUpdate,
    ): CancelablePromise<AddressView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/users/me/addresses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
