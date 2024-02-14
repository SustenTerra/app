import { Slot } from 'expo-router';

import { FABChat } from '@/components/pages/courses';

export default function CoursesLayout() {
  return (
    <>
      <Slot />
      <FABChat />
    </>
  );
}
