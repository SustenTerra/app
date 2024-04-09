import Feather from '@expo/vector-icons/Feather';
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
import { moderateScale } from '@/utils/scale';

interface CourseSummaryProps {
  course: CourseListView;
  onPress: () => void;
}

export function MyCourseSummary({ course, onPress }: CourseSummaryProps) {
  const theme = useTheme();

  return (
    <MyCourseViewWrapper>
      <MyCourseViewBackground
        defaultSource={require('assets/gray.png')}
        source={{ uri: course.image_url }}
        resizeMode="cover"
        imageStyle={{ borderRadius: moderateScale(25), width: '100%' }}
      >
        <ContentContainer>
          <StatusWrapper>
            {course.published_at && (
              <StatusView color="light">
                <Text size="h5" weight="bold" color="dark">
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
              name="settings"
              size={moderateScale(15)}
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
