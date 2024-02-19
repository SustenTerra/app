import debounce from 'awesome-debounce-promise';
import { useCallback, useEffect, useState } from 'react';

import { useActionSheet } from './actionSheet';

import { PostView } from '@/api';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

interface GetPostsPayload {
  search?: string;
  category?: string;
  userId?: string;
}

export function usePosts(
  category: string | undefined,
  search: string | undefined,
  userId: string | undefined,
) {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [viewPosts, setViewPosts] = useState<PostView[]>([]);

  const getPosts = async ({ search, category, userId }: GetPostsPayload) => {
    try {
      setLoadingPosts(true);
      const userIdNumber = userId ? Number(userId) : undefined;
      const posts = await client.posts.listAllPostsPostsGet(
        search,
        userIdNumber,
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

    if (userId) {
      getPostsDebounced({ userId });
      return;
    }

    getPostsDebounced({});
  }, [search, category, userId]);

  return {
    loadingPosts,
    viewPosts,
  };
}

interface PostSorters {
  label: string;
  value: string;
  sortingFunction: (posts: PostView[]) => PostView[];
}

const POST_SORTERS: PostSorters[] = [
  {
    label: 'Mais vistos',
    value: 'views',
    sortingFunction: (posts: PostView[]) =>
      posts.sort((a, b) => b.views - a.views),
  },
  {
    label: 'Mais recentes',
    value: 'recent',
    sortingFunction: (posts: PostView[]) =>
      posts.sort((a, b) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }),
  },
  {
    label: 'Mais caros',
    value: 'expensive',
    sortingFunction: (posts: PostView[]) =>
      posts.sort((a, b) => (b.price || 0) - (a.price || 0)),
  },
  {
    label: 'Mais baratos',
    value: 'cheap',
    sortingFunction: (posts: PostView[]) =>
      posts.sort((a, b) => (a.price || 0) - (b.price || 0)),
  },
];

export function usePostSorting(posts: PostView[]) {
  const actionSheet = useActionSheet({
    title: 'Ordenar por',
    message: 'Selecione uma opção',
    actions: POST_SORTERS.map((sorter) => sorter.label),
    actionsCallbacks: POST_SORTERS.map((sorter) => () => {
      setSelectedSorter(sorter.value);
    }),
  });

  const [selectedSorter, setSelectedSorter] = useState<string>(
    POST_SORTERS[0].value,
  );
  const [sortedPosts, setSortedPosts] = useState<PostView[]>(posts);

  const sortPosts = (posts: PostView[]) => {
    const sorter = POST_SORTERS.find((f) => f.value === selectedSorter);
    if (!sorter) {
      return posts;
    }

    return sorter.sortingFunction(posts);
  };

  useEffect(() => {
    setSortedPosts([...sortPosts(posts)]);
  }, [selectedSorter, posts]);

  return {
    sorterLabel: POST_SORTERS.find((f) => f.value === selectedSorter)?.label,
    sortedPosts,
    actionSheet,
  };
}
