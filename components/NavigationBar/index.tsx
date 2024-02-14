import Feather from '@expo/vector-icons/Feather';
import { usePathname } from 'expo-router';

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

  return (
    <Wrapper>
      {tabs.map(({ href, iconName, title }) => {
        const TabComponent = pathname === href ? SelectedTab : Tab;
        return (
          <TabComponent key={href} href={href}>
            <Feather size={20} name={iconName} />
            <Text color="light" size={14}>
              {pathname === href && title}
            </Text>
          </TabComponent>
        );
      })}
    </Wrapper>
  );
}

export default NavigationBar;
