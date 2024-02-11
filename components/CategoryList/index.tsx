import { Button, Container } from './styles';

import Text from '@/components/Text';

interface CategoryListProps {
  categories: string[];
  value: number;
  onChange: (value: number) => void;
}

function CategoryList({ categories, value, onChange }: CategoryListProps) {
  return (
    <Container>
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
  );
}

export default CategoryList;
