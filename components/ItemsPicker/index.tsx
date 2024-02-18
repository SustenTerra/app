import Feather from '@expo/vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, LabelWrapper, StyledPicker } from './styles';

import Text from '@/components/Text';
import { useActionSheet } from '@/hooks/actionSheet';
import { horizontalScale } from '@/utils/scale';

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

  const isIOS = Platform.OS === 'ios';

  const actionSheet = useActionSheet({
    actions: options.map(({ label }) => label),
    actionsCallbacks: options.map(({ value }) => () => {
      setSelectedOptionValue(value);
    }),
    message: 'Selecione uma opção',
    title: label,
  });

  const onPress = () => {
    if (isIOS) {
      actionSheet.show();
    }
  };

  return (
    <Container>
      <LabelWrapper>
        <Text>{label}</Text>
      </LabelWrapper>

      <StyledPicker onPress={onPress}>
        <Feather name={icon} size={24} color={theme.colors.dark} />

        {!isIOS && options.length > 0 && (
          <Picker
            mode="dropdown"
            style={{ flex: 1 }}
            selectedValue={selectedOptionValue || options[0].value}
            onValueChange={(itemValue) => setSelectedOptionValue(itemValue)}
          >
            {options.map(({ label, value }) => (
              <Picker.Item key={value} label={label} value={value} />
            ))}
          </Picker>
        )}

        {isIOS && (
          <Text color="dark" style={{ marginLeft: horizontalScale(8) }}>
            {
              options.find((option) => option.value === selectedOptionValue)
                ?.label
            }
          </Text>
        )}
      </StyledPicker>
    </Container>
  );
}

export default ItemsPicker;
