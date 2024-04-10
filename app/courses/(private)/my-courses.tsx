import Feather from '@expo/vector-icons/Feather';
import { Redirect, router } from 'expo-router';
import { useEffect, useState } from 'react';

import { CourseListView } from '@/api';
import BackButton from '@/components/BackButton';
import EmptyList from '@/components/EmptyList';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { MyCourseSummary } from '@/components/pages/my-courses';
import {
  CircleButton,
  ContentBackground,
  HeaderBackground,
  HeaderWrapper,
  MyCourseSummaryWrapper,
  TopWrapper,
  TransparentBackground,
  Content,
  TextContainer,
} from '@/components/pages/my-courses/styles';
import { useActionSheet } from '@/hooks/actionSheet';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import theme from '@/styles/theme';

export default function MyCourses() {
  const auth = useAuth();
  const [loadingCourses, setLoadingCourses] = useState(true);
  const actionSheet = useActionSheet({
    title: 'Atenção!',
    message: 'Você precisa estar logado para gerenciar seus cursos.',
    actions: ['Realizar Login', 'Criar conta'],
    actionsCallbacks: [
      () => router.navigate('/login'),
      () => router.navigate('/sign-up'),
    ],
  });

  const getCourses = async () => {
    try {
      setLoadingCourses(true);
      const courses =
        await client.courses.listAllTeacherCoursesUsersMeCoursesGet();
      setViewCourses(courses);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoadingCourses(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const [viewCourses, setViewCourses] = useState<CourseListView[]>([]);

  const onCoursePress = (myCourse: CourseListView) => {
    if (!auth.user) {
      actionSheet.show();
      return;
    }
    router.navigate(`/courses/${myCourse.id}/details`);
  };

  if (!auth.loading && !!auth.user && !auth.user?.teacher_at) {
    showMessage({
      type: 'danger',
      title: 'Acesso negado',
      message: 'Você não tem permissão para acessar essa página',
    });

    return <Redirect href="/courses" />;
  }

  return (
    <ScrollablePage>
      <TopWrapper>
        <HeaderBackground
          defaultSource={require('assets/gray.png')}
          source={require('assets/courses.png')}
          resizeMode="cover"
        >
          <TransparentBackground>
            <ContentBackground>
              <HeaderWrapper>
                <BackButton />
                <TextContainer>
                  <Text weight="regular" size="h1" color="light">
                    Meus Cursos
                  </Text>
                </TextContainer>
                <CircleButton
                  onPress={() => router.push('/courses/new-course')}
                >
                  <Feather name="plus" size={24} color={theme.colors.light} />
                </CircleButton>
              </HeaderWrapper>
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      <Content>
        {loadingCourses && <Loading />}

        {!loadingCourses &&
          viewCourses.map((course) => (
            <MyCourseSummaryWrapper key={course.id}>
              <MyCourseSummary
                course={course}
                onPress={() => onCoursePress(course)}
              />
            </MyCourseSummaryWrapper>
          ))}

        {!loadingCourses && viewCourses.length === 0 && <EmptyList />}
      </Content>
    </ScrollablePage>
  );
}
