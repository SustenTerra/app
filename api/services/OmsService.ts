/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OMSOrderCreate } from '../models/OMSOrderCreate';
import type { OrderView } from '../models/OrderView';
import type { PaymentLink } from '../models/PaymentLink';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class OmsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create Payment Link
     * @param requestBody
     * @returns PaymentLink Successful Response
     * @throws ApiError
     */
    public createPaymentLinkOmsPaymentLinksPost(
        requestBody: OMSOrderCreate,
    ): CancelablePromise<PaymentLink> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/oms/payment_links',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders From User
     * @returns OrderView Successful Response
     * @throws ApiError
     */
    public getOrdersFromUserOmsUsersMeOrdersGet(): CancelablePromise<Array<OrderView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/oms/users/me/orders',
        });
    }
    /**
     * Get Orders For Seller
     * @returns OrderView Successful Response
     * @throws ApiError
     */
    public getOrdersForSellerOmsSellersMeOrdersGet(): CancelablePromise<Array<OrderView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/oms/sellers/me/orders',
        });
    }
    /**
     * Stripe Webhook
     * @param stripeSignature
     * @returns any Successful Response
     * @throws ApiError
     */
    public stripeWebhookOmsStripeWebhookPost(
        stripeSignature?: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/oms/stripe/webhook',
            headers: {
                'stripe-signature': stripeSignature,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
