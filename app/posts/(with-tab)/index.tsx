import Feather from '@expo/vector-icons/Feather';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Image } from 'react-native';
import { useTheme } from 'styled-components/native';

import { UserView } from '@/api';
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
  FilterButton,
  Header,
  PostsContainer,
  PostsGridHeader,
  SearchWrapper,
} from '@/components/pages/posts/styles';
import { ProfileInfo } from '@/components/pages/profile';
import { usePostSorting, usePosts } from '@/hooks/posts';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

const DEFAULT_CATEGORIES = ['Todos'];

export default function Posts() {
  const router = useRouter();
  const theme = useTheme();
  const params = useLocalSearchParams<{
    search: string;
    category: string;
    userId: string;
  }>();

  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [searchedUser, setSearchedUser] = useState<UserView | null>(null);
  const [loadingUser, setLoadingUser] = useState(!!params.userId);

  const [searchText, setSearchText] = useState(params.search || '');
  const [selectedCategory, setSelectedCategory] = useState(
    categories.indexOf(params.category || DEFAULT_CATEGORIES[0]),
  );
  const { loadingPosts, viewPosts } = usePosts(
    params.category,
    params.search,
    params.userId,
  );
  const sorting = usePostSorting(viewPosts);

  const getCategories = async () => {
    try {
      const categoriesResponse =
        await client.postCategories.listAllPostCategoriesPostCategoriesGet();
      const names = categoriesResponse.map((category) => category.name);
      setCategories([...DEFAULT_CATEGORIES, ...names]);
    } catch (error) {
      showErrors(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getUser = async () => {
    setLoadingUser(true);
    try {
      const user = await client.users.getSpecificUserUsersUserIdGet(
        Number(params.userId),
      );
      setSearchedUser(user);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (params.userId) {
      getUser();
    }
  }, [params.userId]);

  useLayoutEffect(() => {
    if (params.category) {
      setSelectedCategory(categories.indexOf(params.category));
    }
  }, [categories, params.category]);

  const shouldShowByDefault = !params.search && !params.userId;

  return (
    <ScrollablePage>
      <Container>
        <Link asChild href="/posts">
          <Header>
            <Image
              style={{ width: 50, height: 50 }}
              source={require('assets/adaptive-icon.png')}
            />
            <Text size="h1" color="primary" weight="bold">
              SustenTerra
            </Text>
          </Header>
        </Link>

        {!params.userId ||
          (params.search && (
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
          ))}

        {!loadingUser && searchedUser && (
          <ProfileInfo
            verticalMargin={10}
            name={searchedUser.full_name}
            email={searchedUser.email}
          />
        )}

        {shouldShowByDefault && (
          <Banner
            title="Deseja aprender a criar produtos tão incríveis quanto esses?"
            description="Clique aqui e saiba como!"
            href="/courses"
          />
        )}

        {!!params.search && (
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

        {shouldShowByDefault && (
          <PostsGridHeader>
            <Text size="h5" weight="bold">
              {sorting.sorterLabel}
            </Text>

            <FilterButton onPress={sorting.actionSheet.show}>
              <Feather name="sliders" size={24} color={theme.colors.light} />
            </FilterButton>
          </PostsGridHeader>
        )}

        <PostsContainer>
          {loadingPosts && <Loading />}

          {!loadingPosts &&
            sorting.sortedPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}

          {!loadingPosts && sorting.sortedPosts.length === 0 && <EmptyList />}
        </PostsContainer>
      </Container>
    </ScrollablePage>
  );
}
