import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

import { Container, InfoContainer, TextContainer } from './styles';
import FavoriteButton from '../FavoriteButton';
import Text from '../Text';

import { PostView } from '@/api';
import { useActionSheet } from '@/hooks/actionSheet';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale, verticalScale, width } from '@/utils/scale';

interface PostCardProps {
  post: PostView;
  editable?: boolean;
}

function PostCard({ post, editable = false }: PostCardProps) {
  const deletePost = async () => {
    try {
      await client.posts.deletePostPostsPostIdDelete(post.id);
      showMessage({
        message: 'Anúncio excluído com sucesso!',
        title: 'Sucesso!',
        type: 'success',
      });
      router.replace('/profile');
    } catch (error) {
      showErrors(error);
    }
  };

  const confirmDelete = useActionSheet({
    title: 'Deseja mesmo excluir esse anúncio?',
    message: 'Essa ação não pode ser desfeita',
    actions: ['Sim, tenho certeza!'],
    actionsCallbacks: [deletePost],
  });

  const postActionSheet = useActionSheet({
    title: 'O que deseja fazer?',
    message: 'Escolha uma das opções abaixo',
    actions: ['Editar', 'Excluir'],
    actionsCallbacks: [
      () => router.push(`/posts/new-post?postId=${post.id}`),
      () => {
        setTimeout(() => confirmDelete.show(), 500);
        postActionSheet.hide();
      },
    ],
  });

  const postWidth = width * 0.5 - moderateScale(17);
  const postPrice = post.price
    ? (post.price / 100).toFixed(2).replace('.', ',')
    : '-';
  const postLink = editable
    ? `/posts/new-post?postId=${post.id}`
    : `/posts/${post.id}`;

  const onPress = () => {
    if (!editable) {
      router.push(postLink);
      return;
    }

    postActionSheet.show();
  };

  return (
    <TouchableOpacity onPress={onPress}>
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
