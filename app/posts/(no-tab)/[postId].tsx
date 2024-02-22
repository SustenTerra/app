import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
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

  const theme = useTheme();

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
          <MoreOptionsButton />
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
                  <Row style={{ gap: moderateScale(5) }}>
                    <Feather name="user" size={16} />
                    <Text>Por {post.user.full_name}</Text>
                  </Row>
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
        <BarContent
          onPress={() =>
            post && Linking.openURL(`https://wa.me/${post.user.phone}`)
          }
        >
          <Feather name="phone-call" color={theme.colors.light} size={24} />
          <Text size="h3" color="light">
            Entrar em contato!
          </Text>
        </BarContent>
      </ContactBar>
    </>
  );
}
