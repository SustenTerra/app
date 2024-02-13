import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components';

import { Link, Wrapper } from './style';

import { moderateScale } from '@/utils/scale';

function NavigationBar() {
  const theme = useTheme();

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
