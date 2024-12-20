import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTheme } from 'styled-components/native';

import {
  AuthorWrapper,
  ContentContainer,
  MyCourseViewBackground,
  MyCourseViewWrapper,
  StatusView,
  StatusWrapper,
} from './styles';

import { CourseListView } from '@/api';
import Text from '@/components/Text';
import { useActionSheet } from '@/hooks/actionSheet';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { moderateScale } from '@/utils/scale';

interface CourseSummaryProps {
  course: CourseListView;
  onPress: () => void;
}

export function MyCourseSummary({ course, onPress }: CourseSummaryProps) {
  const theme = useTheme();
  const router = useRouter();

  const promptToDeleteCourse = async () => {
    try {
      await client.courses.deleteCourseCoursesCourseIdDelete(course.id);
    } catch (error) {
      showErrors(error);
      return;
    }

    showMessage({
      type: 'success',
      title: 'Sucesso',
      message: 'Curso excluído com sucesso!',
    });

    router.replace(`/courses/my-courses`);
  };

  const deleteActionSheet = useActionSheet({
    title: 'Atenção!',
    message:
      'Você tem certeza que deseja excluir este curso e todo o seu conteúdo?',
    actions: ['Sim, tenho certeza'],
    actionsCallbacks: [promptToDeleteCourse],
  });

  const actionSheet = useActionSheet({
    title: 'Opções',
    message: 'Escolha uma das opções a seguir',
    actions: ['Editar', 'Excluir'],
    actionsCallbacks: [
      () => router.push(`/courses/new-course?courseId=${course.id}`),
      () => setTimeout(() => deleteActionSheet.show(), 300),
    ],
  });

  return (
    <MyCourseViewWrapper onPress={onPress}>
      <MyCourseViewBackground
        defaultSource={require('assets/gray.png')}
        source={{ uri: course.image_url || '' }}
        resizeMode="cover"
        imageStyle={{ borderRadius: moderateScale(25), width: '100%' }}
      >
        <ContentContainer>
          <StatusWrapper>
            {course.published_at && (
              <StatusView color="light">
                <Text weight="bold" color="dark">
                  Publicado
                </Text>
              </StatusView>
            )}

            {!course.published_at && (
              <StatusView color="">
                <Text weight="light" color="light">
                  Não Publicado
                </Text>
              </StatusView>
            )}
            <Feather
              onPress={actionSheet.show}
              name="settings"
              size={moderateScale(20)}
              color={theme.colors.light}
              style={{ marginRight: moderateScale(5) }}
            />
          </StatusWrapper>

          <Text size="h5" weight="bold" color="light">
            {course.name}
          </Text>

          <AuthorWrapper>
            <Feather
              name="user"
              size={moderateScale(15)}
              color={theme.colors.light}
              style={{ marginRight: moderateScale(5) }}
            />
            <Text color="light">{course.author_name}</Text>
          </AuthorWrapper>
          <Text weight="light" color="light">
            {course.chapters_count} Capítulos
          </Text>

          <Text color="light" style={{ marginTop: moderateScale(10) }} />
        </ContentContainer>
      </MyCourseViewBackground>
    </MyCourseViewWrapper>
  );
}
