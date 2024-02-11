import styled from 'styled-components/native';

import Text from '@/components/Text';
import { Image, ImageBackground } from 'react-native';
import { verticalScale, moderateScale } from '@/utils/scale';
import Button from '@/components/Button';
import Feather from '@expo/vector-icons/Feather';
import theme from '@/styles/theme';


export default function Home() {
  return (
    <Container>
      <Background source={require('assets/terra.png')}>
          <LogoContainer>
            <Image source={require('assets/white_logo.png')} />
          </LogoContainer>
          <TextContainer>
            <Text weight="regular" size="h1" color="primary">
              Explore as possibilidades que a
              <Text weight="bold" size="h1" color="primary">
                {' '}
                Geotinta{' '}
              </Text>
              pode te oferecer
            </Text>
            <Text color="primary">
              Esse é um aplicativo em que você pode anunciar os seus produtos criados 
              de maneira ecológica, comprar tinta ou aprender a fazê-la.
            </Text>
            <Button color='secondary'>
              <Feather name="shopping-bag" size={24} color={theme.colors.light} />
              <Text color='light' size={20}>Ver anúncios locais</Text>
            </Button>
            <Button color='primary'>
              <Feather name="book-open" size={24} color={theme.colors.light} />
              <Text color='light' size={20}>Aprender mais</Text>
            </Button>
          </TextContainer>
      </Background>
    </Container>
  );
}

const LogoContainer = styled.View`
  height: 55%;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: ${(props) => props.theme.colors.light};
  flex: 45%;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(15)}px;
`;

const Background = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled.View`
  width: 100%;
  height: 100%;
`;
