import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { EditAddressContainer } from '@/components/pages/posts/styles';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale } from '@/utils/scale';

export default function EditAdress() {
  const theme = useTheme();

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [complement, setComplement] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [userHasAddress, setUserHasAddress] = useState(false);

  useEffect(() => {
    loadingUserAddress();
  }, []);

  const handleEdit = async () => {
    if (!cep || !street || !number || !city || !neighborhood || !state) {
      showMessage({
        type: 'danger',
        title: 'Erro',
        message: 'Preencha todos os campos!',
      });
    }
    setLoadingEdit(true);
    try {
      if (userHasAddress) {
        await client.addresses.updateAddressUsersMeAddressesPatch({
          cep,
          city,
          complement,
          neighborhood,
          number,
          state,
          street,
        });
      } else {
        await client.addresses.createUserAddressUsersMeAddressesPost({
          cep,
          city,
          complement,
          neighborhood,
          number,
          state,
          street,
        });
      }
      showMessage({
        type: 'success',
        title: 'Sucesso',
        message: 'Seu endereço foi atualizado com sucesso!',
      });
      setUserHasAddress(true);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingEdit(false);
    }
  };

  const loadingUserAddress = async () => {
    setLoadingAddress(true);
    try {
      const response = await client.addresses.getAddressUsersMeAddressesGet();
      setCep(response.cep);
      setStreet(response.street);
      setNumber(response.number);
      setNeighborhood(response.neighborhood);
      setComplement(response.complement);
      setCity(response.city);
      setState(response.state);
    } catch (error) {
      showMessage({
        type: 'warning',
        title: 'Você não tem um endereço cadastrado',
        message: 'Preencha os campos para cadastrar!',
      });
      setUserHasAddress(false);
    } finally {
      setLoadingAddress(false);
    }
  };

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
          {loadingAddress && <Loading />}
          {!loadingAddress && (
            <>
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
                value={street}
                onChangeText={setStreet}
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
            </>
          )}
          <ButtonView>
            <Button disabled={loadingEdit} color="primary" onPress={handleEdit}>
              {!loadingEdit && (
                <>
                  <Feather name="save" size={24} color={theme.colors.light} />
                  <Text color="light" size={20}>
                    Salvar alterações
                  </Text>
                </>
              )}
            </Button>
          </ButtonView>
        </EditAddressContainer>
      </SafeView>
    </ScrollablePage>
  );
}
const ButtonView = styled.View`
  margin-top: ${moderateScale(20)}px;
`;

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
