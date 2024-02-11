import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { onLogin } from '@/services/authStorage';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import theme from '@/styles/theme';
import { verticalScale, moderateScale } from '@/utils/scale';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        type: 'warning',
        message: 'Erro',
        description: 'Preencha todos os campos!',
      });
      return;
    }

    try {
      const res = await client.sessions.makeLoginSessionsPost({
        email,
        password,
      });
      await onLogin(res.token, res.user);
      router.push('/');
    } catch (err) {
      showErrors(err);
    }
  };

  return (
    <Container>
      <Background source={require('assets/terra.png')}>
        <LogoContainer>
          <Image
            source={require('assets/white_logo.png')}
            style={{ width: 100, height: 100 }}
          />
        </LogoContainer>
        <TextContainer>
          <Text weight="regular" size="h1" color="primary">
            <Feather
              name="arrow-left"
              size={24}
              onPress={() => {
                if (router.canGoBack()) router.back();
                else router.replace('/');
              }}
            />
            Iniciar sessão
          </Text>
          <Text color="primary">
            Entre com os seus dados para realizar login no app, acessar o
            marketplace e salvar suas ações.
          </Text>
          <Input
            iconName="mail"
            placeholder="Email"
            value={email}
            onChange={(val) => setEmail(val)}
          />
          <Input
            iconName="lock"
            placeholder="Senha"
            value={password}
            hideText
            onChange={(val) => setPassword(val)}
          />
          <Button color="secondary" onPress={handleLogin}>
            <Feather name="log-in" size={24} color={theme.colors.light} />
            <Text color="light" size={20}>
              Login
            </Text>
          </Button>
        </TextContainer>
      </Background>
    </Container>
  );
}

const LogoContainer = styled.View`
  height: ${verticalScale(150)}px;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  min-height: ${verticalScale(450)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(15)}px;
`;

const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

const Container = styled.ScrollView`
  flex: 1;
`;
