import Feather from '@expo/vector-icons/Feather';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { UserView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading, { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { onUserUpdate } from '@/services/authStorage';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale } from '@/utils/scale';

export default function EditProfile() {
  const theme = useTheme();

  const [user, setUser] = useState<UserView | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  const showUser = async () => {
    setLoadingUser(true);
    try {
      const response = await client.users.getUserUsersMeGet();

      setUser(response);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleEdit = async () => {
    const ifFilled = (value: string) =>
      value.trim().length > 0 ? value : undefined;

    setLoadingEdit(true);
    try {
      const response = await client.users.updateUserUsersMePatch({
        full_name: ifFilled(fullName),
        email: ifFilled(email),
        phone: ifFilled(cellphone),
      });

      showMessage({
        type: 'success',
        title: 'Sucesso',
        message: 'Perfil atualizado com sucesso!',
      });

      onUserUpdate(response);
      showUser();
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingEdit(false);
    }
  };

  useEffect(() => {
    showUser();
  }, []);

  return (
    <ScrollablePage>
      <SafeView>
        <HeaderWrapper>
          <BackButton href="/profile" />

          <Text weight="bold" size="h5">
            Editar Perfil
          </Text>
        </HeaderWrapper>

        {loadingUser && <Loading />}

        {!loadingUser && (
          <FormWrapper>
            <Input
              iconName="user"
              placeholder={user?.full_name || 'Nome completo'}
              value={fullName}
              onChangeText={setFullName}
            />
            <Input
              iconName="mail"
              placeholder={user?.email || 'Email'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              iconName="message-circle"
              placeholder={user?.phone || 'Telefone'}
              value={cellphone}
              onChangeText={setCellphone}
              keyboardType="phone-pad"
            />

            <Button disabled={loadingEdit} color="primary" onPress={handleEdit}>
              {!loadingEdit && (
                <>
                  <Feather name="save" size={24} color={theme.colors.light} />
                  <Text color="light" size={20}>
                    Salvar alterações
                  </Text>
                </>
              )}

              {loadingEdit && <HorizontalLoading color="light" />}
            </Button>
          </FormWrapper>
        )}
      </SafeView>
    </ScrollablePage>
  );
}

const SafeView = styled.SafeAreaView`
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

const FormWrapper = styled.View`
  padding: ${moderateScale(20)}px;
  gap: ${moderateScale(20)}px;
`;
