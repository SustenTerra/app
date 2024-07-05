import Feather from '@expo/vector-icons/Feather';
import { Link, usePathname } from 'expo-router';

import { SelectedTab, Tab, Wrapper } from './styles';
import Text from '../Text';

import { useAuth } from '@/hooks/auth';

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
  // {
  //   href: '/posts/#',
  //   iconName: 'heart',
  //   title: 'Favoritos',
  // },
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

  const { user } = useAuth();

  const goToLoginIfNotAuthenticated = (href: string) => {
    const privateRoutes = ['/profile', '/posts/favorites'];
    if (!user && privateRoutes.includes(href)) {
      return '/login';
    }

    return href;
  };

  return (
    <Wrapper>
      {tabs.map(({ href, iconName, title }) => {
        const normalizedHref = goToLoginIfNotAuthenticated(href);
        const isSelected = pathname.includes(normalizedHref);

        const TabComponent = isSelected ? SelectedTab : Tab;
        return (
          <Link key={href} href={normalizedHref} asChild>
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
