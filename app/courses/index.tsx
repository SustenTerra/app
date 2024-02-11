import { useState } from 'react';

import BackButton from '@/components/BackButton';
import CategoryList from '@/components/CategoryList';
import Input from '@/components/Input';
import Text from '@/components/Text';
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

const CATEGORIES = [
  'Todos',
  'Tintas',
  'Obras de Arte',
  'Serviços',
  'Tintas2',
  'Obras de Arte2',
  'Serviços2',
];

export default function CoursesHome() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <Container>
      <TopWrapper>
        <SearchWrapper>
          <Input
            iconName="search"
            placeholder="Buscar cursos"
            value={search}
            onChange={setSearch}
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
          <Text size="h5">Iniciar um novo curso</Text>
        </TitleContainer>

        <CategoryList
          categories={CATEGORIES}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
      </Content>
    </Container>
  );
}
