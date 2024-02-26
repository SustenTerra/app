import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { PostView } from '@/api';
import BackButton from '@/components/BackButton';
import EmptyList from '@/components/EmptyList';
import FavoriteButton from '@/components/FavoriteButton';
import Loading from '@/components/Loading';
import MoreOptionsButton from '@/components/MoreOptionsButton';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  HeaderPostView,
  ImagePostView,
  PostInfoWrapper,
  Row,
  ContactBar,
  BarContent,
  PostsSpacer,
  HeaderSafeAreaView,
} from '@/components/pages/posts/styles';
import { useActionSheet } from '@/hooks/actionSheet';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale, verticalScale } from '@/utils/scale';
import { centsToCurrencyString, cropLongText } from '@/utils/strings';

export default function ShowPost() {
  const { postId } = useLocalSearchParams<{
    postId: string;
  }>();
  const [post, setPost] = useState<PostView | null>(null);
  const [loading, setLoading] = useState(true);

  const auth = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const profileActionSheet = useActionSheet({
    title: 'Tem certeza?',
    message: 'Você será redirecionado para o portfólio do autor(a)',
    actions: ['Sim, tenho certeza'],
    actionsCallbacks: [
      () => {
        if (post) {
          router.push(`/posts?userId=${post.user_id}`);
        }
      },
    ],
  });

  const shouldLoginActionSheet = useActionSheet({
    title: 'Você precisa estar logado',
    message: 'Para entrar em contato, você precisa estar logado',
    actions: ['Fazer login'],
    actionsCallbacks: [
      () => {
        router.push('/login');
      },
    ],
  });

  const getPost = async () => {
    if (!postId) {
      showMessage({
        type: 'danger',
        title: 'Erro',
        message: 'Post não encontrado',
      });
      return;
    }

    try {
      const postResponse = await client.posts.getPostByIdPostsPostIdGet(
        parseInt(postId, 10),
      );

      setPost(postResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrors(error);
    }
  };

  const enterOnContact = () => {
    if (!auth.loading && !auth.user) {
      shouldLoginActionSheet.show();
      return;
    }

    if (post) {
      Linking.openURL(`https://wa.me/${post.user.phone}`);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const postPrice = post?.price
    ? centsToCurrencyString(post.price)
    : 'Valor a combinar';

  return (
    <>
      <StatusBar style="light" />

      <HeaderSafeAreaView>
        <HeaderPostView>
          <BackButton color="light" href="/posts" />
          <Text size="h3" color="light">
            Detalhes
          </Text>
          <MoreOptionsButton postId={post?.id} userId={post?.user_id} />
        </HeaderPostView>
      </HeaderSafeAreaView>

      <ScrollablePage>
        {loading && (
          <View>
            <PostsSpacer />
            <PostsSpacer />
            <Loading />
          </View>
        )}
        {!loading && post && (
          <>
            <ImagePostView
              defaultSource={require('assets/gray.png')}
              source={
                post.image_url
                  ? { uri: post.image_url }
                  : require('assets/gray.png')
              }
            />
            <PostInfoWrapper>
              <Row style={{ justifyContent: 'space-between' }}>
                <Text size="h2">{postPrice}</Text>
                <FavoriteButton />
              </Row>
              <Row style={{ marginBottom: verticalScale(10) }}>
                <Text size="h4">{cropLongText(post.title, 60)}</Text>
              </Row>

              <Row
                style={{
                  justifyContent: 'space-between',
                  marginBottom: verticalScale(10),
                }}
              >
                <View>
                  <TouchableOpacity onPress={profileActionSheet.show}>
                    <Row style={{ gap: moderateScale(5) }}>
                      <Feather name="user" size={16} />
                      <Text>Por</Text>
                      <Text color="secondary">{post.user.full_name}</Text>
                    </Row>
                  </TouchableOpacity>

                  <Row style={{ gap: moderateScale(5) }}>
                    <Feather name="calendar" size={16} />
                    <Text>
                      Adicionado em{' '}
                      {new Date(post.created_at).toLocaleDateString()}
                    </Text>
                  </Row>
                </View>
              </Row>
              <Text>{post.description}</Text>
            </PostInfoWrapper>
          </>
        )}
        {!loading && !post && <EmptyList />}

        <PostsSpacer multiplier={6} />
      </ScrollablePage>

      <ContactBar>
        <BarContent onPress={enterOnContact}>
          <Feather name="phone-call" color={theme.colors.light} size={24} />
          <Text size="h3" color="light">
            Entrar em contato!
          </Text>
        </BarContent>
      </ContactBar>
    </>
  );
}
