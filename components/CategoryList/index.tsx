import { Button, Container, Wrapper } from './styles';

import Text from '@/components/Text';

interface CategoryListProps {
  categories: string[];
  value: number;
  onChange: (value: number) => void;
}

function CategoryList({ categories, value, onChange }: CategoryListProps) {
  return (
    <Wrapper>
      <Container
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={category}
            onPress={() => onChange(index)}
            active={index === value}
          >
            <Text color={index === value ? 'light' : 'dark'}>{category}</Text>
          </Button>
        ))}
      </Container>
    </Wrapper>
  );
}

export default CategoryList;
