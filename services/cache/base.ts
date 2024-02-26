export interface CacheService<T> {
  get(): Promise<T | null>;
  set(value: T): Promise<void>;
}
