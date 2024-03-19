/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChapterContentView } from '../models/ChapterContentView';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ChapterContentsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
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
}
