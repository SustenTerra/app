import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import FormData from 'form-data';
import { useState } from 'react';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { HorizontalLoading } from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import {
  ContentBackground,
  HeaderBackgroundNewCourse,
  HeaderWrapper,
  NewCourseContainer,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { showMessage } from '@/services/messages';

export default function NewCourse() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreation = async () => {
    if (!title) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', title);
    showMessage({
      type: 'success',
      title: 'Sucesso!',
      message: 'Conteúdo cadastrado com sucesso!',
    });
    router.replace('/courses/1/new-chapter');
  };

  return (
    <ScrollablePage>
      <HeaderBackgroundNewCourse
        defaultSource={require('assets/gray.png')}
        source={require('assets/courses.png')}
        resizeMode="cover"
      >
        <TransparentBackground>
          <ContentBackground>
            <HeaderWrapper>
              <BackButton href="/" />
              <Text weight="regular" size="h1" color="light">
                Criar Capítulo
              </Text>
            </HeaderWrapper>
          </ContentBackground>
        </TransparentBackground>
      </HeaderBackgroundNewCourse>

      <NewCourseContainer>
        <Input
          iconName="book"
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
        />

        <Button onPress={handleCreation} color="primary">
          {!loading && (
            <>
              <Feather name="save" size={20} color="white" />

              <Text color="light" weight="bold">
                Salvar informações
              </Text>
            </>
          )}

          {loading && <HorizontalLoading color="light" />}
        </Button>
      </NewCourseContainer>
    </ScrollablePage>
  );
}
