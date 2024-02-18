import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { useTheme } from 'styled-components/native';

import { Container, LabelWrapper, StyledPicker } from './styles';

import Text from '@/components/Text';

type IconNames = 'list' | 'layers';

type OptionValue = string | number;

interface Option {
  label: string;
  value: OptionValue;
}

interface ItemsPickerProps {
  icon: IconNames;
  label: string;
  selectedOptionValue?: OptionValue;
  setSelectedOptionValue: (optionValue: OptionValue) => void;
  options: Option[];
}

function ItemsPicker({
  icon,
  label,
  selectedOptionValue,
  options,
  setSelectedOptionValue,
}: ItemsPickerProps) {
  const theme = useTheme();

  useEffect(() => {
    if (selectedOptionValue === undefined && options.length > 0) {
      setSelectedOptionValue(options[0].value);
    }
  }, [selectedOptionValue]);

  return (
    <Container>
      <LabelWrapper>
        <Text>{label}</Text>
      </LabelWrapper>

      <StyledPicker>
        <Feather name={icon} size={24} color={theme.colors.dark} />

        {options.length > 0 && (
          <Picker
            style={{ flex: 1 }}
            selectedValue={selectedOptionValue || options[0].value}
            onValueChange={(itemValue) => setSelectedOptionValue(itemValue)}
          >
            {options.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} />
            ))}
          </Picker>
        )}
      </StyledPicker>
    </Container>
  );
}

export default ItemsPicker;
