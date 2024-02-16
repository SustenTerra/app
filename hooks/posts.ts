import debounce from 'awesome-debounce-promise';
import { useCallback, useEffect, useState } from 'react';

import { PostView } from '@/api';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

interface GetPostsPayload {
  search?: string;
  category?: string;
}

export function usePosts(
  category: string | undefined,
  search: string | undefined,
) {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [viewPosts, setViewPosts] = useState<PostView[]>([]);

  const getPosts = async ({ search, category }: GetPostsPayload) => {
    try {
      setLoadingPosts(true);
      const posts = await client.posts.listAllPostsPostsGet(
        search,
        null,
        category,
      );
      setViewPosts(posts);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingPosts(false);
    }
  };
  const getPostsDebounced = useCallback(debounce(getPosts, 500), []);

  useEffect(() => {
    if (search) {
      getPostsDebounced({ search });
      return;
    }

    if (category && category !== 'Todos') {
      getPosts({ category });
      return;
    }

    getPostsDebounced({});
  }, [search, category]);

  return {
    loadingPosts,
    viewPosts,
  };
}
