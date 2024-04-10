import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams } from 'expo-router';
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
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';

export default function NewCourse() {
  const { courseId, courseChapterId } = useLocalSearchParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreation = async () => {
    if (!title || !description || !videoUrl || !courseId || !courseChapterId) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    if (!videoUrl.includes('youtube.com') || !videoUrl.includes('watch?v=')) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Insira uma URL válida do Youtube',
      });

      return;
    }

    setLoading(true);

    try {
      await client.chapterContents.createChapterContentsPost({
        course_chapter_id: Number(courseChapterId),
        description,
        name: title,
        video_url: videoUrl,
      });

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Conteúdo cadastrado com sucesso!',
      });

      router.replace(`/courses/${courseId}/details`);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
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
              <BackButton />
              <Text weight="regular" size="h1" color="light">
                Criar Conteúdo
              </Text>
            </HeaderWrapper>
          </ContentBackground>
        </TransparentBackground>
      </HeaderBackgroundNewCourse>

      <NewCourseContainer>
        <Text color="dark">
          Faça o upload do vídeo no Youtube como "Não listado" e cole a URL
          aqui.
        </Text>

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
