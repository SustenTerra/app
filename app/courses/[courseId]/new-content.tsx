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
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreation = async () => {
    if (!title || !description || !videoUrl) {
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
    formData.append('description', description);
    formData.append('videoUrl', videoUrl);

    // await client.request.request({
    //   url: '/courses',
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    showMessage({
      type: 'success',
      title: 'Sucesso!',
      message: 'Conteúdo cadastrado com sucesso!',
    });
    router.replace('/courses/1/contents/42');
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
                Criar Conteúdo
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
        <Input
          iconName="alert-circle"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
        />
        <Input
          iconName="camera"
          placeholder="URL do vídeo no Youtube"
          value={videoUrl}
          onChangeText={setVideoUrl}
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
