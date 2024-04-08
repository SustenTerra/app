/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChapterContentCreate } from '../models/ChapterContentCreate';
import type { ChapterContentUpdate } from '../models/ChapterContentUpdate';
import type { ChapterContentView } from '../models/ChapterContentView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChapterContentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create
     * Create a chapter content
     * @param requestBody
     * @returns ChapterContentView Successful Response
     * @throws ApiError
     */
    public createChapterContentsPost(
        requestBody: ChapterContentCreate,
    ): CancelablePromise<ChapterContentView> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/chapter_contents/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Content By Id
     * Get one chapter_content by id
     * @param chapterContentId
     * @returns ChapterContentView Successful Response
     * @throws ApiError
     */
    public getContentByIdChapterContentsChapterContentIdGet(
        chapterContentId: number,
    ): CancelablePromise<ChapterContentView> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/chapter_contents/{chapter_content_id}',
            path: {
                'chapter_content_id': chapterContentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Content
     * Delete one chapter_content by id
     * @param chapterContentId
     * @returns any Successful Response
     * @throws ApiError
     */
    public deleteContentChapterContentsChapterContentIdDelete(
        chapterContentId: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/chapter_contents/{chapter_content_id}',
            path: {
                'chapter_content_id': chapterContentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Content
     * Update one chapter_content by id
     * @param chapterContentId
     * @param requestBody
     * @returns ChapterContentView Successful Response
     * @throws ApiError
     */
    public updateContentChapterContentsChapterContentIdPatch(
        chapterContentId: number,
        requestBody: ChapterContentUpdate,
    ): CancelablePromise<ChapterContentView> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/chapter_contents/{chapter_content_id}',
            path: {
                'chapter_content_id': chapterContentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
