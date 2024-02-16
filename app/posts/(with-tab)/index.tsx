import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Image } from 'react-native';

import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import EmptyList from '@/components/EmptyList';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { TitleContainer } from '@/components/pages/courses/styles';
import {
  Container,
  Header,
  PostsContainer,
  SearchWrapper,
} from '@/components/pages/posts/styles';
import { usePosts } from '@/hooks/posts';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

const DEFAULT_CATEGORIES = ['Todos'];

export default function Posts() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    search: string;
    category: string;
  }>();

  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  const [searchText, setSearchText] = useState(params.search || '');
  const [selectedCategory, setSelectedCategory] = useState(
    categories.indexOf(params.category || DEFAULT_CATEGORIES[0]),
  );
  const { loadingPosts, viewPosts } = usePosts(params.category, params.search);

  const getCategories = async () => {
    try {
      const categoriesResponse =
        await client.postCategories.listAllPostCategoriesPostCategoriesGet();
      const names = categoriesResponse.map((category) => category.name);
      setCategories([DEFAULT_CATEGORIES[0], ...names]);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useLayoutEffect(() => {
    if (params.category) {
      setSelectedCategory(categories.indexOf(params.category));
    }
  }, [categories, params.category]);

  const shouldShowByDefault = !params.search;

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
            clearable
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              router.setParams({ search: text });
            }}
          />
        </SearchWrapper>
        {shouldShowByDefault && (
          <Banner
            title="Deseja aprender a criar produtos tão incríveis quanto esses?"
            description="Clique aqui e saiba como!"
            href="/courses"
          />
        )}

        {!shouldShowByDefault && (
          <TitleContainer>
            <Text size="h6">Exibindo resultados...</Text>
          </TitleContainer>
        )}

        {shouldShowByDefault && (
          <CategoryList
            categories={categories}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              router.setParams({ category: categories[value] });
            }}
          />
        )}
        <PostsContainer>
          {loadingPosts && <Loading />}

          {!loadingPosts &&
            viewPosts.map((post) => <PostCard key={post.id} {...post} />)}

          {!loadingPosts && viewPosts.length === 0 && <EmptyList />}
        </PostsContainer>
      </Container>
    </ScrollablePage>
  );
}
