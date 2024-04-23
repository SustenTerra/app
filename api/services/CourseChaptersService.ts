/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseChapterCreate } from '../models/CourseChapterCreate';
import type { CourseChapterUpdate } from '../models/CourseChapterUpdate';
import type { CourseChapterView } from '../models/CourseChapterView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CourseChaptersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create Course Chapter
     * Create course_chapter
     * @param requestBody
     * @returns CourseChapterView Successful Response
     * @throws ApiError
     */
    public createCourseChapterCourseChapterPost(
        requestBody: CourseChapterCreate,
    ): CancelablePromise<CourseChapterView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/course_chapter',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Edit Course Chapter
     * Edit course_chapter
     * @param courseChapterId
     * @param requestBody
     * @returns CourseChapterView Successful Response
     * @throws ApiError
     */
    public editCourseChapterCourseChapterCourseChapterIdPatch(
        courseChapterId: number,
        requestBody: CourseChapterUpdate,
    ): CancelablePromise<CourseChapterView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/course_chapter/{course_chapter_id}',
            path: {
                'course_chapter_id': courseChapterId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Chapter
     * Delete a course chapter by id
     * @param courseChapterId
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteChapterCourseChapterCourseChapterIdDelete(
        courseChapterId: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/course_chapter/{course_chapter_id}',
            path: {
                'course_chapter_id': courseChapterId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
