import { Picker } from '@react-native-picker/picker';

type OptionValue = string | number;

interface Option {
  label: string;
  value: OptionValue;
}

interface ItemsPickerProps {
  selectedOptionValue: OptionValue;
  setSelectedOptionValue: (optionValue: OptionValue) => void;
  options: Option[];
}

function ItemsPicker({
  selectedOptionValue,
  options,
  setSelectedOptionValue,
}: ItemsPickerProps) {
  return (
    <Picker
      selectedValue={selectedOptionValue}
      onValueChange={(itemValue) => setSelectedOptionValue(itemValue)}
    >
      {options.map(({ label, value }) => (
        <Picker.Item key={value} label={label} value={value} />
      ))}
    </Picker>
  );
}

export default ItemsPicker;
