import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading, { HorizontalLoading } from '@/components/Loading';
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
  const router = useRouter();
  const { courseId, chapterId } = useLocalSearchParams();

  const [loadingChapter, setLoadingChapter] = useState(!!chapterId);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const getChapter = async () => {
    if (!courseId || !chapterId) return;

    setLoadingChapter(true);
    try {
      const course = await client.courses.getCourseByIdCoursesCourseIdGet(
        Number(courseId),
      );

      const foundChapter = course.course_chapters.find(
        (chapter) => chapter.id === Number(chapterId),
      );

      if (foundChapter) {
        setTitle(foundChapter.name);
      }
    } catch (error) {
      showErrors(error);
      router.replace(`/courses/${courseId}/details`);
    } finally {
      setLoadingChapter(false);
    }
  };

  useEffect(() => {
    getChapter();
  }, []);

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

    try {
      await client.courseChapters.createCourseChapterCourseChapterPost({
        course_id: Number(courseId),
        name: title,
      });

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Capítulo cadastrado com sucesso!',
      });

      router.replace(`/courses/${courseId}/details`);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title) {
      showMessage({
        type: 'danger',
        title: 'Atenção!',
        message: 'Preencha todos os campos',
      });

      return;
    }

    setLoading(true);

    try {
      await client.courseChapters.editCourseChapterCourseChapterCourseChapterIdPatch(
        Number(chapterId),
        {
          name: title,
        },
      );

      showMessage({
        type: 'success',
        title: 'Sucesso!',
        message: 'Capítulo atualizado com sucesso!',
      });

      router.replace(`/courses/${courseId}/details`);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingChapter) {
    return (
      <ScrollablePage>
        <Loading />
      </ScrollablePage>
    );
  }

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
                {chapterId ? 'Editar' : 'Criar'} Capítulo
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

        <Button
          onPress={chapterId ? handleUpdate : handleCreation}
          color="primary"
        >
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
