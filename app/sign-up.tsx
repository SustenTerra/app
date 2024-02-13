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
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import theme from '@/styles/theme';
import { verticalScale, moderateScale, height } from '@/utils/scale';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !phone || !password || !passwordConfirmation) {
      showMessage({
        type: 'warning',
        message: 'Erro',
        description: 'Preencha todos os campos!',
      });
      return;
    }

    if (password !== passwordConfirmation) {
      showMessage({
        type: 'warning',
        message: 'Erro',
        description: 'Senhas não correspondem',
      });
      return;
    }

    try {
      await client.users.createUserUsersPost({
        email,
        full_name: name,
        password,
        phone,
      });
      router.replace('/login');
    } catch (err) {
      showErrors(err);
    }
  };

  return (
    <ScrollablePage>
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
        />
        <Input
          iconName="mail"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          iconName="message-circle"
          placeholder="Whatsapp para contato"
          value={phone}
          onChangeText={setPhone}
        />
        <Input
          iconName="lock"
          placeholder="Senha"
          value={password}
          hideText
          onChangeText={setPassword}
        />
        <Input
          iconName="lock"
          placeholder="Repetir a senha"
          value={passwordConfirmation}
          hideText
          onChangeText={setPasswordConfirmation}
        />
        <Button color="secondary" onPress={handleSignUp}>
          <Feather name="log-in" size={24} color={theme.colors.light} />
          <Text color="light" size={20}>
            Cadastrar
          </Text>
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
