import Feather from '@expo/vector-icons/Feather';
import { useEffect, useRef } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components/native';

import { Container, LabelWrapper, StyledPicker } from './styles';

import Text from '@/components/Text';
import { horizontalScale, moderateScale } from '@/utils/scale';

type IconNames = 'list' | 'layers' | 'map-pin';

type OptionValue = string | number;

interface Option {
  label: string;
  value: OptionValue;
}

interface ItemsPickerProps {
  icon: IconNames;
  label?: string;
  placeholder?: string;
  selectedOptionValue?: OptionValue;
  setSelectedOptionValue: (optionValue: OptionValue) => void;
  options: Option[];
}

function ItemsPicker({
  icon,
  label,
  placeholder = 'Selecione uma opção',
  selectedOptionValue,
  options,
  setSelectedOptionValue,
}: ItemsPickerProps) {
  const theme = useTheme();
  const ref = useRef<RNPickerSelect>(null);

  useEffect(() => {
    if (selectedOptionValue === undefined && options.length > 0) {
      setSelectedOptionValue(options[0].value);
    }
  }, [selectedOptionValue, options]);

  return (
    <Container>
      {label && (
        <LabelWrapper>
          <Text weight="bold">{label}</Text>
        </LabelWrapper>
      )}

      <StyledPicker onPress={() => ref.current?.togglePicker()}>
        <Feather name={icon} size={24} color={theme.colors.dark} />

        {options.length === 0 && (
          <Text color="dark" style={{ marginLeft: horizontalScale(8) }}>
            Carregando...
          </Text>
        )}

        {options.length > 0 && (
          <RNPickerSelect
            ref={ref}
            style={{
              viewContainer: {
                flex: 1,
                justifyContent: 'center',
                padding: moderateScale(10),
              },
              inputIOSContainer: {
                flex: 1,
              },
              inputIOS: {
                fontSize: moderateScale(16),
              },
              placeholder: {
                color: theme.colors.dark,
              },
            }}
            placeholder={{
              label: placeholder,
              value: '',
            }}
            doneText="Selecionar"
            onValueChange={(itemValue) => setSelectedOptionValue(itemValue)}
            items={options}
          />
        )}
      </StyledPicker>
    </Container>
  );
}

export default ItemsPicker;
