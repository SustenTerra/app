import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

import { Container, InfoContainer, TextContainer } from './style';
import FavoriteButton from '../FavoriteButton';
import Text from '../Text';

import { PostView } from '@/api';
import { moderateScale, verticalScale, width } from '@/utils/scale';

function PostCard(props: PostView) {
  const postWidth = width * 0.5 - moderateScale(17);

  return (
    <TouchableOpacity onPress={() => router.replace(`posts/${props.id}`)}>
      <Container width={postWidth}>
        <Image
          source={props.image_url ? { uri: props.image_url } : undefined}
          defaultSource={require('assets/gray.png')}
          style={{
            width: postWidth,
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
          <FavoriteButton size={20} />
        </InfoContainer>
      </Container>
    </TouchableOpacity>
  );
}

export default PostCard;
