import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

import { Container, InfoContainer, TextContainer } from './styles';
import FavoriteButton from '../FavoriteButton';
import Text from '../Text';

import { PostView } from '@/api';
import { moderateScale, verticalScale, width } from '@/utils/scale';

interface PostCardProps {
  post: PostView;
  editable?: boolean;
}

function PostCard({ post, editable = false }: PostCardProps) {
  const postWidth = width * 0.5 - moderateScale(17);
  const postPrice = post.price
    ? (post.price / 100).toFixed(2).replace('.', ',')
    : '-';
  const postLink = editable
    ? `/posts/new-post?postId=${post.id}`
    : `/posts/${post.id}`;

  return (
    <TouchableOpacity onPress={() => router.push(postLink)}>
      <Container width={postWidth}>
        <Image
          source={post.image_url ? { uri: post.image_url } : undefined}
          defaultSource={require('assets/gray.png')}
          style={{
            width: postWidth,
            height: verticalScale(200),
            borderRadius: moderateScale(25),
          }}
        />
        <InfoContainer>
          <TextContainer>
            <Text weight="bold">R$ {postPrice}</Text>
            <Text>{post.title}</Text>
          </TextContainer>

          {!editable && <FavoriteButton size={20} />}

          {editable && <Feather name="edit" size={20} />}
        </InfoContainer>
      </Container>
    </TouchableOpacity>
  );
}

export default PostCard;
