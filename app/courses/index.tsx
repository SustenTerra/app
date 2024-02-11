import { useState } from 'react';

import BackButton from '@/components/BackButton';
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
  TransparentBackground,
} from '@/components/pages/courses/styles';

export default function CoursesHome() {
  const [search, setSearch] = useState('');

  return (
    <Container>
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

          <SearchWrapper>
            <Input
              iconName="search"
              placeholder="Buscar cursos"
              value={search}
              onChange={setSearch}
            />
          </SearchWrapper>
        </TransparentBackground>
      </HeaderBackground>

      <Content>
        <Text>CoursesHome</Text>
      </Content>
    </Container>
  );
}
