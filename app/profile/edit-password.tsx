import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale } from '@/utils/scale';

export default function EditPasswordProfile() {
  const theme = useTheme();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  const handleEdit = async () => {
    if (!password || !newPassword || !confirmPassword) {
      showMessage({
        type: 'danger',
        title: 'Erro',
        message: 'Preencha todos os campos!',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage({
        type: 'danger',
        title: 'Erro',
        message: 'As novas senhas não coincidem!',
      });
      return;
    }

    setLoadingEdit(true);
    try {
      await client.users.updateUserPasswordUsersMeUpdatePasswordPatch({
        current_password: password,
        password: newPassword,
      });

      showMessage({
        type: 'success',
        title: 'Sucesso',
        message: 'Senha atualizada com sucesso!',
      });

      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <ScrollablePage>
      <SafeView>
        <HeaderWrapper>
          <BackButton href="/profile" />

          <Text weight="bold" size="h5">
            Atualizar senha
          </Text>
        </HeaderWrapper>

        <FormWrapper>
          <Input
            iconName="lock"
            hideText
            placeholder="Senha atual"
            value={password}
            onChangeText={setPassword}
          />
          <Input
            iconName="lock"
            hideText
            placeholder="Nova senha"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            iconName="lock"
            hideText
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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
