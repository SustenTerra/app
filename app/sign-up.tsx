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
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import theme from '@/styles/theme';
import { phoneNumberRegex } from '@/utils/constants';
import { verticalScale, moderateScale, height } from '@/utils/scale';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !phone || !password || !passwordConfirmation) {
      showMessage({
        type: 'warning',
        title: 'Erro',
        message: 'Preencha todos os campos!',
      });
      return;
    }

    if (password !== passwordConfirmation) {
      showMessage({
        type: 'warning',
        title: 'Erro',
        message: 'Senhas não correspondem',
      });
      return;
    }

    if (!phoneNumberRegex.test(phone)) {
      showMessage({
        type: 'warning',
        title: 'Erro',
        message: 'Número de telefone inválido.',
      });
      return;
    }

    setLoading(true);
    try {
      await client.users.createUserUsersPost({
        email,
        full_name: name,
        password,
        phone,
      });
      showMessage({
        type: 'success',
        title: 'Sucesso',
        message: 'Usuário criado com sucesso!',
      });
      router.replace('/login');
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
            Criar uma conta
          </Text>
        </HeaderWrapper>
        <Text color="primary">
          Entre os seus dados para poder realizar login no app, acessar o
          marketplace e salvar suas ações.
        </Text>
        <Input
          iconName="user"
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
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
          iconName="message-circle"
          placeholder="Whatsapp para contato"
          value={phone}
          keyboardType="phone-pad"
          inputMode="tel"
          onChangeText={setPhone}
          mask="(99)99999-9999"
        />
        <Input
          iconName="lock"
          placeholder="Senha"
          autoCapitalize="none"
          value={password}
          hideText
          onChangeText={setPassword}
        />
        <Input
          iconName="lock"
          placeholder="Repetir a senha"
          autoCapitalize="none"
          value={passwordConfirmation}
          hideText
          onChangeText={setPasswordConfirmation}
        />
        <Button disabled={loading} color="primary" onPress={handleSignUp}>
          {!loading && (
            <>
              <Feather name="log-in" size={24} color={theme.colors.light} />
              <Text color="light" size={20}>
                Cadastrar
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
        <HelpLink screen="signup" />
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
  gap: ${verticalScale(15)}px;
`;

const Background = styled.ImageBackground`
  width: 100%;
  height: ${height * 0.2}px;
`;

const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
