import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme, DefaultTheme } from 'styled-components/native';
import { brazilianStatesList, StateAcronym } from 'utils/brazilianStatesList';

import BackButton from '@/components/BackButton';

export default function StateSelector() {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('Todos');
  const theme = useTheme();
  const ref = useRef<RNPickerSelect>(null);

  const handleChange = (value: string) => {
    setSelectedState(value);
    router.push(`/posts?selectedState=${value}`);
  };

  useEffect(() => {
    if (selectedState === 'Todos' && brazilianStatesList.length > 0) {
      setSelectedState(brazilianStatesList[0].acronym);
    }
  }, [selectedState, brazilianStatesList]);

  return (
    <View style={styles.container}>
      <BackButton defaultRoute="/posts" />
      <View style={styles.pickerContainer}>
        <Feather name="map-pin" size={24} color={theme.colors.textBody} />
        <RNPickerSelect
          ref={ref}
          style={pickerSelectStyles(theme)}
          placeholder={{
            label: 'Selecione um Estado',
            value: '',
          }}
          doneText="Selecionar"
          onValueChange={handleChange}
          items={brazilianStatesList.map((state: StateAcronym) => ({
            label: state.name,
            value: state.acronym,
          }))}
        />
      </View>
    </View>
  );
}

const pickerSelectStyles = (theme: DefaultTheme) =>
  StyleSheet.create({
    viewContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: 'white',
    },
    inputIOSContainer: {
      flex: 1,
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
    },
    inputWeb: {
      borderWidth: 0,
      fontSize: 16,
      paddingVertical: 12,
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
    },
    inputAndroidContainer: {
      flex: 1,
    },
    placeholder: {
      color: theme.colors.textBody,
    },
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F1F0',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    padding: 8,
    marginTop: 16,
    width: '100%',
    backgroundColor: 'white',
  },
});
