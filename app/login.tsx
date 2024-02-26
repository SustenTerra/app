import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import HelpLink from '@/components/HelpLink';
import Input from '@/components/Input';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { onLogin } from '@/services/authStorage';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import theme from '@/styles/theme';
import { verticalScale, moderateScale, height } from '@/utils/scale';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showMessage({
        type: 'warning',
        title: 'Atenção!',
        message: 'Preencha todos os campos!',
      });
      return;
    }

    setLoading(true);
    try {
      const res = await client.sessions.makeLoginSessionsPost({
        email,
        password,
      });
      await onLogin(res.token, res.user);

      showMessage({
        type: 'success',
        title: 'Sucesso',
        message: 'Login realizado com sucesso!',
      });

      router.replace('/');
    } catch (err) {
      showErrors(err);
      setLoading(false);
    }
  };

  return (
    <ScrollablePage>
      <StatusBar style="light" />

      <Background source={require('assets/terra.png')}>
        <LogoContainer>
          <Image
            source={require('assets/white_logo.png')}
            style={{ width: 100, height: 100 }}
          />
        </LogoContainer>
      </Background>

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
          keyboardType="email-address"
          inputMode="email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          iconName="lock"
          placeholder="Senha"
          autoCapitalize="none"
          value={password}
          hideText
          onChangeText={setPassword}
        />
        <Button disabled={loading} color="primary" onPress={handleLogin}>
          {!loading && (
            <>
              <Feather name="log-in" size={24} color={theme.colors.light} />
              <Text color="light" size={20}>
                Login
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
        <HelpLink screen="login" />
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
  background-color: ${(props) => props.theme.colors.background};
  min-height: ${verticalScale(450)}px;
  padding: ${moderateScale(20)}px;
  gap: ${verticalScale(20)}px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: ${height * 0.2}px;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
