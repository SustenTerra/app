import { Slot } from 'expo-router';

import NavigationBar from '@/components/NavigationBar';

export default function ProfileLayout() {
  return (
    <>
      <Slot />
      <NavigationBar />
    </>
  );
}
