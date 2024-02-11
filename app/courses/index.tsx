import BackButton from '@/components/BackButton';
import Text from '@/components/Text';
import {
  Container,
  ContentBackground,
  DescriptionWrapper,
  HeaderBackground,
  HeaderWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';

export default function CoursesHome() {
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
        </TransparentBackground>
      </HeaderBackground>
      <Text>CoursesHome</Text>
    </Container>
  );
}
