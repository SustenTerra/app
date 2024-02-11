import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { View } from 'react-native';

import { Container } from './style';
import Text from '../Text';

const textMapper = {
  login: {
    question: 'Ainda não tem uma conta?',
    link: (
      <Link href="/sign-up">
        <Text size="h5">
          Clique
          <Text color="primary" size="h5">
            {' '}
            aqui{' '}
          </Text>
          para criar uma
        </Text>
      </Link>
    ),
  },
  signup: {
    question: 'Já tem uma conta?',
    link: (
      <Link href="/login">
        <Text size="h5">
          Clique
          <Text color="primary" size="h5">
            {' '}
            aqui{' '}
          </Text>
          para fazer login
        </Text>
      </Link>
    ),
  },
};

interface HelpLinkProps {
  screen: 'login' | 'signup';
}

function HelpLink({ screen }: HelpLinkProps) {
  return (
    <Container>
      <Feather name="help-circle" size={30} />
      <View>
        <Text>{textMapper[screen].question}</Text>
        {textMapper[screen].link}
      </View>
    </Container>
  );
}

export default HelpLink;
