import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import styled from 'styled-components/native';

import { ApiError } from '@/api';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { onLogin } from '@/services/authStorage';
import { client } from '@/services/client';
import theme from '@/styles/theme';
import { verticalScale, moderateScale } from '@/utils/scale';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <Button
            color="secondary"
            onPress={async () => {
              try {
                const res = await client.sessions.makeLoginSessionsPost({
                  email,
                  password,
                });
                await onLogin(res.token, res.user);
                router.push('/');
              } catch (err) {
                if (err instanceof ApiError) {
                  console.log(err.body.detail[0].msg);
                }
              }
            }}
          >
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
  height: ${verticalScale(180)}px;
  align-items: center;
  justify-content: flex-end;
  padding: ${verticalScale(20)}px;
`;

const TextContainer = styled.View`
  background-color: ${(props) => props.theme.colors.background};
  height: ${verticalScale(600)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(15)}px;
`;

const Background = styled(ImageBackground)`
  flex: 1;
`;

const Container = styled.ScrollView`
  flex: 1;
`;
