import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useTheme } from 'styled-components/native';

import EmptyList from '@/components/EmptyList';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  CircleButton,
  PostsContainer,
  PostsGridHeader,
  PostsGridHeaderWrapper,
  PostsSpacer,
} from '@/components/pages/posts/styles';
import { useAuth } from '@/hooks/auth';
import { usePosts } from '@/hooks/posts';

export default function MyPosts() {
  const router = useRouter();
  const theme = useTheme();
  const auth = useAuth();

  const { loadingPosts, viewPosts } = usePosts(
    undefined,
    undefined,
    auth.user ? String(auth.user.id) : undefined,
  );

  const shareLink = `https://sustenterra.netlify.app/posts?userId=${auth.user?.id}`;

  return (
    <ScrollablePage>
      <PostsSpacer />

      <PostsGridHeader>
        <Text size="h5" weight="bold">
          Meus Anúncios
        </Text>

        <PostsGridHeaderWrapper>
          <CircleButton onPress={() => router.push('/posts/new-post')}>
            <Feather name="plus" size={20} color={theme.colors.light} />
          </CircleButton>

          <CircleButton
            onPress={() =>
              Sharing.shareAsync(shareLink, {
                dialogTitle: 'Compartilhar Portifólio',
              })
            }
          >
            <Feather name="share" size={20} color={theme.colors.light} />
          </CircleButton>
        </PostsGridHeaderWrapper>
      </PostsGridHeader>

      <PostsSpacer />

      <PostsContainer>
        {loadingPosts && <Loading />}

        {!loadingPosts &&
          !!auth.user &&
          viewPosts.map((post) => <PostCard key={post.id} {...post} />)}

        {!loadingPosts && !!auth.user && viewPosts.length === 0 && (
          <EmptyList />
        )}
      </PostsContainer>
    </ScrollablePage>
  );
}
