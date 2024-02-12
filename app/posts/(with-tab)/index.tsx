import { useState } from 'react';
import { Image } from 'react-native';

import Input from '@/components/Input';
import Text from '@/components/Text';
import {
  Container,
  Header,
  SearchWrapper,
} from '@/components/pages/posts/styles';

export default function Posts() {
  const [search, setSearch] = useState('');

  return (
    <Container>
      <Header>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('assets/adaptive-icon.png')}
        />
        <Text size="h1" color="primary" weight="bold">
          SustenTerra
        </Text>
      </Header>
      <SearchWrapper>
        <Input
          iconName="search"
          placeholder="Pesquisar por produto, categoria..."
          value={search}
          onChange={setSearch}
        />
      </SearchWrapper>
    </Container>
  );
}
