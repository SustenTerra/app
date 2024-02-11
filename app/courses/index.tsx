import styled from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Text from '@/components/Text';
import { moderateScale, verticalScale } from '@/utils/scale';

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

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const TransparentBackground = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ContentBackground = styled.View`
  height: 100%;
  width: 100%;
  padding: ${moderateScale(20)}px;
`;

const HeaderBackground = styled.ImageBackground`
  width: 100%;
  height: ${verticalScale(230)}px;
`;

const DescriptionWrapper = styled.View`
  margin-top: ${verticalScale(10)}px;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
