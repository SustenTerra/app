/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCreate } from '../models/CourseCreate';
import type { CourseListView } from '../models/CourseListView';
import type { CourseView } from '../models/CourseView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CoursesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * List All Courses
     * List all courses
     * @param categoryName
     * @param searchTerm
     * @returns CourseListView Successful Response
     * @throws ApiError
     */
    public listAllCoursesCoursesGet(
        categoryName?: (string | null),
        searchTerm?: (string | null),
    ): CancelablePromise<Array<CourseListView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/courses',
            query: {
                'category_name': categoryName,
                'search_term': searchTerm,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Course
     * Create a course
     * @param requestBody
     * @returns CourseView Successful Response
     * @throws ApiError
     */
    public createCourseCoursesPost(
        requestBody: CourseCreate,
    ): CancelablePromise<CourseView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/courses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * List All Courses In Progress
     * List all courses in progress
     * @returns CourseListView Successful Response
     * @throws ApiError
     */
    public listAllCoursesInProgressCoursesInProgressGet(): CancelablePromise<Array<CourseListView>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/courses/in_progress',
        });
    }
    /**
     * Get Course By Id
     * Get one course by id
     * @param courseId
     * @returns CourseView Successful Response
     * @throws ApiError
     */
    public getCourseByIdCoursesCourseIdGet(
        courseId: number,
    ): CancelablePromise<CourseView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/courses/{course_id}',
            path: {
                'course_id': courseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
