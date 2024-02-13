import Feather from '@expo/vector-icons/Feather';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';

import { CourseView } from '@/api';
import BackButton from '@/components/BackButton';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import ScrollablePage from '@/components/ScrollablePage';
import Text from '@/components/Text';
import { CourseAccordion } from '@/components/pages/courses';
import {
  ContentBackground,
  DescriptionWrapper,
  HeaderBackground,
  HeaderWrapper,
  TopWrapper,
  TransparentBackground,
} from '@/components/pages/courses/styles';
import { useAuth } from '@/hooks/auth';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { horizontalScale, verticalScale } from '@/utils/scale';

export default function ShowCourse() {
  const theme = useTheme();
  const auth = useAuth();
  const { courseId } = useLocalSearchParams();

  const [course, setCourse] = useState<CourseView | null>(null);
  const [loading, setLoading] = useState(true);

  const getCourse = async () => {
    setLoading(true);
    try {
      const courseResponse =
        await client.courses.getCourseByIdCoursesCourseIdGet(Number(courseId));
      setCourse(courseResponse);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  const shouldShowCourse = !loading && !!course;
  const bannerSource = shouldShowCourse ? { uri: course.image_url } : undefined;

  if (!loading && !auth.user) {
    return <Redirect href="/login" />;
  }

  return (
    <ScrollablePage>
      <StatusBar style="light" />

      <TopWrapper>
        <HeaderBackground
          defaultSource={require('assets/gray.png')}
          source={bannerSource}
          resizeMode="cover"
        >
          <TransparentBackground darker>
            <ContentBackground>
              <HeaderWrapper>
                <BackButton />
                <Text weight="regular" size="h6" color="light">
                  Voltar
                </Text>
              </HeaderWrapper>

              {shouldShowCourse && (
                <>
                  <Text
                    weight="regular"
                    size="h3"
                    color="light"
                    style={{
                      marginTop: verticalScale(10),
                    }}
                  >
                    {course.name}
                  </Text>

                  <DescriptionWrapper>
                    <Feather name="user" size={20} color={theme.colors.light} />

                    <Text
                      color="light"
                      style={{ marginLeft: horizontalScale(5) }}
                    >
                      Por {course.author_name}
                    </Text>
                  </DescriptionWrapper>
                </>
              )}
            </ContentBackground>
          </TransparentBackground>
        </HeaderBackground>
      </TopWrapper>

      {loading && <Loading />}

      {shouldShowCourse && (
        <ContentContainer>
          <Text weight="regular" color="textBody" size="h6">
            {course.description}
          </Text>

          <Button style={{ marginTop: verticalScale(20) }} color="secondary">
            <Feather name="play" size={24} color={theme.colors.light} />

            <Text color="light" size="h6">
              Continuar curso
            </Text>
          </Button>

          <CourseAccordion course={course} />
        </ContentContainer>
      )}
    </ScrollablePage>
  );
}

const ContentContainer = styled.View`
  width: 100%;
  padding: 0 ${verticalScale(20)}px ${verticalScale(30)}px
    ${horizontalScale(20)}px;
`;
