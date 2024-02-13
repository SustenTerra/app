import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';

import { CourseView } from '@/api';
import Loading from '@/components/Loading';
import Text from '@/components/Text';
import { client } from '@/services/client';
import { showErrors } from '@/services/errors';

export default function ShowCourse() {
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

  return (
    <Container>
      {!loading && <Loading />}

      {course && <Text>{course.name}</Text>}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
