import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { PostView } from '@/api';
import CategoryList from '@/components/CategoryList';
import Input from '@/components/Input';
import PostCard from '@/components/PostCard';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  Container,
  Header,
  PostsContainer,
  SearchWrapper,
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

const CATEGORIES = [
  'Todos',
  'Tintas',
  'Obras de Arte',
  'Serviços',
  'Tintas2',
  'Obras de Arte2',
  'Serviços2',
];

interface GetPostsPayload {
  search?: string;
  category?: string;
  userId?: number;
}

export default function Posts() {
  const params = useLocalSearchParams<{
    search: string;
    category: string;
  }>();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.indexOf(params.category || 'Todos'),
  );
  const [viewPosts, setViewPosts] = useState<PostView[]>([]);

  const getPosts = async ({ search, category, userId }: GetPostsPayload) => {
    try {
      const posts = await client.posts.listAllPostsPostsGet(
        category,
        userId,
        search,
      );
      setViewPosts(posts);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    if (params.search) {
      getPosts({ search: params.search });
      return;
    }

    if (params.category && params.category !== 'Todos') {
      getPosts({ category: params.category });
      return;
    }

    getPosts({});
  }, [params.search, params.category]);

  return (
    <ScrollablePage>
      <Container>
        <Header>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('assets/adaptive-icon.png')}
          />
          <Text size="h1" color="primary" weight="bold">
            SustenTerra
          </Text>
        </Header>
        <SearchWrapper>
          <Input
            iconName="search"
            placeholder="Pesquisar por produto, categoria..."
            value={search}
            onChange={setSearch}
          />
        </SearchWrapper>

        <CategoryList
          categories={CATEGORIES}
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            router.setParams({ category: CATEGORIES[value] });
          }}
        />
        <PostsContainer>
          {viewPosts.map((post) => (
            <PostCard {...post} />
          ))}
        </PostsContainer>
      </Container>
    </ScrollablePage>
  );
}
