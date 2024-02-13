import debounce from 'awesome-debounce-promise';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { CourseListView } from '@/api';
import BackButton from '@/components/BackButton';
import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import EmptyList from '@/components/EmptyList';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { CourseSummary } from '@/components/pages/courses';
import {
  Content,
  ContentBackground,
  DescriptionWrapper,
  HeaderBackground,
  HeaderWrapper,
  SearchWrapper,
  TitleContainer,
  TopWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

const DEFAULT_CATEGORIES = ['Todos'];

interface GetCoursesPayload {
  search?: string;
  category?: string;
}

export default function CoursesHome() {
  const auth = useAuth();
  const params = useLocalSearchParams<{
    search: string;
    category: string;
  }>();

  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);

  const [searchText, setSearchText] = useState(params.search || '');
  const [selectedCategory, setSelectedCategory] = useState(
    categories.indexOf(params.category || DEFAULT_CATEGORIES[0]),
  );
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [viewCourses, setViewCourses] = useState<CourseListView[]>([]);

  const getCategories = async () => {
    try {
      const categoriesResponse =
        await client.courseCategories.listAllCourseCategoriesCourseCategoriesGet();
      const names = categoriesResponse.map((category) => category.name);
      setCategories([DEFAULT_CATEGORIES[0], ...names]);
    } catch (error) {
      showErrors(error);
    }
  };

  const getCourses = async ({ search, category }: GetCoursesPayload) => {
    try {
      setLoadingCourses(true);
      const courses = await client.courses.listAllCoursesCoursesGet(
        category,
        search,
      );
      setViewCourses(courses);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingCourses(false);
    }
  };
  const getCoursesDebounced = useCallback(debounce(getCourses, 500), []);

  useEffect(() => {
    if (params.search) {
      getCoursesDebounced({ search: params.search });
      return;
    }

    if (params.category && params.category !== 'Todos') {
      getCourses({ category: params.category });
      return;
    }

    getCoursesDebounced({});
  }, [params.search, params.category]);

  useEffect(() => {
    getCategories();
  }, []);

  useLayoutEffect(() => {
    if (params.category) {
      setSelectedCategory(categories.indexOf(params.category));
    }
  }, [categories, params.category]);

  let title = 'Iniciar um novo curso';
  if (params.search) {
    title = `Pesquisando por "${params.search}"`;
  }

  const shouldShowByDefault = !params.search;

  return (
    <ScrollablePage>
      <TopWrapper>
        <SearchWrapper>
          <Input
            useSecondaryColors
            clearable
            iconName="search"
            placeholder="Buscar por cursos..."
            inputMode="search"
            keyboardType="web-search"
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              router.setParams({ search: text });
            }}
          />
        </SearchWrapper>

        <HeaderBackground
          source={require('assets/courses.png')}
          resizeMode="cover"
        >
          <TransparentBackground>
            <ContentBackground>
              <HeaderWrapper>
                <BackButton />
                <Text weight="regular" size="h1" color="light">
                  Cursos Disponíveis
                </Text>
              </HeaderWrapper>

              <DescriptionWrapper>
                <Text color="light">
                  Utilize esse espaço para aprender mais sobre o que o solo pode
                  lhe oferecer, como confeccionar matéria prima e itens para
                  venda.
                </Text>
              </DescriptionWrapper>
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      <Content>
        {shouldShowByDefault && !auth.loading && !auth.user && (
          <Banner
            href="/login"
            title="Quer acompanhar seu progresso?"
            description="Clique aqui e acesse sua conta!"
          />
        )}

        <TitleContainer>
          <Text size="h5">{title}</Text>
        </TitleContainer>

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

        {loadingCourses && <Loading />}

        {!loadingCourses &&
          viewCourses.map((course) => (
            <CourseSummary key={course.id} course={course} />
          ))}

        {!loadingCourses && viewCourses.length === 0 && <EmptyList />}
      </Content>
    </ScrollablePage>
  );
}
