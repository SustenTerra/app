/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CourseCategoryView } from './CourseCategoryView';
import type { CourseChapterView } from './CourseChapterView';
export type CourseView = {
    id: number;
    image_key: string;
    name: string;
    author_name: string;
    description: string;
    created_at: string;
    updated_at: string;
    course_chapters: Array<CourseChapterView>;
    course_category: CourseCategoryView;
    readonly image_url: (string | null);
};

