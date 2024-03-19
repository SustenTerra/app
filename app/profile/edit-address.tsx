import { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { EditAddressContainer } from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showMessage } from '@/services/messages';
import { moderateScale } from '@/utils/scale';

export default function EditAdress() {
  const theme = useTheme();

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  // const handleEdit = async () =>{
  //   if(!cep || !address || !number || !city || !neighborhood || !state){
  //       showMessage({
  //           type: 'danger',
  //           title: 'Erro',
  //           message: 'Preencha todos os campos!',
  //       })
  //       return
  //   }
  //   setLoadingEdit(true);
  //   try{
  //       await client.users.updateUserPasswordUsersMeUpdatePasswordPatch
  //   }
  // }

  return (
    <ScrollablePage>
      <SafeView>
        <HeaderWrapper>
          <BackButton href="/profile" />
          <Text weight="bold" size="h5">
            Atualizar Endereço
          </Text>
        </HeaderWrapper>
        <EditAddressContainer>
          <Input
            iconName="map-pin"
            placeholder="CEP"
            mask="[00000][000]"
            value={cep}
            onChangeText={setCep}
          />
          <Input
            iconName="home"
            placeholder="Nome da rua, avenida,etc.."
            value={address}
            onChangeText={setAddress}
          />
          <Input
            iconName="hash"
            placeholder="Número"
            value={number}
            onChangeText={setNumber}
          />
          <Input
            iconName="box"
            placeholder="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />

          <Input
            iconName="alert-circle"
            placeholder="Complemento(apto-casa, etc...)"
            value={complement}
            onChangeText={setComplement}
          />
          <Input
            iconName="map-pin"
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          <Input
            iconName="map"
            placeholder="Estado"
            value={state}
            mask="[00]"
            onChangeText={setState}
          />
          {/* 
          <Button disabled{loadingEdit}

          /> */}
        </EditAddressContainer>
      </SafeView>
    </ScrollablePage>
  );
}

const SafeView = styled.SafeAreaView`
  padding-top: ${moderateScale(20)}px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const HeaderWrapper = styled.View`
  width: 100%;
  padding: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
