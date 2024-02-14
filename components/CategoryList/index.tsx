import { Button, Container, Wrapper } from './styles';

import Text from '@/components/Text';
import { horizontalScale } from '@/utils/scale';

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
          paddingRight: horizontalScale(20),
          paddingLeft: horizontalScale(10),
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
