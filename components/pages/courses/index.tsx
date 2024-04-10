import Feather from '@expo/vector-icons/Feather';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FloatingAction } from 'react-native-floating-action';
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
  HorizontalScroller,
  TitleContainer,
  ScrollerWrapper,
  FABWrapperForWeb,
} from './styles';

import { CourseChapterView, CourseListView, CourseView } from '@/api';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
import Text from '@/components/Text';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';
import { showMessage } from '@/services/messages';
import { isWeb } from '@/utils/platform';
import { moderateScale, verticalScale } from '@/utils/scale';

interface CourseSummaryProps {
  course: CourseListView;
  isInProgress?: boolean;
  onPress: () => void;
}

export function CourseSummary({
  course,
  onPress,
  isInProgress,
}: CourseSummaryProps) {
  const theme = useTheme();

  const plural = course.chapters_count !== 1 ? 's' : '';

  const lowLabel = isInProgress
    ? `${course.chapters_count} Conteúdo${plural} assistidos`
    : `${course.chapters_count} Capítulo${plural}`;

  return (
    <CourseViewWrapper onPress={onPress} isInProgress={isInProgress}>
      <CourseViewBackground
        defaultSource={require('assets/gray.png')}
        source={{ uri: course.image_url || '' }}
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
            {lowLabel}
          </Text>
        </ContentContainer>
      </CourseViewBackground>
    </CourseViewWrapper>
  );
}

interface CourseChapterContentsProps {
  courseId: number;
  chapter: CourseChapterView;
  isEditing?: boolean;
}

export function CourseChapterContents({
  courseId,
  chapter,
  isEditing = false,
}: CourseChapterContentsProps) {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  const chapterIndex = chapter.index + 1;
  const icon = active ? 'chevron-down' : 'chevron-right';

  const mapContents =
    active &&
    chapter.chapter_contents.map((content) => {
      const textColor = content.is_available
        ? theme.colors.dark
        : theme.colors.textBody;
      const textWeight = content.is_available ? 'regular' : 'light';

      const component = (
        <CourseContentWrapper key={content.id} disabled={!content.is_available}>
          <TitleWrapper>
            <Feather
              name="play-circle"
              size={moderateScale(20)}
              color={textColor}
            />

            <CourseContentTitle size={16} weight={textWeight} color={textColor}>
              {content.name}
            </CourseContentTitle>
          </TitleWrapper>

          {!isEditing && content.was_viewed && (
            <Feather
              name="check-circle"
              size={moderateScale(20)}
              color={theme.colors.success}
            />
          )}
        </CourseContentWrapper>
      );

      if (content.is_available) {
        return (
          <Link
            key={content.id}
            href={`/courses/${courseId}/contents/${content.id}`}
            asChild
          >
            {component}
          </Link>
        );
      }

      return component;
    });

  return (
    <>
      <CourseChapterContainer onPress={() => setActive(!active)}>
        <Feather
          name={icon}
          size={moderateScale(30)}
          color={theme.colors.secondary}
        />

        <CourseChapterTitle size={20}>
          {chapterIndex}. {chapter.name}
        </CourseChapterTitle>
      </CourseChapterContainer>

      {mapContents}

      {active && isEditing && (
        <Link
          href={`/courses/${courseId}/new-content?courseChapterId=${chapter.id}`}
        >
          <CourseContentWrapper isEditing>
            <TitleWrapper>
              <Feather
                name="plus-circle"
                size={moderateScale(20)}
                color={theme.colors.light}
              />

              <CourseContentTitle size={16} color={theme.colors.light}>
                Cadastrar conteúdo
              </CourseContentTitle>
            </TitleWrapper>
          </CourseContentWrapper>
        </Link>
      )}
    </>
  );
}

interface CourseAccordionProps {
  course: CourseView;
  isEditing?: boolean;
}

export function CourseAccordion({ course, isEditing }: CourseAccordionProps) {
  return (
    <>
      {course.course_chapters.map((chapter, index) => (
        <CourseChapterContents
          key={chapter.id}
          courseId={course.id}
          chapter={chapter}
          isEditing={isEditing}
        />
      ))}
    </>
  );
}

interface NextContentProps {
  course: CourseView;
}

export function NextContent({ course }: NextContentProps) {
  const router = useRouter();
  const theme = useTheme();

  const goToNextContent = () => {
    const nextChapter = course.course_chapters.find((chapter) =>
      chapter.chapter_contents.find((content) => !content.was_viewed),
    );

    if (nextChapter) {
      const nextContent = nextChapter.chapter_contents.find(
        (content) => !content.was_viewed,
      );

      if (nextContent) {
        router.push(`/courses/${course.id}/contents/${nextContent.id}`);
        return;
      }

      showMessage({
        type: 'success',
        title: 'Parabéns!',
        message: 'Você finalizou o curso!',
      });
    }
  };

  return (
    <Button
      onPress={goToNextContent}
      style={{ marginTop: verticalScale(20) }}
      color="secondary"
    >
      <Feather name="play" size={24} color={theme.colors.light} />

      <Text color="light" size="h6">
        Continuar curso
      </Text>
    </Button>
  );
}

interface FABChatProps {
  onPress?: () => void;
}

export function FABChat({ onPress }: FABChatProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <FABWrapperForWeb>
      <FloatingAction
        actions={[
          {
            text: 'Chat',
            icon: (
              <Feather
                name="help-circle"
                size={30}
                color={theme.colors.light}
              />
            ),
            name: 'chat',
          },
        ]}
        overrideWithAction
        color={theme.colors.primary}
        onPressItem={() => {
          if (onPress) {
            onPress();
            return;
          }

          router.push('/chat');
        }}
      />
    </FABWrapperForWeb>
  );
}

export function CoursesInProgress() {
  const router = useRouter();

  const [courses, setCourses] = useState<CourseListView[]>([]);
  const [loading, setLoading] = useState(true);

  const getInProgressCourses = async () => {
    setLoading(true);
    try {
      const response =
        await client.courses.listAllCoursesInProgressCoursesInProgressGet();
      setCourses(response);
    } catch (error) {
      showErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInProgressCourses();
  }, []);

  if (!loading && courses.length === 0) {
    return null;
  }

  return (
    <>
      <TitleContainer>
        <Text size="h5">Em andamento</Text>
      </TitleContainer>

      {loading && <Loading height={verticalScale(150)} />}

      <ScrollerWrapper>
        <HorizontalScroller horizontal showsHorizontalScrollIndicator={isWeb}>
          {!loading &&
            courses.map((course) => (
              <CourseSummary
                key={course.id}
                course={course}
                onPress={() => router.push(`/courses/${course.id}`)}
                isInProgress
              />
            ))}
        </HorizontalScroller>
      </ScrollerWrapper>
    </>
  );
}
