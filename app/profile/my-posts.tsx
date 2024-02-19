import EmptyList from '@/components/EmptyList';
import Loading from '@/components/Loading';
import PostCard from '@/components/PostCard';
import ScrollablePage from '@/components/ScrollablePage';
import { PostsContainer } from '@/components/pages/posts/styles';
import { useAuth } from '@/hooks/auth';
import { usePosts } from '@/hooks/posts';

export default function MyPosts() {
  const auth = useAuth();

  const { loadingPosts, viewPosts } = usePosts(
    undefined,
    undefined,
    auth.user ? String(auth.user.id) : undefined,
  );

  return (
    <ScrollablePage>
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
