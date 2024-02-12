import debounce from 'awesome-debounce-promise';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

import { CourseListView } from '@/api';
import BackButton from '@/components/BackButton';
import CategoryList from '@/components/CategoryList';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { CourseSummary } from '@/components/pages/courses';
import {
  Container,
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

interface GetCoursesPayload {
  search?: string;
  category?: string;
}

export default function CoursesHome() {
  const params = useLocalSearchParams<{
    search: string;
    category: string;
  }>();

  const [searchText, setSearchText] = useState(params.search || '');
  const [selectedCategory, setSelectedCategory] = useState(
    CATEGORIES.indexOf(params.category || 'Todos'),
  );
  const [viewCourses, setViewCourses] = useState<CourseListView[]>([]);

  const getCourses = async ({ search, category }: GetCoursesPayload) => {
    try {
      const courses = await client.courses.listAllCoursesCoursesGet(
        category,
        search,
      );
      setViewCourses(courses);
    } catch (error) {
      showErrors(error);
    }
  };
  const getCoursesDebounced = useCallback(debounce(getCourses, 500), []);

  useEffect(() => {
    if (params.search) {
      getCoursesDebounced({ search: params.search });
      return;
    }

    if (params.category && params.category !== 'Todos') {
      getCoursesDebounced({ category: params.category });
      return;
    }

    getCoursesDebounced({});
  }, [params.search, params.category]);

  let title = 'Iniciar um novo curso';
  if (params.search) {
    title = `Pesquisando por "${params.search}"`;
  }

  return (
    <Container>
      <TopWrapper>
        <SearchWrapper>
          <Input
            useSecondaryColors
            iconName="search"
            placeholder="Buscar por cursos..."
            value={searchText}
            onChange={(text) => {
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
        <TitleContainer>
          <Text size="h5">{title}</Text>
        </TitleContainer>

        {!params.search && (
          <CategoryList
            categories={CATEGORIES}
            value={selectedCategory}
            onChange={(value) => {
              setSelectedCategory(value);
              router.setParams({ category: CATEGORIES[value] });
            }}
          />
        )}

        {viewCourses.map((course) => (
          <CourseSummary key={course.id} course={course} />
        ))}
      </Content>
    </Container>
  );
}
