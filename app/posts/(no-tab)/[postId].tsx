import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

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
} from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { moderateScale } from '@/utils/scale';

export default function ShowPost() {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState<PostView | null>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const getPost = async () => {
    try {
      if (typeof postId === 'string') {
        const postResponse = await client.posts.getPostByIdPostsPostIdGet(
          parseInt(postId, 10),
        );

        setPost(postResponse);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showErrors(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <ScrollablePage>
      <Container>
        {loading && <Loading />}
        {!loading && post && (
          <>
            <HeaderPostView>
              <BackButton color="light" href="/posts" />
              <Text size="h3">Detalhes</Text>
              <MoreOptionsButton />
            </HeaderPostView>
            <>
              <ImagePostView
                source={
                  post.image_url
                    ? { uri: post.image_url }
                    : require('assets/gray.png')
                }
              />
              <PostInfoWrapper>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Text size="h2">{post.title}</Text>
                  <FavoriteButton />
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
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
                  <Text size="h2">R$ {post.price?.toFixed(2)}</Text>
                </Row>
                <Text>{post.description}</Text>
              </PostInfoWrapper>
            </>
            <ContactBar>
              <BarContent
                onPress={() =>
                  router.navigate(`https://wa.me/${post.user.phone}`)
                }
              >
                <Feather
                  name="phone-call"
                  color={theme.colors.light}
                  size={24}
                />
                <Text size="h3" color="light">
                  Entrar em contato!
                </Text>
              </BarContent>
            </ContactBar>
          </>
        )}
        {!loading && !post && <EmptyList />}
      </Container>
    </ScrollablePage>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;
