/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { AxiosHttpRequest } from './core/AxiosHttpRequest';
import { AddressesService } from './services/AddressesService';
import { ChapterContentsService } from './services/ChapterContentsService';
import { ChatService } from './services/ChatService';
import { CourseCategoriesService } from './services/CourseCategoriesService';
import { CoursesService } from './services/CoursesService';
import { PostCategoriesService } from './services/PostCategoriesService';
import { PostsService } from './services/PostsService';
import { SessionsService } from './services/SessionsService';
import { UsersService } from './services/UsersService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class AppClient {
    public readonly addresses: AddressesService;
    public readonly chapterContents: ChapterContentsService;
    public readonly chat: ChatService;
    public readonly courseCategories: CourseCategoriesService;
    public readonly courses: CoursesService;
    public readonly postCategories: PostCategoriesService;
    public readonly posts: PostsService;
    public readonly sessions: SessionsService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = AxiosHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '0.1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.addresses = new AddressesService(this.request);
        this.chapterContents = new ChapterContentsService(this.request);
        this.chat = new ChatService(this.request);
        this.courseCategories = new CourseCategoriesService(this.request);
        this.courses = new CoursesService(this.request);
        this.postCategories = new PostCategoriesService(this.request);
        this.posts = new PostsService(this.request);
        this.sessions = new SessionsService(this.request);
        this.users = new UsersService(this.request);
    }
}

