/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCategoryView } from '../models/CourseCategoryView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CourseCategoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List All Course Categories
     * List all course_categories
     * @returns CourseCategoryView Successful Response
     * @throws ApiError
     */
    public listAllCourseCategoriesCourseCategoriesGet(): CancelablePromise<Array<CourseCategoryView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/course_categories',
        });
    }
}
