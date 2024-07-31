import debounce from 'awesome-debounce-promise';
import * as Network from 'expo-network';
import { useCallback, useEffect, useState } from 'react';

import { useActionSheet } from './actionSheet';

import { PostView } from '@/api';
import { PostsCacheService } from '@/services/cache/posts';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';

interface GetPostsPayload {
  search?: string;
  category?: string;
  userId?: string;
  selectedState?: string;
}

const cacheService = new PostsCacheService();

async function listCachedPosts({
  search,
  category,
  userId,
  selectedState,
}: GetPostsPayload) {
  const posts = await cacheService.get();

  showMessage({
    type: 'info',
    title: 'Sem conexão',
    message: 'Exibindo resultados salvos localmente',
  });

  return (
    posts?.filter((post) => {
      if (selectedState && post.location !== selectedState) {
        return false;
      }

      if (search && !post.title.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (category && !post.category.name.includes(category)) {
        return false;
      }

      if (userId && post.user.id !== Number(userId)) {
        return false;
      }

      return true;
    }) || []
  );
}

async function fetchPosts({
  search,
  category,
  userId,
  selectedState,
}: GetPostsPayload) {
  const networkState = await Network.getNetworkStateAsync();

  if (networkState.isConnected) {
    let posts = await client.posts.listAllPostsPostsGet(
      search,
      userId ? Number(userId) : undefined,
      category,
    );

    if (selectedState) {
      posts = posts.filter((post) => post.location === selectedState);
    }

    await cacheService.set(posts);

    return posts;
  }

  return await listCachedPosts({ search, category, userId });
}

export function usePosts(
  category: string | undefined,
  search: string | undefined,
  userId: string | undefined,
  selectedState: string | undefined,
) {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [viewPosts, setViewPosts] = useState<PostView[]>([]);

  const getPosts = async ({
    search,
    category,
    userId,
    selectedState,
  }: GetPostsPayload) => {
    try {
      setLoadingPosts(true);
      const posts = await fetchPosts({
        search,
        category,
        userId,
        selectedState,
      });
      setViewPosts(posts);
    } catch (error) {
      console.log(error);
      showErrors(error);
    } finally {
      setLoadingPosts(false);
    }
  };
  const getPostsDebounced = useCallback(debounce(getPosts, 500), []);

  useEffect(() => {
    console.log(selectedState);

    if (search) {
      getPostsDebounced({ search, selectedState });
      return;
    }

    if (category && category !== 'Todos') {
      getPosts({ category, selectedState });
      return;
    }

    if (userId) {
      getPostsDebounced({ userId });
      return;
    }

    getPostsDebounced({ selectedState });
  }, [search, category, userId, selectedState]);

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
