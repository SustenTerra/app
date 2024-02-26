import { CacheService } from './base';

import { PostView } from '@/api';
import * as storage from '@/services/lightStorage';

const STORAGE_KEY = 'postscache';

export class PostsCacheService implements CacheService<PostView[]> {
  async get(): Promise<PostView[] | null> {
    const postsString = await storage.getStorageItemAsync(STORAGE_KEY);

    if (!postsString) {
      return [];
    }

    return JSON.parse(postsString);
  }

  async set(value: PostView[]): Promise<void> {
    return storage.setStorageItemAsync(STORAGE_KEY, JSON.stringify(value));
  }

  async getPostById(id: number): Promise<PostView | null> {
    const posts = (await this.get()) || [];

    return posts.find((post) => post.id === id) || null;
  }
}
