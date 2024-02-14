import Feather from '@expo/vector-icons/Feather';
import { Link, usePathname } from 'expo-router';
import { useTheme } from 'styled-components';

import { SelectedTab, Tab, Wrapper } from './styles';
import Text from '../Text';

type IconNameOptions = 'shopping-bag' | 'heart' | 'book-open' | 'user';

interface TabInfo {
  href: string;
  title: string;
  iconName: IconNameOptions;
}

const tabs: TabInfo[] = [
  {
    href: '/posts',
    iconName: 'shopping-bag',
    title: 'Anúncios',
  },
  {
    href: '/posts/favorites',
    iconName: 'heart',
    title: 'Favoritos',
  },
  {
    href: '/courses',
    iconName: 'book-open',
    title: 'Cursos',
  },
  {
    href: '/profile',
    iconName: 'user',
    title: 'Perfil',
  },
];

function NavigationBar() {
  const pathname = usePathname();
  const theme = useTheme();

  return (
    <Wrapper>
      {tabs.map(({ href, iconName, title }) => {
        const isSelected = pathname.includes(href);

        const TabComponent = isSelected ? SelectedTab : Tab;
        return (
          <Link key={href} href={href} asChild>
            <TabComponent>
              <Feather size={20} name={iconName} color="white" />
              <Text color="light" size={14}>
                {isSelected && title}
              </Text>
            </TabComponent>
          </Link>
        );
      })}
    </Wrapper>
  );
}

export default NavigationBar;
