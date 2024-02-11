import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ImageBackground } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import styled from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import HelpLink from '@/components/HelpLink';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import theme from '@/styles/theme';
import { verticalScale, moderateScale } from '@/utils/scale';

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
            onChange={(val) => setName(val)}
          />
          <Input
            iconName="mail"
            placeholder="Email"
            value={email}
            onChange={(val) => setEmail(val)}
          />
          <Input
            iconName="message-circle"
            placeholder="Whatsapp para contato"
            value={phone}
            onChange={(val) => setPhone(val)}
          />
          <Input
            iconName="lock"
            placeholder="Senha"
            value={password}
            hideText
            onChange={(val) => setPassword(val)}
          />
          <Input
            iconName="lock"
            placeholder="Repetir a senha"
            value={passwordConfirmation}
            hideText
            onChange={(val) => setPasswordConfirmation(val)}
          />
          <Button color="secondary" onPress={handleSignUp}>
            <Feather name="log-in" size={24} color={theme.colors.light} />
            <Text color="light" size={20}>
              Cadastrar
            </Text>
          </Button>
          <HelpLink screen="signup" />
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

const HeaderWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;
