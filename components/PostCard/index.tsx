import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';

import { Container, InfoContainer, TextContainer } from './style';
import Text from '../Text';

import { PostView } from '@/api';
import { moderateScale, verticalScale, width } from '@/utils/scale';

function PostCard(props: PostView) {
  return (
    <Container>
      <Image
        source={props.image_url ? { uri: props.image_url } : undefined}
        defaultSource={require('assets/icon.png')}
        style={{
          width: width * 0.44,
          height: verticalScale(200),
          borderRadius: moderateScale(25),
        }}
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
