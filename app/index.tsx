import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import Button from '@/components/Button';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import theme from '@/styles/theme';
import { verticalScale, moderateScale, height } from '@/utils/scale';

export default function Home() {
  return (
    <ScrollablePage>
      <StatusBar style="light" />

      <Background
        resizeMethod="scale"
        resizeMode="cover"
        source={require('assets/terra.png')}
      >
        <LogoContainer>
          <Image
            style={{ width: 100, height: 100 }}
            source={require('assets/white_logo.png')}
          />
        </LogoContainer>
      </Background>

      <TextContainer>
        <Text weight="regular" size="h1" color="primary">
          Explore as possibilidades que o
          <Text weight="bold" size="h1" color="primary">
            {' '}
            Solo{' '}
          </Text>
          pode te oferecer
        </Text>
        <Text color="primary">
          Esse é um aplicativo em que você pode anunciar os seus produtos
          criados de maneira ecológica, comprar tinta ou aprender a fazê-la.
        </Text>
        <Button
          color="primary"
          onPress={() => {
            router.push('/posts');
          }}
        >
          <Feather name="shopping-bag" size={24} color={theme.colors.light} />
          <Text color="light" size={20}>
            Explorar anúncios
          </Text>
        </Button>
        <Button
          color="light"
          onPress={() => {
            router.push('/courses');
          }}
        >
          <Feather name="book-open" size={24} color={theme.colors.primary} />
          <Text color="primary" size={20}>
            Ver cursos
          </Text>
        </Button>
      </TextContainer>
    </ScrollablePage>
  );
}

const LogoContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: ${(props) => props.theme.colors.light};
  flex: 1;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(25)}px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: ${height * 0.4}px;
`;
