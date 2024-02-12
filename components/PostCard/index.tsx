import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';

import { Container, InfoContainer, TextContainer } from './style';
import Text from '../Text';

import { PostView } from '@/api';

function PostCard(props: PostView) {
  return (
    <Container>
      <Image
        source={props.image_url ? { uri: props.image_url } : undefined}
        defaultSource={require('assets/icon.png')}
        style={{ width: 150, height: 180, borderRadius: 20 }}
      />
      <InfoContainer>
        <TextContainer>
          <Text weight="bold">
            R$ {props.price ? props.price.toFixed(2) : '-'}
          </Text>
          <Text>{props.title}</Text>
        </TextContainer>
        <Feather name="heart" size={20} />
      </InfoContainer>
    </Container>
  );
}

export default PostCard;
