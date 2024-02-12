import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import HelpLink from '@/components/HelpLink';
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
        message: 'Atenção!',
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
      router.replace('/posts');
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
          <HeaderWrapper>
            <BackButton />
            <Text weight="regular" size="h1" color="primary">
              Iniciar sessão
            </Text>
          </HeaderWrapper>

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
          <HelpLink screen="login" />
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

const Background = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.ScrollView`
  flex: 1;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
