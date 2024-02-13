import Feather from '@expo/vector-icons/Feather';
import { useTheme } from 'styled-components/native';

import {
  AuthorWrapper,
  ContentContainer,
  CourseViewBackground,
  CourseViewWrapper,
} from './styles';

import { CourseListView } from '@/api';
import Text from '@/components/Text';
import { moderateScale } from '@/utils/scale';

interface CourseSummaryProps {
  course: CourseListView;
}

export function CourseSummary({ course }: CourseSummaryProps) {
  const theme = useTheme();

  return (
    <CourseViewWrapper>
      <CourseViewBackground
        defaultSource={require('assets/gray.png')}
        source={{ uri: course.image_url }}
        resizeMode="cover"
        imageStyle={{ borderRadius: moderateScale(25), width: '100%' }}
      >
        <ContentContainer>
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

          <Text color="light" style={{ marginTop: moderateScale(10) }}>
            {course.chapters_count} Capítulo{course.chapters_count !== 1 && 's'}
          </Text>
        </ContentContainer>
      </CourseViewBackground>
    </CourseViewWrapper>
  );
}
