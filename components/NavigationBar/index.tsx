import Feather from '@expo/vector-icons/Feather';

import { Link, Wrapper } from './styles';

function NavigationBar() {
  return (
    <Wrapper>
      <Link href="/posts">
        <Feather size={24} name="shopping-bag" />
      </Link>
      <Link href="/posts/favorites">
        <Feather size={24} name="heart" />
      </Link>
      <Link href="/courses">
        <Feather size={24} name="book-open" />
      </Link>
      <Link href="/posts">
        <Feather size={24} name="user" />
      </Link>
    </Wrapper>
  );
}

export default NavigationBar;
