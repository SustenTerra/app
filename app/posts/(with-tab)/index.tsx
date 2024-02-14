import { Link, router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image } from 'react-native';

import { PostView } from '@/api';
import BackButton from '@/components/BackButton';
import Banner from '@/components/Banner';
import Button from '@/components/Button';
import CategoryList from '@/components/CategoryList';
import Input from '@/components/Input';
import PostCard from '@/components/PostCard';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  ButtonsWrapper,
  Container,
  Header,
  PostsContainer,
  SearchWrapper,
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { horizontalScale } from '@/utils/scale';

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
        <ButtonsWrapper>
          <BackButton />
          <Button
            onPress={() => router.push('/posts/new-post')}
            color="primary"
            style={{ width: horizontalScale(150) }}
          >
            <Text color="light">Criar Anúncio</Text>
          </Button>
        </ButtonsWrapper>
        <SearchWrapper>
          <Input
            iconName="search"
            placeholder="Pesquisar por produto, categoria..."
            value={search}
            onChangeText={setSearch}
          />
        </SearchWrapper>
        <Banner
          title="Deseja aprender a criar produtos tão incríveis quanto esses?"
          description="Clique aqui e saiba como!"
          href="/courses"
        />
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
            <PostCard key={post.id} {...post} />
          ))}
        </PostsContainer>
      </Container>
    </ScrollablePage>
  );
}
