import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useTheme } from 'styled-components/native';

import {
  AuthorWrapper,
  ContentContainer,
  CourseViewBackground,
  CourseViewWrapper,
  CourseChapterContainer,
  CourseChapterTitle,
  CourseContentWrapper,
  CourseContentTitle,
  TitleWrapper,
} from './styles';

import { CourseChapterView, CourseListView, CourseView } from '@/api';
import Text from '@/components/Text';
import { moderateScale } from '@/utils/scale';

interface CourseSummaryProps {
  course: CourseListView;
  onPress: () => void;
}

export function CourseSummary({ course, onPress }: CourseSummaryProps) {
  const theme = useTheme();

  return (
    <CourseViewWrapper onPress={onPress}>
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

interface CourseChapterContentsProps {
  courseId: number;
  chapter: CourseChapterView;
}

export function CourseChapterContents({
  courseId,
  chapter,
}: CourseChapterContentsProps) {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  const chapterIndex = chapter.index + 1;
  const icon = active ? 'chevron-down' : 'chevron-right';

  return (
    <>
      <CourseChapterContainer onPress={() => setActive(!active)}>
        <Feather
          name={icon}
          size={moderateScale(30)}
          color={theme.colors.secondary}
        />

        <CourseChapterTitle>
          {chapterIndex}. {chapter.name}
        </CourseChapterTitle>
      </CourseChapterContainer>

      {active &&
        chapter.chapter_contents.map((content) => (
          <Link
            key={content.id}
            href={`/courses/${courseId}/contents/${content.id}`}
            asChild
          >
            <CourseContentWrapper>
              <TitleWrapper>
                <Feather
                  name="play-circle"
                  size={moderateScale(20)}
                  color={theme.colors.dark}
                />

                <CourseContentTitle>{content.name}</CourseContentTitle>
              </TitleWrapper>

              {content.was_viewed && (
                <Feather
                  name="check-circle"
                  size={moderateScale(20)}
                  color={theme.colors.success}
                />
              )}
            </CourseContentWrapper>
          </Link>
        ))}
    </>
  );
}

interface CourseAccordionProps {
  course: CourseView;
}

export function CourseAccordion({ course }: CourseAccordionProps) {
  return (
    <>
      {course.course_chapters.map((chapter, index) => (
        <CourseChapterContents
          key={chapter.id}
          courseId={course.id}
          chapter={chapter}
        />
      ))}
    </>
  );
}
